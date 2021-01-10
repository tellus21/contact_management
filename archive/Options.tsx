import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import GenericTemplate from "../frontend/src/common/templates/GenericTemplate";
import CommonMaterialTable from "../frontend/src/common/components/CommonMaterialTable";
import {
  READ_OPTION,
  POST_OPTION,
  OPTION_STATE,
} from "../frontend/src/pages/options/optionTypes";
// import { selectEditedOption } from "./optionSlice";
import { AppDispatch } from "../frontend/src/app/store";
import OptionFormModal from "../frontend/src/pages/options/components/OptionFormModal";
import {
  selectOptions,
  initialState,
} from "../frontend/src/pages/options/optionSlice";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

type Props = {} & RouteComponentProps<{}>;

const Options: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const options = useSelector(selectOptions);

  const [state, setState] = useState<OPTION_STATE>({
    options: options,
    editedOption: initialState.editedOption,
  });

  // useEffect(() => {
  //   const fetchBootLoader = async () => {
  //     await dispatch(fetchAsyncGetOptions());
  //   };
  //   fetchBootLoader();
  //   // console.log(options);
  //   // setState((state) => ({
  //   //   ...state,
  //   //   options: options,
  //   //   editedOption: initialState.editedOption,
  //   // }));
  //   // console.log(state);
  //   // console.log(options);
  // }, [dispatch]);

  const title = "オプションマスタ";
  const targetURL = `${process.env.REACT_APP_API_URL}/api/options/`;
  // const entries = { id: 0, name: "" };
  const initialData = [{ id: 0, name: "", tableData: "" }];
  // const columns = [
  //   { title: "ID", field: "id" },
  //   { title: "名前", field: "name" },
  // ];
  const columns = [
    { title: "ID", field: "id" },
    { title: "名前", field: "name" },
  ];
  const createModal = <OptionFormModal />;

  return (
    <GenericTemplate title={""}>
      <CommonMaterialTable
        title={title}
        targetURL={targetURL}
        initialData={initialData}
        columns={columns}
        components={""}
        createModal={createModal}
      />
    </GenericTemplate>
  );
};

export default withRouter(Options);
