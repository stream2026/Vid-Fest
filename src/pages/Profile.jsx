import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditProfile from "../component/EditProfile";
import { AiFillCaretDown } from "react-icons/ai";
import { AiFillCaretUp, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import VidGrid from "../component/VidGrid";
import DeleteModal from "../component/DeleteModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/auth/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.profile);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  }, []);

  const deleteHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/profile`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    localStorage.removeItem("token");
    navigate("/");
    navigate(0);
  };

  return (
    <>
      {error && (
        <div>
          <h2 className="text-red-600 text-2xl m-8">{error.message}</h2>
          <button className="border-2 border-black m-8 p-2 rounded-md flex items-center cursor-pointer hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in">
            <Link to="/">Go To Homepage</Link>
          </button>
        </div>
      )}
      {user && !error && (
        <div>
          <div>
            <div className="h-80 relative">
              <img
                className="w-full h-80 object-cover mt-1"
                src={user.coverImage}
                alt="cover"
              />
              <img
                className="w-48 h-48 border-4 border-white rounded-full object-cover absolute left-0 right-0 m-auto top-52"
                src={user.profileImage}
                alt=""
              />
            </div>
            <div className="flex flex-col items-center justify-center mt-16 mb-16">
              <h4 className="text-2xl font-semibold mt-4 mb-2">
                {user.username}
              </h4>
              <span> {user.email} </span>
            </div>
          </div>
          <div className="m-8 flex">
            <div>
              <button
                onClick={() =>
                  setEditModal((modal) => {
                    if (modal === "edit") return "";
                    else return "edit";
                  })
                }
                className="border-2 border-black p-2 rounded-md flex items-center cursor-pointer hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in">
                Edit Profile{" "}
                {editModal === "edit" ? (
                  <AiFillCaretUp className="ml-1" />
                ) : (
                  <AiFillCaretDown className="ml-1" />
                )}
              </button>
            </div>
            <div className="ml-8">
              <button
                onClick={() =>
                  setEditModal((modal) => {
                    if (modal === "passChange") return "";
                    else return "passChange";
                  })
                }
                className="border-2 border-black p-2 rounded-md flex items-center cursor-pointer hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in">
                Change Password{" "}
                {editModal === "passChange" ? (
                  <AiFillCaretUp className="ml-1" />
                ) : (
                  <AiFillCaretDown className="ml-1" />
                )}
              </button>
            </div>
            <div className="ml-8">
              <button
                onClick={() => setDeleteModal(true)}
                className="border-2 border-black p-2 rounded-md flex items-center cursor-pointer hover:bg-red-200 hover:border-red-700 transition duration-150 ease-out hover:ease-in">
                Delete Account <AiFillDelete className="ml-2" size={18} />
              </button>
            </div>

            <DeleteModal
              showModal={deleteModal}
              hideModal={() => setDeleteModal(false)}
              message={"Are you sure you want to delete your account ?"}
              deleteHandler={deleteHandler}
            />
          </div>
          <div>
            {editModal && (
              <EditProfile modal={editModal} setModal={setEditModal} />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold ml-8 mt-24 mb-20">
              Liked Videos
            </h1>
            <VidGrid data={user.likedVideos} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
