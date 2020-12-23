import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import MaterialTable from "material-table";
import GenericTemplate from "../../common/templates/GenericTemplate";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

type Props = {} & RouteComponentProps<{}>;

const Companies: React.FC = () => {
  return (
    <GenericTemplate title={""}>
      <div>
      Companies
    </div>
    </GenericTemplate>
  )
}

export default withRouter(Companies)
