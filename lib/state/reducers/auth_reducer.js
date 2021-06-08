import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAILURE,
} from "../actions/types";

const initialState = {
  token: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: payload };
    case FACEBOOK_LOGIN_FAILURE:
      return { token: null };

    default:
      return state;
  }
}
