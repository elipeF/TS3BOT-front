import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

const Spinner = (props) => (
    <Box display="flex" alignItems="center" justifyContent="center" style={{ width: "100%" }}>
        <CircularProgress {...props} />
    </Box>
);

export default Spinner;