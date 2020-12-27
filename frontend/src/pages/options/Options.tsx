import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable from "material-table";
import GenericTemplate from "../../common/templates/GenericTemplate";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { OPTION_STATE, POST_OPTION, READ_OPTION } from "./optionTypes";
import OptionFormDialog from "./components/OptionFormDialog";
import {
  fetchAsyncGetOptions,
  fetchAsyncCreateOption,
  fetchAsyncDeleteOption,
  fetchAsyncUpdateOption,
  selectEditedOption,
} from "./optionSlice";
import { AppDispatch } from "../../app/store";
import { Rowing } from "@material-ui/icons";
import OptionModal from "./components/OptionModal";

type Props = {} & RouteComponentProps<{}>;

const useStyles = makeStyles({
  root: {},
  container: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  pageTitle: {
    marginBottom: 10,
  },
});

const title = "コースマスタ";

const targetURL = `${process.env.REACT_APP_API_URL}/api/options/`;

const DocktorIndex: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const editedOption = useSelector(selectEditedOption);
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        name: "",
      },
    ],
  });

  const [state] = React.useState({
    columns: [
      { title: "ID", field: "id" },
      { title: "名前", field: "name" },
    ],
  });

  useEffect(() => {
    axios
      .get(targetURL)
      .then((response) => {
        let data = Array();
        response.data.forEach((el: any) => {
          data.push({
            id: el.id,
            name: el.name,
          });
        });
        setEntries({ data: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <GenericTemplate title={""}>
      <OptionFormDialog />
      <OptionModal />
      <Container maxWidth="md" className={classes.container}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.pageTitle}
        ></Typography>
        <MaterialTable
          title={title}
          columns={state.columns}
          data={entries.data}
          actions={[
            {
              icon: "save",
              tooltip: "Save Option",
              // onClick: (event, rowData: any) => console.log(rowData.id),
              onClick: (event, rowData: any) =>
                // console.log(dispatch(fetchAsyncGetOptions())),

                console.log(editedOption),
            },
          ]}
        />
      </Container>
    </GenericTemplate>
  );
};

export default withRouter(DocktorIndex);
