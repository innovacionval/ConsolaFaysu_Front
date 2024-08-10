import { axiosInstanceBearer } from "./instances";

export const getAllSenderEmails = async () => {
    const response = await axiosInstanceBearer.get("/sender-emails");
    return response.data;
}

export const getSenderEmailById = async (id) => {
    const response = await axiosInstanceBearer.get(`/sender-emails/${id}`);
    return response.data;
}

export const createSenderEmail = async (senderEmail) => {
    const response = await axiosInstanceBearer.post("/sender-emails", senderEmail);
    return response.data;
}

export const updateSenderEmail = async (id, senderEmail) => {
    const response = await axiosInstanceBearer.patch(`/sender-emails/${id}`, senderEmail);
    return response.data;
}

export const deleteSenderEmail = async (id) => {
    const response = await axiosInstanceBearer.delete(`/sender-emails/${id}`);
    return response.data;
}

