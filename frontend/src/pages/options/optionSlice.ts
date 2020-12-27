import { selectCount } from "./../../features/counter/counterSlice";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { OPTION_STATE, POST_OPTION, READ_OPTION } from "./optionTypes";

export const fetchAsyncGetOptions = createAsyncThunk(
  "option/getOption",
  async () => {
    const res = await axios.get<READ_OPTION[]>(
      `${process.env.REACT_APP_API_URL}/api/options/`,
      {
        headers: {
          //   Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncCreateOption = createAsyncThunk(
  "option/createOption",
  async (option: POST_OPTION) => {
    const res = await axios.post<READ_OPTION>(
      `${process.env.REACT_APP_API_URL}/api/options/`,
      option,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncUpdateOption = createAsyncThunk(
  "option/updateOption",
  async (option: POST_OPTION) => {
    const res = await axios.put<READ_OPTION>(
      `${process.env.REACT_APP_API_URL}/api/options/${option.id}/`,
      option,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncDeleteOption = createAsyncThunk(
  "option/deleteOption",
  async (id: number) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/options/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return id;
  }
);

export const initialState: OPTION_STATE = {
  options: [
    {
      id: 0,
      is_deleted: false,
      created_at: "",
      updated_at: "",
    },
  ],
  editedOption: {
    id: 0,
    name: "",
  },
  selectedOption: {
    id: 0,
    is_deleted: false,
    created_at: "",
    updated_at: "",
  },
};

const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    editOption(state, action: PayloadAction<POST_OPTION>) {
      state.editedOption = action.payload;
    },
    selectOption(state, action: PayloadAction<READ_OPTION>) {
      state.selectedOption = action.payload;
    },
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
    builder.addCase(
      fetchAsyncCreateOption.fulfilled,
      (state, action: PayloadAction<READ_OPTION>) => {
        return {
          ...state,
          options: [action.payload, ...state.options],
          editedOption: initialState.editedOption,
        };
      }
    );
    builder.addCase(
      fetchAsyncUpdateOption.fulfilled,
      (state, action: PayloadAction<READ_OPTION>) => {
        return {
          ...state,
          options: state.options.map((t) =>
            t.id === action.payload.id ? action.payload : t
          ),
          editedOption: initialState.editedOption,
          selectedOption: initialState.selectedOption,
        };
      }
    );
    builder.addCase(fetchAsyncUpdateOption.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(
      fetchAsyncDeleteOption.fulfilled,
      (state, action: PayloadAction<number>) => {
        return {
          ...state,
          options: state.options.filter((t) => t.id !== action.payload),
          editedOption: initialState.editedOption,
          selectedoption: initialState.selectedOption,
        };
      }
    );
    builder.addCase(fetchAsyncDeleteOption.rejected, () => {
      window.location.href = "/";
    });
  },
});

export const { editOption, selectOption } = optionSlice.actions;
export const selectSelectedOption = (state: RootState) =>
  state.option.selectedOption;
export const selectEditedOption = (state: RootState) =>
  state.option.editedOption;
export const selectOptions = (state: RootState) => state.option.options;
export default optionSlice.reducer;
