import { FETCH_JOBS } from "../actions/types";

const initialState = {
  results: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_JOBS:
      return {
        results: [...payload],
      };
    default:
      return state;
  }
}
