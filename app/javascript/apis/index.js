import axios from "axios";


const setAuthTokenHeader = (token) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Auth-Token": `${token}`,
  };
};

export default setAuthTokenHeader;
