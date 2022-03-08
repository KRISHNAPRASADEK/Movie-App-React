import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import TvIcon from "@mui/icons-material/Tv";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SearchIcon from "@mui/icons-material/Search";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useNavigate();

  React.useEffect(() => {
    if (value === 0) history("/");
    else if (value === 1) history("/movies");
    else if (value === 2) history("/series");
    else if (value === 3) history("/search");
  }, [value, history]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 100,
      }}
    >
      <BottomNavigation
        style={{ backgroundColor: "#2d313a" }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieCreationIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="TV Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
