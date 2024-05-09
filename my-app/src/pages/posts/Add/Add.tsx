import React, { useState } from "react";
import "./Add.css";
import { Button } from "@mui/base/Button";
import Preview from "../../../components/Preview/Preview";

interface AddProps {
  onAdd: (newPost: PostData) => void;
}

interface PostData {
  title: string;
  content: string;
  author: string;
  author_avatar: string | null;
  attached_image: string | null;
}

const Add: React.FC<AddProps> = ({ onAdd }) => {
  const [newPost, setNewPost] = useState<PostData>({
    title: "",
    content: "",
    author: "",
    author_avatar: null,
    attached_image: null,
  });

  const handleAdd = () => {
    onAdd(newPost);
    setNewPost({
      title: "",
      content: "",
      author: "",
      author_avatar: null,
      attached_image: null,
    });
  };
  return (
    <div>
      <div className="addArea1">
        <h3>Add New Post</h3>
        <div className="flexnp">
          <div className="flexAdd">
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Author"
              id="author"
              value={newPost.author}
              onChange={(e) =>
                setNewPost({ ...newPost, author: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              id="content"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
            />
            <Button id="submit" onClick={handleAdd}>
              Add Post
            </Button>{" "}
          </div>
          <div className="preview">
            <Preview key={96752} post={{ id: 98752, ...newPost }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Add;
