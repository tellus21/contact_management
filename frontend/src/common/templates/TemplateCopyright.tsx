import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const TemplateCopyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        進捗管理システム
      </Link>{" "}
      {/* {new Date().getFullYear()} */}
      2021
      {"."}
    </Typography>
  );
};

export default TemplateCopyright;
