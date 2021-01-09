import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { AppDispatch } from "../../app/store";

type Props = {
  title: string;
  targetURL: string;
  columns: {}[];
  data: {};
  components: {};
  createModal: {};
} & RouteComponentProps<{}>;

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

const CommonMaterialTable: React.FC<Props> = (props) => {
  const classes = useStyles();
  // const editedOption = useSelector(selectEditedOption);
  const [toolberStyle] = useState(getToolbarStyle);

  const title = props.title;
  const columns = props.columns;
  const localization = { header: { actions: "" } };
  // const components = props.components;
  const createModal = props.createModal;

  const [entries, setEntries] = useState({
    data: [props.data],
  });

  // useEffect(() => {
  //   axios
  //     .get(props.targetURL)
  //     .then((response) => {
  //       let data = Array();
  //       response.data.forEach((el: any) => {
  //         data.push({
  //           id: el.id,
  //           name: el.name,
  //         });
  //       });
  //       setEntries({ data: data });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div>
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
          columns={columns}
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
    </div>
  );
};

export default withRouter(CommonMaterialTable);
