import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import GenericTemplate from "../frontend/src/common/templates/GenericTemplate";
import {
  READ_OPTION,
  POST_OPTION,
  PUT_OPTION,
} from "../frontend/src/pages/options/optionTypes";
// import { selectEditedOption } from "./optionSlice";
import { AppDispatch } from "../frontend/src/app/store";
import OptionFormModal from "../frontend/src/pages/options/components/OptionFormModal";
import CommonMaterialTable from "../frontend/src/common/components/CommonMaterialTable";
import fetchAsyncGetOptions from "../frontend/src/pages/options/optionSlice";

type Props = {} & RouteComponentProps<{}>;

const Options: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const getOption = dispatch(fetchAsyncGetOptions);

  // const editedOption = useSelector(selectEditedOption);
  useEffect(() => {
    const fetchBootLoader = async () => {
      // await dispatch(fetchAsyncGetOptions());
    };
    fetchBootLoader();
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
        data={entries}
        components={""}
        createModal={createModal}
      />
    </GenericTemplate>
  );
};

export default withRouter(Options);
