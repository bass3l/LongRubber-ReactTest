import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import restaurantReducer from "../features/restaurant/restaurantSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    restaurant: restaurantReducer,
  },
});
