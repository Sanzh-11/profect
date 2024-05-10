import React, { useState, useEffect } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  console.log(user);
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem("profile", JSON.stringify(res.data));
          axios
            .get(
              `https://veiled-shrouded-random.glitch.me/check-by-email?email=${res.data.email}`
            )
            .then((res) => {
              console.log(res);
              if (res.data.admin) {
                navigate("/admin");
              } else {
                navigate("/main");
              }
            })
            .catch((err) => {
              console.log(err);
              navigate("/main");
            });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          setUser(credentialResponse);
          console.log(credentialResponse);
          <Navigate to="/main" />;
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      /> */}
      <button onClick={login}>Sign in with Google 🚀 </button>
    </div>
  );
};

export default AuthPage;
