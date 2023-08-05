import React, { useEffect, useState } from "react";
import VidGrid from "../component/VidGrid";

const Trending = () => {
  const [vidList, setVidList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const authHeader = "Bearer " + token;
    fetch(`${process.env.REACT_APP_BASE_URL}/videos/trending`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    })
      .then(async (response) => {
        const { data } = await response.json();
        setVidList(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1 className="font-semibold text-black">Trending Today</h1>
      <VidGrid data={vidList} />
    </div>
  );
};

export default Trending;
