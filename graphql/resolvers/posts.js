const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({createdAt: -1});
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(parent, {postId}) {
      try {
        const post = await Post.findById(postId);
        if (post) 
          return post;
        else 
          throw new Error('Post not found');
        }
      catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(parent, {
      body
    }, context) {
      const user = checkAuth(context);
      console.log(user);
      const newPost = new Post({body, user: user.id, username: user.username, createdAt: new Date().toISOString()});
      const post = await newPost.save();
      return post;
    }
  }
};