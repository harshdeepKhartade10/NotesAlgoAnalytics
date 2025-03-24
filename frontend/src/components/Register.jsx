import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData,setFormData] = useState({
    username : "",
    email: "",
    password:"",
    confirmPassword : "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () =>{
    if (!formData.username || formData.username.length < 3) {
      setError("Username  must be at least 3 characters long");
      return false;
    }
    if (!formData.email  || !formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(" Passwords do not match");
      return false;
    }
    return true;
  };

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError("");

    if(!validateForm()) {
      return;
    }

    setLoading(true);

    try{
      const response = await fetch("http://localhost:5000/api/auth/register",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          email : formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data =await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      login(data.user,data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create Account</h2>
        {error &&  <div className="error">{error}</div>}
        <form onSubmit= {handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={ formData.username}
              onChange ={handleChange}
              minLength="3"
              required
            />
            <small>Must be at least 3 characters long</small>
          </div>
          <div className= "form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value= {formData.email}
              onChange={ handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type = "password"
              id= "password"
              name="password"
              className ="form-control"
              value={ formData.password }
              onChange={handleChange }
              minLength="6"
              required
            />
            <small>Must be at least 6 characters long</small>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id= "confirmPassword"
              name="confirmPassword"
              className="form-control"
               value={formData.confirmPassword}
              onChange={handleChange}
               required
            />
          </div>
          <button  type="submit" className="btn btn-primary"  disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="form-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
