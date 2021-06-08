import { LIKE_JOB, CLEAR_LIKED_JOBS } from "../actions/types";
import _ from "lodash";

const filterJobs = (likedJobs, newJob) => {
  if (likedJobs.length === 0) return [newJob];
  return likedJobs.some((job) => job["jobkey"] == newJob["jobkey"]) === false
    ? [...likedJobs, newJob]
    : likedJobs;
};

export default function (state = [], { type, payload }) {
  switch (type) {
    case LIKE_JOB:
      return filterJobs(state, payload);
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
}
