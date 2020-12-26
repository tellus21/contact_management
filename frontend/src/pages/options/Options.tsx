import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable from "material-table";
import GenericTemplate from "../../common/templates/GenericTemplate";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { OPTION_STATE, POST_OPTION, READ_OPTION } from "./optionTypes"

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
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  console.log(data);
                  const payload = {
                    id: newData.id,
                    name: newData.name,
                  };
                  axios
                    .post(targetURL, newData, {
                      params: {
                        id: entries.data[0].id,
                        name: entries.data[0].name,
                      },
                    })
                    .then((res) => {
                      console.log(res.data.data);
                    });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  // @ts-ignore
                  data[data.indexOf(oldData)] = newData;
                  axios
                    .put(`${targetURL}+${newData.id}/`, newData, {
                      params: {
                        id: entries.data[0].id,
                        name: entries.data[0].name,
                      },
                    })
                    .then((res) => console.log(res.data));
                  setEntries({ ...entries, data });
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  const data = [...entries.data];
                  data.splice(data.indexOf(oldData), 1);
                  axios
                    .delete(`${targetURL}+${oldData.id}/`, {
                      params: {
                        id: entries.data[0].id,
                      },
                    })
                    .then((res) => console.log(res.data));
                  setEntries({ ...entries, data });
                }, 600);
              }),
          }}
        />
      </Container>
    </GenericTemplate>
  );
};

export default withRouter(DocktorIndex);
