import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import GenericTemplate from "../../common/templates/GenericTemplate";
import axios from "axios";
import Container from "@material-ui/core/Container";
// import OptionCreateFormModal from "./components/OptionCreateFormModal";

type Props = {} & RouteComponentProps<{}>;

const useStyles = makeStyles({
  root: {},
  pageTitle: {
    marginBottom: 10,
  },
  container: {
    paddingTop: 20,
    paddingBottom: 10,
  },
});

const getToolbarStyle = () => {
  const upAndDown = 0;
  const leftAndRight = 10;

  return {
    padding: `${upAndDown}px ${leftAndRight}px`,
  };
};

const Contacts: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [toolberStyle] = useState(getToolbarStyle);

  const title = "契約管理";
  const createModal = "";
  const [entries, setEntries] = useState({
    data: [
      {
        id: 1,
        create_at: "",
        updated_at: "",
        name: "コースA",
        is_deleted: false,
      },
      {
        id: 2,
        create_at: "",
        updated_at: "",
        name: "コースB",
        is_deleted: false,
      },
    ],
  });

  const columns = [
    { title: "ID", field: "id" },
    { title: "名前", field: "name" },
  ];

  // レンダリング時にデータをfetchする
  // useEffect(() => {
  //   const targetURL = `${process.env.REACT_APP_API_URL}/api/options/`;
  //   axios
  //     .get(targetURL)
  //     .then((response) => {
  //       let data: any = [];
  //       // is_deletedがfalseデータのみで配列を作成
  //       response.data.forEach((el: any) => {
  //         if (el.is_deleted === false) {
  //           data.push({
  //             id: el.id,
  //             name: el.name,
  //           });
  //         }
  //       });
  //       setEntries({ data: data });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <GenericTemplate title={""}>
      <Container maxWidth="md" className={classes.container}>
        <MaterialTable
          title={title}
          columns={columns}
          data={entries.data}
          localization={{
            header: { actions: "" },
          }}
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

export default withRouter(Contacts);
