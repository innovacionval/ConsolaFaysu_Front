import { axionsInstanceBearer } from "./instances";

export const getAllSenderEmails = async () => {
    const response = await axionsInstanceBearer.get("/sender-emails");
    return response.data;
}

export const getSenderEmailById = async (id) => {
    const response = await axionsInstanceBearer.get(`/sender-emails/${id}`);
    return response.data;
}

export const createSenderEmail = async (senderEmail) => {
    const response = await axionsInstanceBearer.post("/sender-emails", senderEmail);
    return response.data;
}

export const updateSenderEmail = async (id, senderEmail) => {
    const response = await axionsInstanceBearer.patch(`/sender-emails/${id}`, senderEmail);
    return response.data;
}

export const deleteSenderEmail = async (id) => {
    const response = await axionsInstanceBearer.delete(`/sender-emails/${id}`);
    return response.data;
}

