import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStaffList } from "@src/api/apis";
import { GetStaffListRepsponse } from "@src/api/types";

type StaffDataSlice = Partial<
  {
    isLoading: boolean;
    isError: boolean;
  } & GetStaffListRepsponse
>;

const initialState: StaffDataSlice = {
  staffList: [],
  staffTotal: 0,
  isLoading: false,
  isError: false,
};

export const staffDataSlice = createSlice({
  name: "staffData",
  initialState,
  reducers: {
    setStaffData(state, action: PayloadAction<Partial<typeof state>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStaffList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchStaffList.fulfilled, (state, action) => {
        state.staffList = action.payload.staffList;
        state.staffTotal = action.payload.staffTotal;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchStaffList.rejected, (state, action) => {
        console.log("fetchStaffListError", action);
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setStaffData } = staffDataSlice.actions;

export const fetchStaffList = createAsyncThunk(
  "staffList/fetchStaffList",
  async (params: { pageSize: number }) => {
    const staffListResp = await GetStaffList(params);
    return {
      staffList: staffListResp.staffList,
      staffTotal: staffListResp.staffTotal,
    };
  },
);
