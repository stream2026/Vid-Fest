import React, { useEffect, useState } from "react";
import VidGrid from "../component/VidGrid";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const [vidList, setVidList] = useState([]);
  const [error, setError] = useState(null)


  const { category } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const authHeader = "Bearer " + token;
    fetch(`${process.env.REACT_APP_BASE_URL}/videos/categories/${category}`, {
      headers:{
        "Content-Type": "application/json",
        'Authorization': authHeader,
      }
    })
      .then(async (response) => {
        const { data } = await response.json();
        setVidList(data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err)
      });
  }, [category]);

  if(error){
    return (
      <div className='text-4xl text-red-700 m-auto'>
        { error }
      </div>
    )
  }

  return (
    <div>
      <VidGrid data={vidList} />
    </div>
  );
};

export default CategoryPage;
