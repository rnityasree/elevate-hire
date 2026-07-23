import { useContext } from "react";

import { SnackbarContext } from "../context/SnackbarContext";

export default function useSnackbar() {

    return useContext(SnackbarContext);

}