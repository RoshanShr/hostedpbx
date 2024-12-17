import axios from "axios";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "react-query";


const apiUrl =
    import.meta.env.VITE_API_URL;

const clientApi = axios.create({
    baseURL: apiUrl
});

export const getReports = async (loggedData) => {
    const response = await clientApi.get("/reports", {
        headers: {
            "Authorization": `Bearer ${loggedData.loggedUser.token}`
        }
    });
    return response.data;
}


export const useGetReports = (loggedData) => {
    return useQuery(["reports"], () => getReports(loggedData), {
        onError: (error) => {
        },
    });
}