import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./component/Nav";
import Sidebar from "./component/Sidebar";
import Vid from "./pages/Vid";
import AddMovie from "./pages/AddMovie";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import WatchHistory from "./pages/WatchHistory";
import CategoryPage from "./pages/CategoryPage";
import FollowPage from "./pages/FollowPage";
import SearchResults from "./pages/SearchResults";
import Trending from "./pages/Trending";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seed, setSeed] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [seed]);
  if (!isLoggedIn) {
    return <Register seed={seed} setSeed={setSeed} />;
  }
  return (
    <div className="bg-[#FFFFFA] h-screen w-screen overflow-hidden">
      <Nav seed={seed} setSeed={setSeed} />
      <div className="flex flex-row w-full h-full gap-2">
        <div>
          <Sidebar />
        </div>
        <div className="h-full w-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/videos">
              <Route path="new" element={<AddMovie />} />
              <Route path="history" element={<WatchHistory />} />
              <Route path="trending" element={<Trending />} />
              <Route path="followed" element={<FollowPage />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="category/:category" element={<CategoryPage />} />
              <Route path=":id" element={<Vid />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
