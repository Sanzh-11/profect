import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="727845772264-m7g2rtpthdc6hfb56p8jvbrevqf8h0hs.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
