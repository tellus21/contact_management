import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import GenericTemplate from "../../common/templates/GenericTemplate";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import OptionFormModal from "./components/OptionFormModal";

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
  const upAndDown = 0;
  const leftAndRight = 10;

  return {
    padding: `${upAndDown}px ${leftAndRight}px`,
  };
};

const Options: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [toolberStyle] = useState(getToolbarStyle);
  const title = "オプションマスタ";

  const targetURL = `${process.env.REACT_APP_API_URL}/api/options/`;
  const localization = { header: { actions: "" } };

  const createModal = <OptionFormModal />;

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
          localization={localization}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={toolberStyle}> {createModal}</div>
              </div>
            ),
          }}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete",
              onClick: (event, rowData: any) => console.log("deleteClick"),
            },
            {
              icon: "edit",
              tooltip: "Edit",
              onClick: (event, rowData: any) => console.log("editClick"),
            },
          ]}
        />
      </Container>
    </GenericTemplate>
  );
};

export default withRouter(Options);
