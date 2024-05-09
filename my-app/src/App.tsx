import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Post from "./components/Post/Post";
import Add from "./pages/posts/Add/Add";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Modal from "react-modal";
import Edit from "./pages/posts/Edit/Edit";
import Swal from 'sweetalert2';


Modal.setAppElement("#root");

interface Post1 {
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

interface NPost {
  title: string;
  content: string;
  author: string;
  author_avatar: string | null;
  attached_image: string | null;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post1[]>([]);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editPostId, setEditPostId] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:2208/post");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = async (newPost: NPost) => {
    try {
      const response = await axios.post("http://localhost:2208/posts", newPost);
      setPosts([...posts, response.data]);
      // Hiển thị thông báo thành công bằng SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Post added successfully!'
      });
    } catch (error) {
      console.error("Error adding post:", error);
      // Hiển thị thông báo lỗi bằng SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add post. Please try again later.'
      });
    }
  };
  

  const deletePost = async (postId: number) => {
    try {
      await axios.delete(`http://localhost:2208/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (postId: number) => {
    setEditPostId(postId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const updatePost = (updatedPost: Post1) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === updatedPost.id) {
        return updatedPost;
      }
      return post;
    });
    setPosts(updatedPosts);
    setShowEditModal(false); // Đóng modal sau khi cập nhật
  };

  return (
    <div>
      <h2>Abu Blog</h2>
      <div className="addArea">
        <div className="button">
          <button id="addToogleButton" onClick={() => setShowAdd(!showAdd)}>
             {showAdd ? <RemoveIcon /> : <AddIcon />}
          </button>
        </div>
        <div className="toggle">{showAdd && <Add onAdd={addPost} />}</div>
      </div>
      <div className="postArea">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDelete={deletePost}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <Modal
        ariaHideApp={false}
        id="modal_edit"
        isOpen={showEditModal}
        onRequestClose={handleCloseEditModal}
      >
        {editPostId && (
          <Edit
            postId={editPostId}
            onClose={handleCloseEditModal}
            updatePost={updatePost}
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
