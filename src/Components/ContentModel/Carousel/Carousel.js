import "./Carousel.css";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import { img_300, noPicture } from "../../../Config/Config";

const handleDragStart = (e) => e.preventDefault();

const Carousal = ({ media_type, id }) => {
  const [credits, setCredits] = useState([]);
  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredits(data.cast);
  };

  const items = credits?.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        className="carouselItem_img"
        onDragStart={handleDragStart}
      />
      <a
        href={`https://www.themoviedb.org/person/${c.id}`}
        target="_blank"
        style={{ cursor: "pointer", textDecoration: "none", color: "white" }}
        rel="noopener noreferrer"
      >
        <b className="carouselItem_text">{c?.name}</b>
      </a>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      infinite
      mouseTracking
      keyboardNavigation
      disableDotsControls
      disableButtonsControls
      items={items}
    />
  );
};

export default Carousal;
