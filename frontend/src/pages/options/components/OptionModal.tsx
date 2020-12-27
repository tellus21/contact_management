import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Modal } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { initialState } from "../optionSlice";

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    margin: theme.spacing(2),
    minWidth: 240,
  },
  button: {
    margin: theme.spacing(3),
  },
  addIcon: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    textAlign: "center",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const OptionModal: React.FC = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [inputText, setInputText] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <h2>Option</h2>
      <form>
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <TextField
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              label="New category"
              type="text"
              value={inputText}
              onChange={handleInputTextChange}
            />
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default OptionModal;
