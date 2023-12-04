import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./Context";
import Home from "./Components/Home/Home";
import Membership from "./Components/Membership/Membership";
import Profile from "./Components/Profile/Profile";
import MobSidebar from "./Components/mobSidebar/mobSidebar";
import Sidebar from "./Components/Sidebar/Sidebar";
import "./App.css";
import Footer from "./Components/Footer/Footer";

interface UserData {
  user_id: number | string;
  name: string;
  email: string;
  password: string;
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [logged_in, setLoggedIn] = useState<boolean>(false);
  const [sidebar, IsOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
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
      <Footer />
    </Context.Provider>
  );
}

export default App;
