import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Home";
import User from "./User";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserState } from "./Contexts/userContext";
import Username from "./Username";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <UserState>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="*" element={<User />} />
          <Route
            path="/username"
            element={
              <>
                <Navbar />
                <Username />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <Dashboard />
              </>
            }
          />
          {/* <Route
            path="/feedback"
            element={
              <>
                <Navbar />
                <Feedback />
              </>
            }
          /> */}
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          position: "bottom-right",
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </UserState>
  );
};

export default App;
