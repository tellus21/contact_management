import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import GenericTemplate from "../../common/templates/GenericTemplate";
import CommonMaterialTable from "../../common/components/CommonMaterialTable";
import { READ_OPTION, POST_OPTION, OPTION_STATE } from "./optionTypes";
// import { selectEditedOption } from "./optionSlice";
import { AppDispatch } from "../../app/store";
import OptionFormModal from "../options/components/OptionFormModal";
import {
  fetchAsyncGetOptions,
  fetchAsyncCreateTask,
  selectOptions,
  initialState,
} from "./optionSlice";

type Props = {} & RouteComponentProps<{}>;

const Options: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const options = useSelector(selectOptions);

  const [state, setState] = useState<OPTION_STATE>({
    options: options,
    editedOption: initialState.editedOption,
  });

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetOptions());
    };
    fetchBootLoader();
    console.log(options);
    setState((state) => ({
      ...state,
      options: options,
      editedOption: initialState.editedOption,
    }));
    // console.log(state);
    // console.log(options);
  }, [dispatch]);

  const title = "オプションマスタ";
  const targetURL = `${process.env.REACT_APP_API_URL}/api/options/`;
  const entries = { id: 0, name: "" };
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
        columns={columns}
        data={state}
        components={""}
        createModal={createModal}
      />
    </GenericTemplate>
  );
};

export default withRouter(Options);
