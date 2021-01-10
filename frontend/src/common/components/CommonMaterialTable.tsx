import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

type Props = {
  title: string;
  targetURL: string;
  initialData: {}[];
  columns: {}[];
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
  const [toolberStyle] = useState(getToolbarStyle);

  const title = props.title;
  const localization = { header: { actions: "" } };
  const createModal = props.createModal;

  // データ
  const [entries, setEntries] = useState({
    data: props.initialData,
  });

  // 列
  const columns = props.columns;

  const fetchAsyncGetData = () => {
    const aaaa = Object.keys(props.initialData[0]).pop();

    const insertData = () => {
      const initialDataAllKey: string[] = Object.keys(props.initialData[0]);
      const deleteData: any = initialDataAllKey.pop();

      const newa = initialDataAllKey.filter((word) => word !== "tableData");
      // const newab = newa.forEach((element) => `${element}:el&${element},`);
      const newab = newa.map(
        // (element) => element + ":" + "el" + "[" + element + "]" + ","
        (element) => `${element}:el[${element}],`
      );

      return newab;
    };
    // const insertData = Object.keys(props.initialData[0]).pop();

    axios
      .get(props.targetURL)
      .then((response) => {
        let data = Array();
        response.data.forEach((el: any) => {
          data.push({
            id: el.id,
            name: el.name,
          });
        });
        console.log(insertData());
        setEntries({ data: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // レンダリング後の動作
  useEffect(() => {
    fetchAsyncGetData();
  }, []);

  return (
    <div>
      <button onClick={() => console.log()}></button>
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
