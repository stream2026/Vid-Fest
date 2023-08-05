import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import VidCard from "./VidCard";


const SliderComp = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  const [vidList, setVidList] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const authHeader = "Bearer " + token;
    fetch(`${process.env.REACT_APP_BASE_URL}/videos/featured`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    })
      .then(async (response) => {
        const { data } = await response.json();
        setVidList(data);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  }, []);

  if (error) {
    return <div className="text-4xl text-red-700 m-auto">{error}</div>;
  }
  if(vidList.length <= 2){
    settings = {
      ...settings,
      slidesToShow: 1,
    }
    return (
      <div className="mt-4 pb-12 border-b border-black">
        <h1 className="ml-4">Featured</h1>
        <Slider {...settings}>
          {
            vidList?.map((vid,ind)=>{
              return (
                <div key={ind} >
                  <VidCard vid={vid} />
                </div>
              )
            })
          }
        </Slider>
      </div>
    );
  }
  return (
    <div className="mt-4 pb-12 border-b border-black">
      <h1 className="ml-4">Featured</h1>
      <Slider {...settings}>
        {
          vidList?.map((vid,ind)=>{
            return (
              <div key={ind} >
                <VidCard vid={vid} />
              </div>
            )
          })
        }
      </Slider>
    </div>
  );
};

export default SliderComp;
