import React from "react";

const CommentList = ({ commentsList }) => {
  if (!commentsList) {
    return <p>No comments yet</p>;
  }
  return (
    <>
      <p className="text-muted">{commentsList.length} comment</p>
      {commentsList &&
        commentsList.map((comm) => {
          return (
            <div className="card mb-2" key={comm.id}>
              <div className="card-body">
                <p>{comm.comment}</p>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CommentList;
