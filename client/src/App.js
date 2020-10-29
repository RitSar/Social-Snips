import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthRoute from "./util/AuthRoute";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";

import { AuthProvider } from "./context/auth";

import Navbar from "./components/Navbar";
import PageFooter from "./components/PageFooter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container className="container">
          <Navbar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
        <PageFooter />
      </Router>
    </AuthProvider>
  );
}

export default App;
