import React, { useEffect, useState,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import GenericTemplate from "../../common/templates/GenericTemplate";
import CommonMaterialTable from "../../common/components/CommonMaterialTable";
import { READ_OPTION, POST_OPTION } from "./optionTypes";
// import { selectEditedOption } from "./optionSlice";
import { AppDispatch } from "../../app/store";
import OptionFormModal from "../options/components/OptionFormModal";
import {
  fetchAsyncGetOptions,
  fetchAsyncCreateTask,
  selectOptions,
  getOptions,
  selectEditedOption,
} from "./optionSlice";

type Props = {} & RouteComponentProps<{}>;

const Options: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const options = useSelector(selectOptions);

  // const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

  //最初に実行しておく＆dispatchの度に値を更新
  useEffect(() => {
    const fetchBootLoader = async () => {
      // await sleep(100);
      await dispatch(fetchAsyncGetOptions());
    };
    fetchBootLoader();
    console.log(options);
  }, [dispatch]);

  const title = "オプションマスタ";
  const columns = [
    { title: "ID", field: "id" },
    { title: "名前", field: "name" },
  ];

  const data = [
    {
      id: options[0].id,
      name: options[0].name,
      // is_deleted: options[0].is_deleted,
    },
    {
      id: 2,
      name: "ddd",
      // is_deleted: options[0].is_deleted,
    },
  ];

  const createModal = <OptionFormModal />;
  return (
    <GenericTemplate title={""}>
      <CommonMaterialTable
        title={""}
        columns={columns}
        data={data}
        components={""}
        createModal={createModal}
      />
    </GenericTemplate>
  );
};

export default withRouter(Options);
