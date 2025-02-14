import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post("http://localhost:4000/posts", {
      title,
    });

    setTitle("");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        {/* Create Post Section */}
        <div className="mb-4">
          <h2>Create Post</h2>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>
          <button className="btn btn-primary mt-2">Submit</button>
        </div>
      </form>
    </>
  );
};

export default PostCreate;
