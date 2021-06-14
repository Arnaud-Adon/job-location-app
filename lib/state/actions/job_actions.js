import axios from "axios";
import { CLEAR_LIKED_JOBS, FETCH_JOBS, LIKE_JOB } from "./types";
// import reverseGeoCode from "latlng-to-zip";
import qs from "qs";
import INDEED_JOB_DATA from "../../mocks/indeedJobData";

const GITHUB_JOB_ROOT_URL = "https://jobs.github.com/positions.json?";

const GITHUB_JOB_QUERY_PARAMS = {
  description: "python",
  full_time: true,
};

const buildJobsUrl = ({ latitude, longitude }) => {
  const query = qs.stringify({
    ...GITHUB_JOB_QUERY_PARAMS,
    lat: latitude,
    long: longitude,
  });
  return `${GITHUB_JOB_ROOT_URL}${query}`;
};

export const fetchJobs =
  (location, type = "github", callback) =>
  async (dispatch) => {
    if (type === "indeed") {
      const { results } = INDEED_JOB_DATA;
      dispatch({ type: FETCH_JOBS, payload: results });
      callback();
    } else {
      try {
        const url = buildJobsUrl(location);
        const { data } = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data });
        callback();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

export const likeJob = (job) => ({
  type: LIKE_JOB,
  payload: job,
});

export const clearLikedJobs = () => ({
  type: CLEAR_LIKED_JOBS,
});
