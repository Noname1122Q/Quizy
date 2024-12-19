"use client";
import React, { useEffect, useState } from "react";

type Props = {};

const CustomWordCloud = (props: Props) => {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true); // Ensures rendering happens only on the client
  // }, []);

  // if (!isClient) {
  //   return null; // Prevent rendering on the server
  // }

  return (
    <div
      className={`flex w-full justify-center items-center text-gray-500`}
    ></div>
  );
};

export default CustomWordCloud;
