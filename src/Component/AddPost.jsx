import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    const newPost = { title, content, author, category };
    axios.post('http://localhost:5000/posts', newPost).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <h1>Add New Post</h1>
      <form onSubmit={Submit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div>
          <label>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default AddPost;
