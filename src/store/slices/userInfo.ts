import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Login } from "@src/api/apis";

// 尝试获取本地用户信息
const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    account: userProfile.account || "",
    username: userProfile.username || "",
    avatar: "",
    isLoading: false,
    isError: false,
  },
  reducers: {
    setUserInfo(state, action: PayloadAction<Partial<typeof state>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.account = action.payload.account || "";
        state.username = action.payload.username || "";
        state.avatar = action.payload.avatar || "";
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export const login = createAsyncThunk(
  "userInfo/login",
  async (params: { account: string; password: string }) => {
    const loginResp = await Login(params.account, params.password);
    return loginResp;
  },
);
