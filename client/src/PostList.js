import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./commentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [postLists, setPostLists] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");
    setPostLists(res.data.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div>
        {/* Individual Post */}
        {postLists &&
          Object.values(postLists).map((itm) => {
            return (
              <div className="card mb-4" key={itm.id}>
                <div className="card-body">
                  <h3 className="card-title">{itm.title}</h3>
                  {itm.comments && Object.keys(itm.comments).length > 0 ? (
                    <CommentList commentsList={Object.values(itm.comments)} />
                  ) : (
                    <p>No comments yet</p>
                  )}
                  <CommentCreate postId={itm.id} />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PostList;
