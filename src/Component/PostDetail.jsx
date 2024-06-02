import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:5000/posts/${id}`;
    console.log('Fetching post from URL:', url);

    axios.get(url)
      .then((response) => {
        setPost(response.data);
        document.title = response.data.title;
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  const handleDelete = () => {
    const url = `http://localhost:5000/posts/${id}`;
    console.log('Deleting post from URL:', url);

    axios.delete(url)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>
      <p>Category: {post.category}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default PostDetail;
