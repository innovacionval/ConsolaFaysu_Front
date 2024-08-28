import { axiosInstanceBearer } from "./instances";

export const getAllCampaigns = async (page) => {
    const response = await axiosInstanceBearer.get(`${page != 1 && page ? `/campaign/?page=${page}` : "/campaign/"}`);
    return response.data;
}

export const getCampaignById = async (id) => {
    const response = await axiosInstanceBearer.get(`/campaign/${id}`);
    return response.data;
}

export const createCampaign = async (campaign) => {
    const response = await axiosInstanceBearer.post("/campaign/", campaign);
    return response.data;
}

export const updateCampaign = async (id, campaign) => {
    const response = await axiosInstanceBearer.patch(`/campaign/${id}`, campaign);
    return response.data;
}

export const deleteCampaign = async (id) => {
    const response = await axiosInstanceBearer.delete(`/campaign/${id}`);
    return response.data;
}