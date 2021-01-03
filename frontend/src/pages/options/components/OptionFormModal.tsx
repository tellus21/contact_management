import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Button, TextField, Modal } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  initialState,
  // selectEditedOption,
  // fetchAsyncCreateOption,
} from "../optionSlice";
import SaveIcon from "@material-ui/icons/Save";
import { editOption } from "../../options/optionSlice";

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    margin: theme.spacing(2),
    minWidth: 240,
  },
  saveModal: {
    marginTop: theme.spacing(4),
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
  // フォントサイズの変更方法がわからない
  const font_size = 60;

  return {
    top: `${top}%`,
    left: `${left}%`,
    font_size: `${font_size}px`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const OptionFormModal: React.FC = (props) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  // const editedOption = useSelector(selectEditedOption);

  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [inputText, setInputText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const isDisabled =
  //   editedOption.option.length === 0 ||
  //   editedOption.description.length === 0 ||
  //   editedOption.criteria.length === 0;

  const isOptDisabled = inputText.length === 0;

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        新規登録
      </Button>
      <form>
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <TextField
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              label="登録オプション"
              type="text"
              value={inputText}
              onChange={handleInputTextChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.saveModal}
              startIcon={<SaveIcon />}
              disabled={isOptDisabled}
              onClick={() => {
                // dispatch(fetchAsyncCreateOption(inputText));
                dispatch(editOption(initialState.editedOption));
                console.log(dispatch(editOption(initialState.editedOption)));
                handleClose();
              }}
            >
              登録
            </Button>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default OptionFormModal;
