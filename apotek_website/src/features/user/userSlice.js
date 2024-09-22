import { createSlice } from "@reduxjs/toolkit";
import { sortData } from "../../utils/sortData";
import endPointAPI from "../../config";
import { toast } from "sonner";

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      const user = action.payload;
      state.userData = user;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;

// selector
export const userLogin = (payload, navigate) => async (dispatch) => {
  try {
    const { data } = await endPointAPI.post("/login", payload);
    toast.success(`Login Success`);
    dispatch(setUserData(data.data));
    navigate("/");
  } catch (error) {
    toast.error(`Invalid Email or Password`);
    // console.log(error);
  }
};

export const userRegister = (payload, navigate) => async (dispatch) => {
  try {
    const { data } = await endPointAPI.post("/register", payload);
    toast.success(`Register Succes, Please Login`);
    navigate("/login");
  } catch (error) {
    toast.error(`Invalid Email or Password`);
    // console.log(error);
  }
};
