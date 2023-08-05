import React, { useState } from "react";
import VidCard from "./VidCard";

const VidGrid = (props) => {
  const { data } = props;
  const maxPage = 5;
  const [page, setPage] = useState(maxPage);
  const HandleLoadingMore = () => {
    setPage(page + maxPage);
  };
  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="grid sm:mt-6 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {data?.slice(0, page)?.map((vid, index) => (
          <VidCard key={index} vid={vid} />
        ))}
      </div>
      {page < data?.length ? (
        <div className="w-full h-52 flex-colo md:my-2 my-2 justify-center items-center">
          <button
            onClick={HandleLoadingMore}
            className="flex-rows gap-3 text-black py-3 px-8 rounded font-semibold border-dry border hover:bg-red-200 hover:border-2 hover:border-subMain justify-center items-center"
          >
            Load More
          </button>
        </div>
      ) : (
        <div className="w-full h-52 flex-colo md:my-2 my-2 justify-center items-center"></div>
      )}
    </div>
  );
};

export default VidGrid;
