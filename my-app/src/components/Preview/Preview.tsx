import React from "react";
import './Preview.css';

interface PostProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: string;
  };
}

const Preview: React.FC<PostProps> = ({ post}) => {
  return (
    <div key={post.id}>
      <div className="container">
        <div className="card">
          <div className="card__header">
            <img
              src="https://source.unsplash.com/600x400/?food" 
              alt="card__image"
              className="card__image"
              width={600}
            />
          </div>
          <div className="card__body">
            <span className="tag tag-red">Tags</span>
            <h4>{post.title}</h4>
            <p>
            {post.content}
            </p>
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
                <small>{post.author}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Preview;
