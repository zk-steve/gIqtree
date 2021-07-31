import React, { useState } from "react";
import { Input } from "@material-ui/core";
import { Search } from "shared/icons";
import useStyles from "./styles";
const { ipcRenderer } = window.require("electron");
function SearchField(props) {
  const classes = useStyles();
  const [value, setValue] = useState();
  const onSubmit = () => {
    ipcRenderer.send("search", value);
  };
  ipcRenderer.on("searchProject", (event, data) => {
    console.log(data);
  });
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <Input
          name="project"
          classes={{ root: classes.input }}
          size="small"
          variant="filled"
          placeholder="Search"
          disableUnderline
          startAdornment={<Search />}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchField;
