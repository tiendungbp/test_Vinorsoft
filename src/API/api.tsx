import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";
export const baseURL = "https://haitech.me/api/";
const http: AxiosInstance = axios.create();
http.interceptors.request.use((config: any) => {
    return {
        ...config,
        baseURL,
    };
});

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response?.status === 403) {
            toast.error("Bạn không có quyền truy cập");
        }
        if (error?.response?.status === 400) {
            toast.error(error.response?.data?.message);
        }
        if (error?.response?.status === 404) {
            toast.error(error.response?.data?.message);

        }
        if (error?.response?.status === 500) {
            toast.error(error.response?.data?.message);
        }
        if (error?.response?.status === 401) {
            toast.error(error.response?.data?.message);
        }
    }
);

export default http;