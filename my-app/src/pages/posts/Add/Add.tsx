import React, { useState } from "react";

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
      <div>
        <h3>Add New Post</h3>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={e => setNewPost({ ...newPost, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newPost.author}
          onChange={e => setNewPost({ ...newPost, author: e.target.value })}
        />
        <button onClick={handleAdd}>Add Post</button>{" "}
      </div>
    </div>
  );
};
export default Add;
