import React, { useEffect, useState } from "react";
import VidCard from "../component/VidCard";
import {  useSearchParams, useNavigate } from "react-router-dom";
import SearchOption from "../component/SearchOption";

const SearchResults = () => {
  const [vidList, setVidList] = useState([]);
  const [searchInp, setSearchInp] = useState("");
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();

  const { q } = Object.fromEntries([...params]);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const authHeader = "Bearer " + token;
    console.log(q);
    if (q) {
      fetch(`${process.env.REACT_APP_BASE_URL}/videos/search/${q}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      })
        .then(async (response) => response.json())
        .then((data) => {
          setVidList(data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/videos/search?q=${searchInp}`);
  };

  return (
    <div className="flex flex-col xl:flex-row-reverse items-center h-full overflow-hidden">
      <div className="flex flex-col xl:w-[40%] w-full border-b-2 xl:border-l-2 border-black h-full">
        <div className="flex items-start justify-center mb-4 mt-8">
          <SearchOption setSearchInp={setSearchInp} />
          <button
            className="border border-black p-1 rounded-md ml-2 mt-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      { vidList?.length !== 0 ?
        <div className="xl:w-[60%] w-full h-full overflow-auto">
          <div className="flex flex-col">
            <div className="w-full h-full">
              <div className="px-3 grid sm:mt-6 mt-6 grid-cols-1 md:grid-cols-2 gap-6">
                {vidList.map((vid, index) => (
                  <VidCard key={index} vid={vid} />
                ))}
              </div>
            </div>
          </div>
          <div className="mb-60"></div>
        </div>
        :
        <div className="text-4xl text-red-700 m-auto">
          No Video Found
        </div>
      }
    </div>
  );
};

export default SearchResults;
