import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./Landing";
import PrivateRoutes from "./components/PrivateRoutes";
import { useEffect } from "react";
import { auth, db } from "./firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import CreateAPodcastPage from "./CreateAPodcast";
import Podcasts from "./Podcasts";
import PodcastDetailsPage from "./PodcastDetails";
import CreateAnEpisodePage from "./CreateAnEpisode";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
     onAuthStateChanged(auth, (user) => {
      console.log("running useEffect");
      if (user) {
        onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log("user data",userData)
              console.log("running useEffect-snapshot");
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            toast.error("Error fetching user data:", error);
          }
        );

        
      }
    });

   
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreateAPodcastPage />} />
            <Route path="/podcasts" element={<Podcasts/>}/>
            <Route path="/podcast/:id" element={<PodcastDetailsPage/>}  />
            <Route path="/podcast/:id/create-an-episode" element={<CreateAnEpisodePage/>}  />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
