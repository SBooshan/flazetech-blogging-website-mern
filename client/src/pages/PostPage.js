import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import React from "react";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`flazetech-blogging-website-mern-api.vercel.app/post/${id}`);
        const postInfo = await response.json();
        setPostInfo(postInfo);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`flazetech-blogging-website-mern-api.vercel.app/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (response.ok) {
        // Optionally update the state or refetch the post to display the new comment
        setCommentText("");
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!postInfo) return "";

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>

      {/* Existing code... */}

      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />

      {/* Comments Section */}
      <div className="comments-section">
        <h2>Comments</h2>
        <ul>
          {postInfo.comments &&
            postInfo.comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
        </ul>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Add Comment</button>
      </div>
    </div>
  );
}
