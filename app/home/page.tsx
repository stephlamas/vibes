'use client';
import React, { useEffect, useState } from "react";

function checkForCookie(name : string) {
  let cookieString = document.cookie.match(name + '=[^;]+')
  return cookieString ? cookieString[0] : cookieString
}

const HomePage = () => {

  const [data, setData] = useState<any>({} as any);

  useEffect(() => {

    console.error('Lets work!');

    var regex = /accessToken=(.[^;]*)/ig;
    var match = regex.exec(document.cookie);
    const accessToken = match && match[1];

    const refreshToken = checkForCookie('refreshToken');

    console.error(accessToken);
    console.error(refreshToken);

    const fetchUser = async () => fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    fetchUser()
      .then(r => r.json())
      .then(j => {
        console.log(j);
        setData(j);
      })
      .catch(e => {
        throw new Error("Failed!");
      });

  }, []);

  return <h1>Welcome {data.display_name}</h1>;
  
}

export default HomePage;
