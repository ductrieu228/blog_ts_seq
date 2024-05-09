import React from 'react';

interface PostProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: string;
  };
  onDelete: (id: number) => void;
  onEdit: (postId: number) => void;
}

const Post: React.FC<PostProps> = ({ post, onDelete, onEdit }) => {
  return (
    <div key={post.id}>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
      <button onClick={() => onDelete(post.id)}>Delete</button>
      <button onClick={() => onEdit(post.id)}>Edit</button>
    </div>
  );
};

export default Post;
