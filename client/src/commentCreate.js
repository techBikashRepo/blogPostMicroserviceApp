import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      comment,
    });
    setComment("");
  };

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Comment"
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-secondary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentCreate;
