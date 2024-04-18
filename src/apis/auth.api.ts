import axios from "axios";
import service from "./service";
import { SESSION } from "@/common/contants/auth.constant";
import { setCookie } from "nookies";

const authenticateEnpoint = "/api/authenticate";
const appJwtEnpoint = `/${process.env.NEXT_PUBLIC_APP_API_MSCSM}/api/authorization/gen-app-jwt`;

export type payloadLogin = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export type payloadAppJwt = {
  appCode: string;
};

export type loginResponseType = {
  id_token: string;
};

// export const postLogin = async (payload: payloadLogin) => {
//   const response = await service({
//     url: authenticateEnpoint,
//     method: "post",
//     data: payload,
//   });
//   return response;
// };

// export const postAppJwt = async (payload: payloadAppJwt, token: string) => {
//   const response = await service({
//     url: appJwtEnpoint,
//     method: "post",
//     data: payload,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response;
// };

export const loginCrm = async (payload: payloadLogin) => {
  // v1
  // const response = await axios({
  //   url: "/api/login-crm",
  //   method: "post",
  //   data: payload,
  // });

  // v2
  const response = await axios({
    url: "/api/login-crm-v2",
    method: "post",
    data: {
      form: payload,
      metadata: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
      },
    },
  });
  return response;
};

export const logoutCrm = async () => {
  // v1
  // const response = await axios({
  //   url: "/api/logout-crm",
  //   method: "get",
  // });
  // return response;

  // v2
  const response = await axios({
    url: "/api/logout-crm-v2",
    method: "get",
  });
  return response;
};

export const refeshSessionCRM = async () => {
  const response = await axios({
    url: "/api/refesh-session",
    method: "get",
  });
  if (response.status === 200) {
    setCookie(null, SESSION, response.data.token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
};

// export const setSession = async (token: string) => {
//   const response = await axios({
//     url: "/api/set-session",
//     method: "post",
//     data: {
//       session: token,
//     },
//   });

//   return response;
// };

// export const clearSession = async () => {
//   const response = await axios({
//     url: "/api/clear-session",
//     method: "delete",
//   });

//   return response;
// };

export const getProfile = async () => {
  const endPoint = `/services/msplogistic/my/profile`;
  const response = await service({
    url: endPoint,
    method: "get",
  });
  return response;
};
