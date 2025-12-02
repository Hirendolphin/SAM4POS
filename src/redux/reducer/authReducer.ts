import { createReducer } from '@reduxjs/toolkit';
import { userForceLogout, userLogin, userLogout } from '../actions/authAction';
import { AuthStateType } from '../dataTypes';

const initialState: AuthStateType = {
  fetching: false,
  loggedIn: false,
  userLoginDetails: {},
  forceLogout: {
    forcelogout: false,
  },
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
    .addCase(userLogout, state => {
      state.fetching = false;
      state.loggedIn = false;
      state.userLoginDetails = {};
      state.forceLogout = {
        forcelogout: false,
      };
    });
});

export default authReducer;
