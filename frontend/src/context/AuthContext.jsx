import { createContext, useState, useContext, useEffect } from "react";

const AuthContext =createContext(null);

export const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [notesCount,setNotesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    try {
      const token =localStorage.getItem("token");
      const userData= localStorage.getItem("user");

      if (token && userData) {
        try {
          const parsedUser =JSON.parse(userData);
          // Validate that parsedUser has required properties
          if(
            parsedUser &&
            typeof parsedUser === "object" &&
            parsedUser.username
          ){
            setUser(parsedUser);
          } else{
            // Invalid user data, clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch(parseError) {
          console.error("Error parsing user data:", parseError);
          // Clear invalid data from storage
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    } catch(error) {
      console.error("Error accessing localStorage:", error);
    } finally{
      setLoading(false);
    }
  },[]);

  const login =(userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
  };

  const logout = () =>{
    setUser(null);
     setToken(null);
    localStorage.removeItem("token");
  };

  const updateNotesCount = (count) => {
    setNotesCount(count);
  };

  if (loading){
    return <div className="loading">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value= {{ user, token, login, logout, notesCount, updateNotesCount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const  useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
