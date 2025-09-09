import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.15:3333",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});
