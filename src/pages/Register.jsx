import React, { useState, useRef } from "react";
import coverImg from "../logos/img1.jpg";
import { Input } from "../component/UserInput";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import logo from "../logos/logo-no-background.png";
import { ClipLoader } from "react-spinners";
import DefImg from "../logos/default_profile.png";
import axios from "axios";

const Register = ({ seed, setSeed }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const submitRegisterHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!username) {
      setError("Username must be provided");
      setLoading(false);
      return;
    }
    if (!email) {
      setError("Email must be provided");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Password must be provided");
      setLoading(false);
      return;
    }
    if (!confirmPassword) {
      setError("Password must be confirmed");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Password can not be confirmed");
      setLoading(false);
      return;
    }
    let data = {
      username,
      password,
      email,
    };
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
          formData
        );
        data = {
          ...data,
          profileImg: res.data.secure_url,
        };
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }
    console.log(data);
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setLoading(false);
      const { token } = res;
      if (!token) {
        setError(res.message);
        return;
      }
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      localStorage.setItem("token", token);
      setSeed((seed) => !seed);
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };
  const submitLoginHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!username) {
      setError("Username must be provided");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Password must be provided");
      setLoading(false);
      return;
    }

    const data = {
      username,
      password,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setLoading(false);
      const { token } = res;
      if (!token) {
        setError(res.message);
        return;
      }
      localStorage.setItem("token", token);
      setSeed((seed) => !seed);
      setUsername("");
      setPassword("");
      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };
  if (registered) {
    return (
      <div className="overflow-hidden h-full">
        <div className="w-full h-screen flex">
          <div className="absolute top-0 left-0 p-4">
            <img src={logo} alt="Logo" className="w-16 h-16" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Input form */}
            <span className="font-bold text-5xl bg-gradient-to-tr from-indigo-600 to-purple-950 text-transparent bg-clip-text mt-30">
              <div>Welcome Back</div>
            </span>
            <div className="w-full 2xl:w-2/5 gap-5 flex-col p-8 sm:p-14 md:w-3/5 bg-main rounded-lg border-border">
              <form>
                <Input
                  label="Username"
                  placeholder="Enter your Username"
                  type="email"
                  bg={true}
                  data={username}
                  setData={setUsername}
                />
                <Input
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  bg={true}
                  data={password}
                  setData={setPassword}
                />
                <div className="flex items-center justify-center mt-8">
                  <button
                    className="bg-subMain m-auto flex items-center w-45 transition hover:bg-purple-400 gap-4 text-black p-2 rounded-lg border border-slate-950"
                    type="submit"
                    onClick={submitLoginHandler}>
                    <FiLogIn />
                    <div className="font-medium">Sign In</div>
                    <div>
                      {loading && <ClipLoader size={30} color="#36d7b7" />}
                    </div>
                  </button>
                </div>
              </form>
              {error && (
                <div className="text-sm text-red-800 mt-4">{error}</div>
              )}
              <p className="text-center my-8 text-border">
                Don't have account?{" "}
                <button
                  onClick={() => {
                    setIsRegistered(false);
                  }}
                  className="text-purple-600 font-semibold ml-2 cursor-pointer">
                  Sign Up
                </button>
              </p>
            </div>
          </div>
          <div className="w-[40%] h-full">
            <img src={coverImg} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden h-screen">
      <div className="w-full h-screen flex">
        <div className="absolute top-0 left-0 p-4">
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center mt-10">
          {/* Input form */}
          <span className="font-bold text-5xl bg-gradient-to-tr from-indigo-600 to-purple-950 text-transparent bg-clip-text mt-30">
            <div>Get Registered Here</div>
          </span>
          <div className="w-full gap-5 flex-col p-8 sm:p-10 md:w-3/5 bg-main rounded-lg border-border">
            <form>
              <div
                onClick={handleClick}
                style={{
                  cursor: "pointer",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}>
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="upload profile"
                    className="h-[96px] w-[96px] rounded-full"
                  />
                ) : (
                  <img
                    src={DefImg}
                    alt="upload profile"
                    className="h-[96px] w-[96px] ml-[35px]"
                  />
                )}
                <div className="font-semibold text-15">
                  Upload Profile Image
                </div>
                <input
                  type="file"
                  onChange={handleImageChange}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
              </div>
              <div className="flex flex-row gap-2">
                <Input
                  label="Username"
                  placeholder="Enter your Username"
                  type="email"
                  bg={true}
                  data={username}
                  setData={setUsername}
                />
                <Input
                  label="Email"
                  placeholder="Enter your Email"
                  type="email"
                  bg={true}
                  data={email}
                  setData={setEmail}
                />
              </div>

              <div className="flex flex-row gap-2">
                <Input
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  bg={true}
                  data={password}
                  setData={setPassword}
                />
                <Input
                  label="Confirm Password"
                  placeholder="Enter Password"
                  type="password"
                  bg={true}
                  data={confirmPassword}
                  setData={setConfirmPassword}
                />
              </div>
              <div className="flex items-center justify-center mt-8">
                <button
                  className="bg-subMain m-auto flex items-center w-45 transition hover:bg-purple-400 gap-4 text-black p-2 rounded-lg border border-slate-950 mt-8"
                  type="submit"
                  onClick={submitRegisterHandler}>
                  <FiLogIn />
                  <div className="font-medium">Sign Up</div>
                  <div>
                    {loading && <ClipLoader size={30} color="#36d7b7" />}
                  </div>
                </button>
              </div>
            </form>
            {error && <div className="text-sm text-red-800 mt-4">{error}</div>}
            <p className="text-center my-8 text-border">
              Already have account?{" "}
              <button
                onClick={() => {
                  setIsRegistered(true);
                }}
                className="text-purple-600 font-semibold ml-2 cursor-pointer">
                Sign In
              </button>
            </p>
          </div>
        </div>
        <div className="w-[40%] h-full">
          <img src={coverImg} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Register;
