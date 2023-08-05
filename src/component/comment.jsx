import React from "react";

const Comment = ({ comment }) => {

  return (
    <>
      <div className="flex flex-col mt-8 mr-0">
        <div className="flex items-center">
          <div>
            <img className="w-[50px] h-[50px] rounded-[50%]" src={comment?.postedBy?.profileImage} />
          </div>
          <div className="ml-2">
            <div className="font-semibold mb-1">{comment?.postedBy?.username}</div>
            <div className="text-sm">
              {comment.date}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col text-black mt-2 ml-2">
          {comment.text}
        </div>
      </div>
    </>
  );
};

export default Comment;
