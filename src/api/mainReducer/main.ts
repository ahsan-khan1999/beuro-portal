import auth from "../slices/authSlice/auth";
import globalSlice from '../slices/globalSlice/global';
// import userAccountSlice from "../slices/user/user-account-slice";

const reducer = {
  auth,
  global: globalSlice,
  // user: userAccountSlice
};
export default reducer;
