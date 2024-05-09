import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@mui/base/Button';


interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  author_avatar: string | null;
  attached_image: string | null;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

interface EditProps {
  postId: number;
  onClose: () => void; // Function để đóng modal
  updatePost: (updatedPost: Post) => void;
}

const Edit: React.FC<EditProps> = ({ postId, onClose, updatePost }) => {
  const [post, setPost] = useState<Post>({
    id: postId,
    title: "",
    content: "",
    author: "",
    author_avatar: "",
    attached_image: "",
    likes: 0,
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  const fetchPost = async (postId: number) => {
    try {
      const response = await axios.get(`http://localhost:2208/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:2208/posts/${postId}`, post);
      updatePost(post);
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <span></span>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          name="content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={post.author}
          onChange={(e) => setPost({ ...post, author: e.target.value })}
        />
      </div>
      <div>
        <label>Likes:</label>
        <input
          type="number"
          name="likes"
          min={1}
          value={post.likes}
          onChange={(e) =>
            setPost({ ...post, likes: parseInt(e.target.value) })
          }
        />
      </div>
      <div>
        <label>Created Time:</label>
        <input type="text" name="createdAt" value={post.createdAt} disabled />
      </div>
      <div>
        <label>Updated Time:</label>
        <input type="text" name="updatedAt" value={post.updatedAt} disabled />
      </div>
      <Button id="saveButton" onClick={handleSubmit}>Save Changes</Button>
      <Button id="cancelButton" onClick={onClose}>Cancel</Button>
      
    </div>
  );
};

export default Edit;
