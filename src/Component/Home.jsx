import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const url = 'http://localhost:5000/posts';
    console.log('Fetching posts from URL:', url);

    axios.get(url)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const category = encodeURIComponent(e.target.value);
    setSearchParams({ category });
  };

  const filteredPosts = category
    ? posts.filter((post) => post.category === category)
    : posts;

  return (
    <div>
      <h1>Blog Posts</h1>
      <select onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
      </select>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
