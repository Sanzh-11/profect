import React, { useState, useEffect } from "react";

const AuthPage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  function handleCallbackResponse(response) {
    console.log(response.credential);
    setIsSignedIn(response.credential !== null);
  }
  console.log(isSignedIn);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "727845772264-m7g2rtpthdc6hfb56p8jvbrevqf8h0hs.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outlined",
      size: "large",
    });
  });

  return <div id="signInDiv">AuthPage</div>;
};

export default AuthPage;
