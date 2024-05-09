import React from "react";
import "./post.css";
import { formatDistance } from "date-fns";
interface PostProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
  };
  onDelete: (id: number) => void;
  onEdit: (postId: number) => void;
}

const Post: React.FC<PostProps> = ({ post, onDelete, onEdit }) => {
  return (
    <div key={post.id}>
      <div className="container">
        <div className="card">
          <div className="card__header">
            <img
              src="https://source.unsplash.com/600x400/?computer"
              alt="card__image"
              className="card__image"
              width={600}
            />
          </div>
          <div className="card__body">
            <span className="tag tag-brown">Tags</span>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
          <div className="card__footer">
            <div className="user">
              <img
                src="https://i.pravatar.cc/40?img=3"
                alt="user__image"
                className="user__image"
              />
              <div className="user__info">
                <h5>{post.author}</h5>
                <small>
                  {formatDistance(new Date(post.updatedAt), new Date(), {
                    addSuffix: true,
                  })}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="buttonPost">
        <button
          className="tag tag-red"
          id="deleteBut"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </button>
        <button
          className="tag tag-blue"
          id="editBut"
          onClick={() => onEdit(post.id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Post;
