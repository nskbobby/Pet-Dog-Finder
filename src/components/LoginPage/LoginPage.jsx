import axios from "axios";
import React, { useState } from "react";
import "./LoginPage.css";
import Header from "../Header";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function LoginPage({ onLoginSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          name: name,
          email: email,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        onLoginSuccess();
      }
    } catch (error) {
      alert("Failed to Login. Please try again");
    }
  };

  return (
    <div className="container-main px-2 py-2">
      <div className="container">
        <Header />
        <div className="login-main d-sm-flex flex-column pt-3 align-items-center text-center">
          <div className="greeting-login-page d-flex flex-column ">
            <h2 className="display-5 ">
              Your New Best Friend is Waiting for You!
            </h2>
            <p className="lead text-white">
              Did you know there are countless pets in your area looking for a
              loving home? Whether you're searching for a loyal companion or
              want to help animals in need, you’re in the right place. Enter
              details and find to start your journey
            </p>
          </div>

          <form id="login" onSubmit={handleLogin} className="p-3">
            <div>
              <input
                id="name"
                autoComplete="on"
                className="lead m-sm-2 "
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                required
              />
            </div>
            <div>
              <input
                id="email"
                autoComplete="on"
                className="lead "
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={50}
                required
              />
            </div>
            <div>
              <button className="btn mt-1 me-3 text-white" type="submit">
                <ArrowForwardIcon fontSize="large" />
              </button>
            </div>
          </form>

          <div className="section whyJoinUs ">
            <h4 className="lead">
              <b>Why Join Us?</b>
            </h4>
            <p className="lead">
              🐾 <b>Find Your Perfect Match:</b> Discover pets near you that fit
              your lifestyle and preferences.
            </p>
            <p className="lead">
              🏠 <b>Adopt, Don’t Shop:</b> Give a forever home to a pet in need
              and change their life.
            </p>
            <p className="lead">
              📍 <b>Local Connections:</b> Connect with shelters, fosters, and
              pet lovers in your community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
