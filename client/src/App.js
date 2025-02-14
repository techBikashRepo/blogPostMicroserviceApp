import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <>
      <div className="container mt-5">
        <PostCreate />
        <PostList />
      </div>
    </>
  );
};

export default App;
