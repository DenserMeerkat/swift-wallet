"use client";
import React from "react";
import { useAppContext } from "../context/app-context";

const WelcomeCard = () => {
  const { user } = useAppContext();
  const [isDomLoaded, setIsDomLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) {
    return <></>;
  }

  const getGreeting = () => {
    const date = new Date();
    let hours = date.getHours();

    if (hours > 16) {
      return "Good Evening";
    } else if (hours > 12) {
      return "Good Afternoon";
    } else if (hours > 6) {
      return "Good Morning";
    } else {
      return "Hey";
    }
  };
  const firstName = user?.name.split(" ")[0] ?? "Anonymous";
  return (
    <div className="mx-auto w-fit">
      <span className="text-center text-[clamp(12px,7vw,36px)] font-bold">
        <span>{getGreeting()}</span>
        <span> ! </span>
        <span className="text-primary"> {firstName}</span>,
      </span>
    </div>
  );
};

export default WelcomeCard;
