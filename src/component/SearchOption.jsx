import React, { useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";

const SearchOption = ({ setSearchInp }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch(`${process.env.REACT_APP_BASE_URL}/videos/options`,
    {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json([]);
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        // Assuming that the response data is an array of strings (video names)
        setOptions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // The empty array as the second argument makes this effect run only once on component mount

  // Callback function to handle search
  const handleSearch = (word) => {
    setSearchInp(word);
  };

  return (
    <div className="">
        <Autocomplete setSearchInp={setSearchInp} options={options} onSearch={handleSearch} />
    </div>
  );
};

export default SearchOption;
