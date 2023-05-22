import Style from "./index.module.css";
import { Link } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <AppBar style={{background:"indigo"}} position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div sx={{ flexGrow: 0 }} className={Style.Hamburger}>
            <MenuIcon />
          </div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://www.apollo-magazine.com/wp-content/uploads/2021/11/Web-lead-image_FINAL_Dostoevsky-.jpg?resize=900%2C600"
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Link to="">
              <Button variant="contained">Home</Button>
            </Link>
            <Link style={{ marginLeft: "5px" }} to="/authors">
              <Button variant="contained">Authors</Button>
            </Link>
            <Link style={{ marginLeft: "5px" }} to="/addauthor">
              <Button variant="contained">Add Author</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
{
  /* <ul>


</ul> */
}
