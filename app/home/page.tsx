'use client';
import React, { useEffect, useState } from "react";
import SpotifyClient from "../layout/components/SpotifyClient";

const HomePage = () => {

  const [data, setData] = useState<any>({} as any);

  useEffect(() => {

    console.error('Lets work!');

    const client = new SpotifyClient();

    client.call("/me")
      .then(j => setData(j));

  }, []);

  return <h1>Welcome {data.display_name}</h1>;
  
}

export default HomePage;
