import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import GenericTemplate from "../../common/templates/GenericTemplate";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { AppDispatch } from "../../app/store";
import {
  fetchAsyncGetOptions,
  fetchAsyncCreateTask,
  selectOptions,
  getOptions
} from "../../pages/options/optionSlice";

type Props = {
  title: string;
  targetURL: string;
  data: { id: number; name: string };
  columns: { title: string; field: string }[];
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
  const dispatch: AppDispatch = useDispatch();

  const title = props.title;
  const targetURL = props.targetURL;

  const [toolberStyle] = useState(getToolbarStyle);
  const localization = {
    header: { actions: "" },
  };

  const [entries, setEntries] = useState({
    data: [props.data],
  });

  const [state] = useState({
    columns: props.columns,
  });

  const gets = useSelector(selectOptions);

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
          columns={state.columns}
          data={entries.data}
          localization={localization}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={toolberStyle}>{props.createModal}</div>
              </div>
            ),
          }}
          actions={[
            {
              icon: "delete",
              tooltip: "Delete Option",
              onClick: (event, rowData: any) => console.log(gets),
            },
          ]}
        />
      </Container>
    </div>
  );
};

export default withRouter(CommonMaterialTable);
