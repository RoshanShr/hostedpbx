import axios from "axios";

const clientApi = axios.create({
    baseURL: "http://localhost:5000"
});

export const getClient = async (loggedData) => {
    const response = await clientApi.get("/clients", {
        headers: {
            "Authorization": `Bearer ${loggedData.loggedUser.token}`
        }
    });
    return response.data;
}

export const addClient = async ({
    loggedData,
    clientData
}) => {
    await clientApi.post("/clients", clientData, {
        headers: {
            "Authorization": `Bearer ${loggedData.loggedUser.token}`
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

// export const deleteClient = async ({
//     id
// }) => {
//     return await clientApi.post(`/clients/${id}`, id);
// }

export default clientApi;