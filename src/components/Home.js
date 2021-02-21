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
import Grid from "@material-ui/core/Grid";
import Camera from "@material-ui/icons/CameraAlt";
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
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));
export default function Home() {
  const classes = useStyles();
  const [user, setUser] = useState(localStorage.getItem("profile"));
  const [file, setFile] = useState(null);
  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     // let response = await axios.post("http://localhost:5050/register");
  //   }
  //   fetchMyAPI();
  // }, [user]);
  // if (!user) {
  //   return <Redirect to="/" />;
  // }

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };
  const handleFileUpload = (event) => {
    setFile(event.target.files);
    console.log("event.target.files0: ", event.target.files[0]);
    console.log("event.target.files: ", event.target.files);
  };

  const submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file[0]);
    axios
      .post(`http://localhost:5050/test-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        // handle your error
        console.log(error);
      });
  };

  return (
    <>
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
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

        <Grid>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            label="upload file"
            type="file"
            onChange={handleFileUpload}
          ></input>
          <label htmlFor="contained-button-file">
            <Button
              color="primary"
              variant="contained"
              component="span"
              className={classes.button}
            >
              <Camera style={{ marginRight: "4px" }} />
              select a Picture
            </Button>
          </label>
          <Button
            onClick={submitFile}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Upload
          </Button>
        </Grid>
      </div>
    </>
  );
}
