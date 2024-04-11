import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Detail from "./pages/Detail";
import NotFound from "./pages/NotFound";
import AddEditBlog from "./features/Blogs/AddEditBlog";
import { Toaster } from "react-hot-toast";
import Header from "./ui/Header";
import Auth from "./features/authentication/Auth";
import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import { signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/auth");
    });
  };

  return (
    <div className="">
      <Header user={user} handleLogout={handleLogout} />
      <Toaster />
      <div className="text-center ">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/detail/:id" element={<Detail user={user} />} />
          <Route
            path="/create"
            element={
              user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/update/:id"
            element={
              user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
