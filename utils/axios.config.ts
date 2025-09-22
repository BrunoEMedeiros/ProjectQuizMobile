import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "http://10.132.3.12:3000",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});
