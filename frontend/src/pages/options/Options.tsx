import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import GenericTemplate from "../../common/templates/GenericTemplate";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { OPTION_STATE, POST_OPTION, READ_OPTION } from "./optionTypes";
import {
  fetchAsyncGetOptions,
  fetchAsyncCreateOption,
  fetchAsyncDeleteOption,
  fetchAsyncUpdateOption,
  selectEditedOption,
} from "./optionSlice";
import { AppDispatch } from "../../app/store";
import OptionFormModal from "./components/OptionFormModal";
import CommonMaterialTable from "../../common/components/CommonMaterialTable";

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

const getToolbarStyle = () => {
  const topAndbottom = 0;
  const leftAndRight = 10;

  return {
    padding: `${topAndbottom}px ${leftAndRight}px`,
  };
};

const Options: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const editedOption = useSelector(selectEditedOption);

  const title = "オプションマスタ";
  const targetURL = `${process.env.REACT_APP_API_URL}/api/options/`;
  const [toolberStyle] = useState(getToolbarStyle);

  const localization = {
    header: { actions: "" },
  };

  // const [entries, setEntries] = useState({
  //   data: [
  //     {
  //       id: 0,
  //       name: "",
  //     },
  //   ],
  // });

  const entries = { id: 0, name: "" };

  const columns = [
    { title: "ID", field: "id" },
    { title: "名前", field: "name" },
  ];

  // const [state] = React.useState({
  //   columns: [
  //     { title: "ID", field: "id" },
  //     { title: "名前", field: "name" },
  //   ],
  // });

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
        // setEntries({ data: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <GenericTemplate title={""}>
      <CommonMaterialTable
        title="おぷます"
        targetURL={targetURL}
        data={entries}
        columns={columns}
      />
      <Container maxWidth="md" className={classes.container}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.pageTitle}
        ></Typography>
        {/* <MaterialTable
          title={title}
          columns={state.columns}
          data={entries.data}
          localization={localization}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={toolberStyle}>
                  <OptionFormModal />
                </div>
              </div>
            ),
          }}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete Option",
              onClick: (event, rowData: any) => console.log(editedOption),
            },
          ]}
        /> */}
      </Container>
    </GenericTemplate>
  );
};

export default withRouter(Options);
