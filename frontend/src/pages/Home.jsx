import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [notes,setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =useState(null);
  const { updateNotesCount } = useAuth();

  useEffect(() => {
    const fetchNotes = async () =>{
      try {
        const response = await  api.get("/notes");
        setNotes(response.data);
        updateNotesCount(response.data.length);
        setLoading(false);
      } catch (err){
        setError("Failed to fetch notes");
        setLoading(false);
      }
    };

    fetchNotes();
  },[updateNotesCount]);

  if (loading) return <div className="loading"></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="notes-header">
        <h1>My Notes</h1>
        {notes.length >  0 && (
          <Link to="/add" className="btn btn-primary">
            Add New Note
          </Link>
        )}
      </div>
      {notes.length === 0 ?(
        <div className="no-notes">
          <p>You haven't created any notes yet.</p>
          <Link to="/add" className="btn btn-primary">
            Create Your First Note
          </Link>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <Link to={`/note/${note._id}`}  key={note._id}  className="note-link">
              <div className="note-card">
                <h3>{note.title}</h3>
                <p>{note.content.substring(0, 150)}...</p>
                <div className="note-meta">
                  <small>
                    Created:{new Date(note.createdAt).toLocaleDateString()}
                  </small>
                  <small>
                    Updated:  {new Date(note.updatedAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
