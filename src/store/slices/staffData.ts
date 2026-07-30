import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStaffData } from "@src/api/apis";
import { StaffDataType } from "./types";

const initialState: StaffDataType = {
  staffAmountList: [],
  pieList: [],
  columnList: [],
  wordingYearsInfo: {},
  isLoading: false,
  isError: false,
};

export const staffDataSlice = createSlice({
  name: "staffData",
  initialState,
  reducers: {
    setAmounDataList(state, action: PayloadAction<Partial<typeof state>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStaffData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchStaffData.fulfilled, (state, { payload }) => {
        const newState: Partial<StaffDataType> = {
          staffAmountList: [
            {
              title: "总人数",
              amount: payload.total,
            },
            {
              title: "入职1年内员工",
              amount: payload.onboardingTimeData.one,
            },
            {
              title: "入职1-2年内员工",
              amount: payload.onboardingTimeData.two,
            },
            {
              title: "入职3年以上员工",
              amount: payload.onboardingTimeData.three,
            },
          ],
          pieList: [
            {
              title: "员工性别占比",
              renderList: payload.genderList,
            },
          ],
          columnList: [
            {
              title: "员工年龄占比",
              renderList: payload.ageMap,
              styleData: { width: "49.8%", height: "350px" },
            },
          ],
          wordingYearsInfo: {
            title: "工龄最久的10个人",
            renderList: payload.wordingYearsMaps,
            styleData: { width: "49.8%", height: "350px" },
          },
        };

        return {
          ...state,
          ...newState,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(fetchStaffData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setAmounDataList } = staffDataSlice.actions;

export const fetchStaffData = createAsyncThunk(
  "staffData/fetchStaffData",
  async () => {
    const staffDataResp = await GetStaffData();
    return staffDataResp;
  },
);
