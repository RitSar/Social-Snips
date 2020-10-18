const {AuthenticationError, UserInputError} = require('apollo-server');

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
      if (args.body.trim() === '') 
        throw new Error('Post must not be empty.');
      const newPost = new Post({body, user: user.id, username: user.username, createdAt: new Date().toISOString()});
      const post = await newPost.save();
      return post;
    },

    async deletePost(parent, {
      postId
    }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return 'Post deleted.'
        } else {
          throw new AuthenticationError('Action not allowed.');
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async createComment(parent, {
      postId,
      body
    }, context) {
      const {username} = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty.'
          }
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({body, username, createdAt: new Date().toISOString()})
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found.');
      }
    },

    async deleteComment(parent, {
      postId,
      commentId
    }, context) {
      const {username} = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(comment => comment.id === commentId);
        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action Not Allowed!');
        }
      } else {
        throw new UserInputError('Post not found??');
      }
    },

    async likePost(parent, {
      postId
    }, context) {
      const {username} = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find(like => like.username === username)) {
          //unlike
          post.likes = post.likes.filter(like => like.username !== username)
        } else {
          //like
          post.likes.push({username, createdAt: new Date().toISOString()})
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found.')
      }
    }
  }
};