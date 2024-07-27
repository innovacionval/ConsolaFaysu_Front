import { axionsInstanceBearer } from "./instances";

export const getAllUsers = async () => {
    const response = await axionsInstanceBearer.get("/users");
    return response.data;
}

export const getUserById = async (id) => {
    const response = await axionsInstanceBearer.get(`/users/${id}`);
    return response.data;
}

export const createUser = async (user) => {
    const response = await axionsInstanceBearer.post("/users", user);
    return response.data;
}

export const updateUser = async (id, user) => {
    const response = await axionsInstanceBearer.patch(`/users/${id}`, user);
    return response.data;
}

export const deleteUser = async (id) => {
    const response = await axionsInstanceBearer.delete(`/users/${id}`);
    return response.data;
}

export const resetPassword = async (credentials) => {
    const response = await axionsInstanceBearer.post("/users/password", credentials);
    return response.data;
}

/* export const userActivation = async (token) => {
    const response = await axionsInstanceBearer.post(`/users/activation/${token}`);
    return response.data;
} */
