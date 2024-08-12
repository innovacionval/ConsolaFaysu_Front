import { axiosInstanceBearer, axiosInstanceFormData } from "./instances";


export const getAllSourceFiles = async (page) => {
    const response = await axiosInstanceBearer.get(`${page != 1 && page ? `/source/?page=${page}` : "/source/"}`);
    return response.data;
}

export const getSourceFileById = async (id) => {
    const response = await axiosInstanceBearer.get(`/source/${id}`);
    return response.data;
}

export const createSourceFile = async (sourceFile) => {
    const response = await axiosInstanceFormData.post("/source/", sourceFile);
    return response.data;
}

export const updateSourceFile = async (id, sourceFile) => {
    const response = await axiosInstanceBearer.patch(`/source/${id}`, sourceFile);
    return response.data;
}

export const deleteSourceFile = async (id) => {
    const response = await axiosInstanceBearer.delete(`/source/${id}`);
    return response.data;
}

