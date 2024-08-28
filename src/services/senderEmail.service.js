import { axiosInstanceBearer, axiosInstanceFormData } from "./instances";

export const getAllSenderEmails = async (page) => {
    const response = await axiosInstanceBearer.get(`${page != 1 && page ? `/sender-emails/?page=${page}` : "/sender-emails/"}`);
    return response.data;
}

export const getSenderEmailById = async (id) => {
    const response = await axiosInstanceBearer.get(`/sender-emails/${id}`);
    return response.data;
}

export const createSenderEmail = async (senderEmail) => {
    const response = await axiosInstanceFormData.post("/sender-emails/", senderEmail);
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

