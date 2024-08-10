import { axiosInstanceBearer } from "./instances";


export const getAllCorporateImages = async () => {
    const response = await axiosInstanceBearer.get("/corporate-image");
    return response.data;
}

export const getCorporateImageById = async (id) => {
    const response = await axiosInstanceBearer.get(`/corporate-image/${id}`);
    return response.data;
}

export const createCorporateImage = async (corporateImage) => {
    const response = await axiosInstanceBearer.post("/corporate-image", corporateImage);
    return response.data;
}


export const updateCorporateImage = async (id, corporateImage) => {
    const response = await axiosInstanceBearer.patch(`/corporate-image/${id}`, corporateImage);
    return response.data;
}


export const deleteCorporateImage = async (id) => {
    const response = await axiosInstanceBearer.delete(`/corporate-image/${id}`);
    return response.data;
}
