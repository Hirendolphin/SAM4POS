import { createReducer } from '@reduxjs/toolkit';
import {
  forceupdate,
  maintenanceMode,
  userForceLogout,
  userLogin,
  userLogout,
} from '../actions/authAction';
import { AuthStateType } from '../dataTypes';

const initialState: AuthStateType = {
  fetching: false,
  loggedIn: false,
  userLoginDetails: {},
  forceLogout: {
    forcelogout: false,
  },
  forceUpdate: false,
  maintenanceMode: false,
};

const authReducer = createReducer(initialState, builder => {
  builder
    .addCase(userLogin.pending, state => {
      state.fetching = true;
    })
    .addCase(userLogin.fulfilled, (state, action) => {
      if (action?.payload.status == true) {
        state.loggedIn = true;
        state.userLoginDetails = action?.payload;
      } else if (action?.payload.status == false) {
        state.loggedIn = false;
        state.userLoginDetails = action?.payload;
      }
      state.fetching = false;
    })
    .addCase(userLogin.rejected, state => {
      state.fetching = false;
    })
    .addCase(userForceLogout, (state, action) => {
      if (action?.payload?.forcelogout) {
        state.forceLogout = action.payload;
      }
    })
    .addCase(forceupdate, (state, action) => {
      // if (action?.payload) {
      state.forceUpdate = action.payload;
      // }
    })
    .addCase(maintenanceMode, (state, action) => {
      // if (action?.payload) {
      state.maintenanceMode = action.payload;
      // }
    })
    .addCase(userLogout, state => {
      state.fetching = false;
      state.loggedIn = false;
      state.userLoginDetails = {};
      state.forceLogout = {
        forcelogout: false,
      };
      state.forceUpdate = false;
      state.maintenanceMode = false;
    });
});

export default authReducer;
