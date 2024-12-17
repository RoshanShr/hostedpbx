import axios from "axios";
import {
    useQuery

} from "react-query";

import {
    toast
} from 'react-toastify';


const apiUrl =
    import.meta.env.VITE_API_URL;

const clientApi = axios.create({
    baseURL: apiUrl
});

export const getClient = async (loggedData) => {
    const response = await clientApi.get("/clients", {
        headers: {
            "Authorization": `Bearer ${loggedData.loggedUser.token}`
        }
    });
    return response.data;
}

// React Query Hooks

export const useGetClients = (loggedData) => {
    return useQuery(["clients"], () => getClient(loggedData), {
        onError: (error) => {
            toast.error(`Failed to fetch clients: ${error.message}`);
        },
    });
};