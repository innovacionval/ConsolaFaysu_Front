import { axiosInstanceBearer } from "./instances";

export const getAllUsers = async () => {
    const response = await axiosInstanceBearer.get("/users");
    return response.data;
}

export const getUserById = async (id) => {
    const response = await axiosInstanceBearer.get(`/users/${id}`);
    return response.data;
}

export const createUser = async (user) => {
    const response = await axiosInstanceBearer.post("/users/", user);
    return response.data;
}

export const updateUser = async (id, user) => {
    const response = await axiosInstanceBearer.patch(`/users/${id}`, user);
    return response.data;
}

export const deleteUser = async (id) => {
    const response = await axiosInstanceBearer.delete(`/users/${id}`);
    return response.data;
}

export const resetPassword = async (credentials) => {
    const response = await axiosInstanceBearer.post("/users/password", credentials);
    return response.data;
}

/* export const userActivation = async (token) => {
    const response = await axiosInstanceBearer.post(`/users/activation/${token}`);
    return response.data;
} */
