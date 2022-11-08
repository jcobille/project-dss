import { getCookie } from "./cookie";
import axios from "axios";

export const axiosCall = async (
  url: string,
  method: string,
  data?: object | []
) => {
  let token = getCookie();
  let returnedData = [];
  let options = {
    method: method,
    url: `http://localhost:3000${url}`,
    data: data,
    headers: {},
    params: {},
  };
  if (method.toLowerCase() === "get" && data) {
    if (Object.keys(data).length > 0) {
      options.params = data;
    }
  }

  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  let request = await axios(options);
  returnedData = request.data;

  return returnedData;
};