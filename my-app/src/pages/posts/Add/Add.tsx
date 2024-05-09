import React, { useState } from "react";
import "./Add.css";
import { Button } from "@mui/base/Button";
import Preview from "../../../components/Preview/Preview";
import swal from 'sweetalert';

interface AddProps {
  onAdd: (newPost: PostData) => void;
}

interface PostData {
  title: string;
  content: string;
  author: string;
  author_avatar: string | null;
  attached_image: string | null;
  updatedAt: string;
}

const Add: React.FC<AddProps> = ({ onAdd }) => {
  const [newPost, setNewPost] = useState<PostData>({
    title: "",
    content: "",
    author: "",
    author_avatar: null,
    attached_image: null,
    updatedAt: ""
  });

  const [newPre, setNewPre] = useState<PostData>({
    title: "",
    content: "",
    author: "",
    author_avatar: null,
    attached_image: null,
    updatedAt: ""
  });

  const handleAdd = () => {
    onAdd(newPost);
    setNewPost({
      title: "",
      content: "",
      author: "",
      author_avatar: null,
      attached_image: null,
      updatedAt: ""
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
              onChange={(e) => {
                setNewPost({ ...newPost, title: e.target.value });
                setNewPre({ ...newPost, title: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Author"
              id="author"
              value={newPost.author}
              onChange={(e) => {
                setNewPost({ ...newPost, author: e.target.value });
                setNewPre({ ...newPost, author: e.target.value });
              }}
            />
            <textarea
              placeholder="Content"
              id="content"
              value={newPost.content}
              onChange={(e) => {
                setNewPost({ ...newPost, content: e.target.value });
                setNewPre({ ...newPost, content: e.target.value });
              }}
            />
            <Button id="submit" onClick={handleAdd}>
              Add Post
            </Button>{" "}
          </div>
          <div className="preview">
            <Preview key={96752} post={{ id: 96752, ...newPre }} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Add;
