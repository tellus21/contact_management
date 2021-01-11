import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";

type Props = {
  title: string;
  targetURL: string;
  initialData: {}[];
  columns: {}[];
  components: {};
  createModal: {};
  actions: [];
} & RouteComponentProps<{}>;

const useStyles = makeStyles({
  root: {},
  pageTitle: {
    marginBottom: 10,
  },
});

const CommonMaterialTable: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [entries] = useState({
    data: props.initialData,
  });
  return (
    <div>
      <button onClick={() => console.log()}></button>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        noWrap
        className={classes.pageTitle}
      ></Typography>
      <MaterialTable
        title={props.title}
        columns={props.columns}
        data={entries.data}
        localization={{
          header: { actions: "" },
        }}
        components={props.components}
        actions={props.actions}
      />
    </div>
  );
};

export default withRouter(CommonMaterialTable);
