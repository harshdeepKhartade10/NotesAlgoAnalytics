import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const NoteDetail = () => {
  const [note,setNote] = useState(null);
  const [loading, setLoading] =useState(true);
  const [error, setError]= useState(null);
  const { id} = useParams();
  const navigate =  useNavigate();

  useEffect(() =>{
    const fetchNote =async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
        setLoading(false);
      } catch(err) {
        setError("Failed to fetch note");
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () =>{
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await api.delete(`/notes/${id}`);
        navigate("/");
      }catch (err) {
        setError("Failed to delete note");
      }
    }
  };

  if (loading) return <div className="loading"></div>;
  if (error) return <div className="error">{error}</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <div className="container">
      <div className="note-detail">
        <h1>{note.title}</h1>
        <div className="note-meta">
          <small>
            Created:{new Date(note.createdAt).toLocaleDateString()}
          </small>
          <small>
            Updated: {new Date(note.updatedAt).toLocaleDateString()}
          </small>
        </div>
        <div className="note-content">
          <p>{note.content}</p>
        </div>
        <div className="note-actions">
          <button className="btn btn-primary" onClick={() =>navigate("/")}>
            Back to Home
          </button>
          <button className="btn btn-danger"  onClick={handleDelete}>
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
