import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error,setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate();

  const handleSubmit =async (e) =>{
    e.preventDefault();
    setLoading(true);
    try{
      await api.post("/notes", {
        title,
        content,
      });
      navigate("/");
    } catch(err) {
      setError("Failed to create note");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create New Note</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) =>setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className="form-control"
              value={content}
              onChange={(e) =>setContent(e.target.value)}
              rows="10"
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled= {loading}
            >
              {loading ?  "Creating..." : "Create Note"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={()=> navigate("/")}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
