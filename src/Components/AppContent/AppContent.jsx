import React from "react";
import RegistrationForm from "../RegistrationForm";
import TimeScheduler from "../TimeScheduler";
import AboutWeb from "../AboutWeb";
import Navbar from "../Navbar";
import MyCalendar from "../BigCalendar";
import { Button } from "antd";
import { useGoogleLogout } from "@react-oauth/google";

const AppContent = () => {
  const { signOut } = useGoogleLogout();
  const logOut = () => {
    console.log("ssds");
    signOut();
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "50px",
          padding: "10px",
        }}
      >
        <Button style={{ display: "flex" }} onClick={logOut}>
          Log Out
        </Button>
      </div>
      <Navbar />
      <AboutWeb />
      <div>
        <RegistrationForm />
        <TimeScheduler />
      </div>
      <MyCalendar />
    </>
  );
};
export default AppContent;
