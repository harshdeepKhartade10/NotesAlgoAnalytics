import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    username:"",
    password: "",
  });
  const [error, setError] =useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange =(e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        }, 
        body:JSON.stringify(formData),
      });

      const data= await response.json();

      if (!response.ok) {
        throw new Error(data.error|| "Login failed");
      }

      login(data.user,data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={ formData.username}
            onChange= {handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id= "password"
            name="password"
            className ="form-control"
            value={formData.password }
            onChange= {handleChange}
            required
          />
        </div>
        <button  type="submit" className="btn btn-primary" disabled= {loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p  className="form-footer">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
