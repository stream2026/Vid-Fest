import React from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";

function VidCard({ vid }) {
  const img = vid?.thumbnail;
  return (
    <div className="text-black">
      <Link style={{ textDecoration: 'none' }} to={`/videos/${vid?._id}`}>
        <div className="border border-black p-1 hover:scale-100 scale-95 transitions relative rounded text-black hover:bg-gray-200">
            <img
              src={img}
              alt={vid?.videoName?.substring(0,12)}
              className="w-full h-64 object-cover"
            />
          <div className="flex-col gap-y-0.5 bottom-0 right-0 left-0 bg-dry px-4 py-3">
            <h3 className="font-semibold truncate">{vid?.videoname || vid?.videoName || vid?.movieName}</h3>
            <div className="flex-btn gap-20">
              <div>
              <span className="font-semibold">{vid?.views}</span> views
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default VidCard
