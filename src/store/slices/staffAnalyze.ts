import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStaffAnalysis } from "@src/api/apis";
import { StaffAnalysisType } from "./types";

const initialState: StaffAnalysisType = {
  staffAmountList: [],
  pieList: [],
  columnList: [],
  wordingYearsInfo: {},
  isLoading: false,
  isError: false,
};

export const staffAnalysisSlice = createSlice({
  name: "staffAnalysis",
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
      .addCase(fetchStaffAnalysis.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchStaffAnalysis.fulfilled, (state, { payload }) => {
        const newState: Partial<StaffAnalysisType> = {
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
      .addCase(fetchStaffAnalysis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setAmounDataList } = staffAnalysisSlice.actions;

export const fetchStaffAnalysis = createAsyncThunk(
  "staffAnalysis/fetchStaffAnalysis",
  async () => {
    const staffAnalysisResp = await GetStaffAnalysis();
    return staffAnalysisResp;
  },
);
