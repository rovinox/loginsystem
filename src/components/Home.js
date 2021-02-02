import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function Home() {
  const classes = useStyles();
  const [isLogIn, setIsLogin] = useState(false);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await axios.post("http://localhost:5050/register");
      console.log("response: ", response);
      setIsLogin(response.data.isLogin);
    }
    fetchMyAPI();
  }, [isLogIn]);
  // if (!isLogIn) {
  //   return <Redirect to="/" />;
  // }

  const handleLogout = () => {
    setIsLogin(true);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" className={classes.title}>
              N M
            </Typography>
            <Button onClick={handleLogout} color="inherit">
              logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
    </>
  );
}
