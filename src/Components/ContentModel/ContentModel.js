import "./ContentModel.css";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";
import { img_500, unavailable } from "../../Config/Config";
import { Button } from "@mui/material";
import { YouTube } from "@mui/icons-material";
import Carousal from "./Carousel/Carousel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  bgcolor: "#39445a",
  border: "2px solid #282c34",
  borderRadius: 10,
  color: "white",
  boxShadow: 24,
  padding: "8px 8px 24px",
};

export default function ContentModel({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState([]);
  const [video, setVideo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    const trailer = data.results.find((item) => {
      return item.type === "Trailer";
    });
    setVideo(trailer?.key);
  };

  React.useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content.lenth !== 0 && (
            <Box sx={style}>
              <div className="contentModel">
                <img
                  className="contentModel_portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                />
                <img
                  className="contentModel_landscape"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                />
                <div className="contentModel_about">
                  <span className="contentModel_title">
                    {content.name || content.title}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "------"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="contentModel_description">
                    {content.overview}
                  </span>
                  <div>
                    <Carousal media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTube />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch The Trailer
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}
