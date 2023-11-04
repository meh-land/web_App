import React, { useEffect } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Membership from "./Components/Membership/Membership";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./Context";
import { useState } from "react";
import Profile from "./Components/Profile/Profile";
import MobSidebar from "./Components/mobSidebar/mobSidebar";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [logged_in, setLoggedIn] = useState(false);
  const [walletConnected, IsConnected] = useState(false);
  const [sidebar, IsOpen] = useState(false);
  const [userData, setUserData] = useState({
    user_id: "",
    name: "",
    email: "",
    password: "",
  });

  return (
    <Context.Provider
      value={{
        logged_in,
        setLoggedIn,
        userData,
        setUserData,
        walletConnected,
        IsConnected,
        sidebar,
        IsOpen,
        isLoading,
        setIsLoading,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MobSidebar />
                <Sidebar />
                <Home />
              </>
            }
          />
          <Route
            path="/Profile"
            element={
              <>
                <MobSidebar />
                <Sidebar />
                <Profile element="EditProfile" />
              </>
            }
          />
          <Route
            path="/Profile/ChangePassword"
            element={
              <>
                <MobSidebar />
                <Sidebar />
                <Profile element="ChangePassword" />
              </>
            }
          />
          <Route
            path="/Profile/DeleteAccount"
            element={
              <>
                <MobSidebar />
                <Sidebar />
                <Profile element="DeleteAccount" />
              </>
            }
          />
          <Route path="/Membership" element={<Membership />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
