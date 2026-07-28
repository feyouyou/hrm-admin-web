import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Login } from "@src/api/apis";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    account: "",
    username: "",
    isLoading: false,
    isError: false,
  },
  reducers: {
    setUserInfo(state, action: PayloadAction<typeof state>) {
      state.account = action.payload.account;
      state.username = action.payload.username;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.account = action.payload.account;
        state.username = action.payload.username;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export const fetchUserInfo = createAsyncThunk(
  "userInfo/fetchUserInfo",
  async (params: { account: string; password: string }) => {
    const loginResp = await Login(params.account, params.password);
    console.log(loginResp);
    return {
      account: (loginResp as any).data.account,
      username: (loginResp as any).data.username,
    };
  },
);
