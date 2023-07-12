import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { userInfo } from "@/types";

const initialState: userInfo = {
  userInfo: {
    kyc: "",
    userInfo: "",
    name: "",
    email: "",
    mobile: "",
    photo: "",
    dob: "",
    userdata: "",
  },
  kyc: {
    panNumber: "",
  },
  address: {
    line1: " ",
    line2: " ",
    pincode: "",
    city: " ",
    state: " ",
  },
  bankDetails: {
    accountName: " ",
    accountNumber: " ",
    bankName: " ",
    ifsc: " ",
  },

  isAddressCompleted: false,
  isKycDone: false,
  isPanUploaded: false,
  isEmailVerified: false,
  isMobileVerified: false,
  isBankDetailsCompleted: false,
  isBasicDetailsCompleted: false,
  isLoggedIn: false,
  pageLoader: false,
};

export const manager = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAuth: (state: any, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state: any, action: PayloadAction<any>) => {
      state.userInfo = {
        name: action.payload.name,
        email: action.payload.email,
        mobile: action.payload.mobile,
        dob: action.payload.dob,
        photo: action.payload.photo,
      };
      if (action.payload.panNumber) {
        state.kyc.panNumber = action.payload.panNumber.trim();
      }
      if (action.payload.bankDetails && action.payload.bankDetails.bankName) {
        state.bankDetails.bankName = action.payload.bankDetails.bankName.trim();
        state.bankDetails.accountName =
          action.payload.bankDetails.accountName.trim();
        state.bankDetails.accountNumber =
          action.payload.bankDetails.accountNumber.trim();
        state.bankDetails.ifsc = action.payload.bankDetails.ifsc
          .toUpperCase()
          .trim();
      }
      if (action.payload.address) {
        state.address.city = action.payload.address.city.trim();
        state.address.line1 = action.payload.address.line1.trim();
        state.address.state = action.payload.address.state.trim();
        state.address.line2 = action.payload.address.line2.trim();
        state.address.pincode = action.payload.address.pincode;
      }
      state.isAddressCompleted = action.payload.isAddressCompleted;
      state.isKycDone = action.payload.isKycDone;
      state.isPanUploaded = action.payload.isPanUploaded;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.isMobileVerified = action.payload.isMobileVerified;
      state.isBankDetailsCompleted = action.payload.isBankDetailsCompleted;
      state.isBasicDetailsCompleted = action.payload.isBasicDetailsCompleted;
    },
    setPageLoader: (state: any, action: PayloadAction<boolean>) => {
      state.pageLoader = action.payload;
    },
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setAuth, setUserInfo, setPageLoader } = manager.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const getAuth = (state: RootState) => state.auth.isLoggedIn;
export const getUserAllInfo = (state: RootState) => state.auth;
export const getUserInfo = (state: RootState) => state.auth.userInfo;
export const getUserInfokyc = (state: RootState) => state.auth.kyc;
export const getIsAddressCompleted = (state: RootState) =>
  state.auth.isAddressCompleted;
export const getIsKycDone = (state: RootState) => state.auth.isKycDone;
export const getIsBasicDetailsCompleted = (state: RootState) =>
  state.auth.isBasicDetailsCompleted;
export const getIsPanUploaded = (state: RootState) => state.auth.isPanUploaded;
export const getIsEmailVerified = (state: RootState) =>
  state.auth.isEmailVerified;
export const getIsBankDetailsCompleted = (state: RootState) =>
  state.auth.isBankDetailsCompleted;
// exporting the reducer here, as we need to add this to the store
export default manager.reducer;
