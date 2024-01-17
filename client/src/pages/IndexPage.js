import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async () => {
    try {
      const url = searchQuery
        ? `flazetech-blogging-website-mern-api.vercel.app/search?query=${searchQuery}`
        : `flazetech-blogging-website-mern-api.vercel.app/post`;

      const response = await fetch(url);
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchQuery]);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={fetchPosts}>Search</button>
      </div>

      {posts.length > 0 ? (
        posts.map(post => <Post key={post._id} {...post} />)
      ) : (
        <p>No posts found.</p>
      )}
    </>
  );
}
