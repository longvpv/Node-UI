import { responsiveFontSizes } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie"
const httpClient = axios.create({
  // baseURL: "https://longvpv.info",
  baseURL: "http://localhost:3001",
});

httpClient.interceptors.request.use(
  function (config) {
    if (typeof document !== "undefined") {
      // const auToken = jsCookie.get(authenticateSettings.tokenName);
      // if (auToken)
      //   config.headers.common["Authorization"] = 'Bearer ' + jsCookie.get(
      //     authenticateSettings.tokenName
      //   );
    }
    return config;
  },
  function (error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    if (response.data.jwt) {
      Cookies.set('jwt', response.data.jwt, { expires: 3 } )
      delete response.data.jwt
      return response.data;
    } else
    return response.data;
  },
  (error) => {
    if (error.response && error.response.data) {
      const { data } = error.response;
      return data;
    }

    return Promise.reject(error);
  }
);

export default httpClient;