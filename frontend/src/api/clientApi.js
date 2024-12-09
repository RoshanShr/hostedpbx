import axios from "axios";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "react-query";

import {
    toast
} from 'react-toastify';

const notify = (type, msg) => toast[type](msg);

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


export const addClient = async (
    data
) => {
    await clientApi.post("/clients", data.clientData, {
        headers: {
            "Authorization": `Bearer ${data.loggedData.loggedUser.token}`
        }
    });

}

export const updateClient = async (client) => {
    return await clientApi.post(`/clients/${client.id}`, client);
}

export const deleteClient = async ({
    loggedData,
    id
}) => {
    try {
        const response = await clientApi.delete("/clients", {
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`
            },
            data: {
                id: id
            }
        });

        return response;

    } catch (error) {
        return error;
        // if (error.response) {
        //     // Log the status code and additional error details
        //     console.error(`Error Status Code: ${error.response.status}`);
        //     console.error(`Error Response Data:`, error.response.data);
        // } else {
        //     // General errors without a response (e.g., network issues)
        //     console.error("Error:", error.message);
        // }

        // throw error; // Re-throw the error to handle it where the function is called
    }

}

// React Query Hooks

export const useGetClients = (loggedData) => {
    return useQuery(["clients"], () => getClient(loggedData), {
        onError: (error) => {
            toast.error(`Failed to fetch clients: ${error.message}`);
        },
    });
};

export const useAddClient = (loggedData) => {
    const queryClient = useQueryClient();
    return useMutation((clientData) => addClient({
        loggedData,
        clientData
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries("clients");
            notify("success", "Client added successfully")
        },
        onError: (error) => {
            notify("error", `Error while adding client:${error.message}`)
        },
    });
};

export const useDeleteClient = (loggedData) => {
    const queryClient = useQueryClient();
    return useMutation((id) => deleteClient({
        loggedData,
        id
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries("clients");
            notify("success", "Client deleted successfully")
        },
        onError: (error) => {
            notify("error", `Error while deleting client:${error.message}`)
        },
    });
}
export default clientApi;