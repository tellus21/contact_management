import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { READ_OPTION, POST_OPTION, OPTION_STATE } from "../options/optionTypes";

export const fetchAsyncGetOptions = createAsyncThunk(
  "option/getOption",
  async () => {
    const res = await axios.get<READ_OPTION[]>(
      `${process.env.REACT_APP_API_URL}/api/options/`
      // {
      //   headers: {
      //     Authorization: `JWT ${localStorage.localJWT}`,
      //   },
      // }
    );
    return res.data;
  }
);

export const fetchAsyncCreateTask = createAsyncThunk(
  "option/createTask",
  async (option: POST_OPTION) => {
    const res = await axios.post<READ_OPTION>(
      `${process.env.REACT_APP_API_URL}/api/options/`,
      option
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `JWT ${localStorage.localJWT}`,
      //   },
      // }
    );
    return res.data;
  }
);

export const fetchAsyncUpdateTask = createAsyncThunk(
  "option/updateTask",
  async (option: POST_OPTION) => {
    const res = await axios.put<READ_OPTION>(
      `${process.env.REACT_APP_API_URL}/api/options/${option.id}/`,
      option
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `JWT ${localStorage.localJWT}`,
      //   },
      // }
    );
    return res.data;
  }
);

// export const fetchAsyncDeleteTask = createAsyncThunk(
//   "option/deleteTask",
//   async (id: number) => {
//     // await axios.delete(`${process.env.REACT_APP_API_URL}/api/options/${id}/`, {
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //     Authorization: `JWT ${localStorage.localJWT}`,
//     //   },
//     // });
//     return id;
//   }
// );

export const initialState: OPTION_STATE = {
  options: [
    {
      id: 0,
      name: "",
      is_deleted: false,
      created_at: "",
      updated_at: "",
    },
  ],
  // selectedOption: {
  //   id: 0,
  //   name: "",
  //   is_deleted: false,
  //   created_at: "",
  //   updated_at: "",
  // },
  editedOption: {
    id: 0,
    name: "",
    is_deleted: false,
  },
};

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    // POST_OPTION型のオブジェクトを受け取ってそのまま格納
    editOption(state, action: PayloadAction<POST_OPTION>) {
      state.editedOption = action.payload;
    },
    // selectOption(state, action: PayloadAction<READ_OPTION>) {
    //   state.selectedOption = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetOptions.fulfilled,
      (state, action: PayloadAction<READ_OPTION[]>) => {
        return {
          ...state,
          options: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetOptions.rejected, () => {
      window.location.href = "/";
    });
  },
});

export const { editOption } = optionSlice.actions;
// export const selectSelectedOption = (state: RootState) =>
//   state.option.selectedOption;
export const selectEditedOption = (state: RootState) =>
  state.option.editedOption;
export const selectOptions = (state: RootState) => state.option.options;
// export const selectUsers = (state: RootState) => state.option.users;
// export const selectCategory = (state: RootState) => state.option.category;
export default optionSlice.reducer;
