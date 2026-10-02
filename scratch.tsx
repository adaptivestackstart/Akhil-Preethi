"use client";
import { useState, useEffect, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ScratchComponent() {
  const isClient = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
  
  const [timeLeft, setTimeLeft] = useState(() => {
    return { days: 1, hours: 2, minutes: 3, seconds: 4 };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft({ days: 1, hours: 2, minutes: 3, seconds: 5 });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) return <div />;

  return <div>{timeLeft.seconds}</div>;
}
