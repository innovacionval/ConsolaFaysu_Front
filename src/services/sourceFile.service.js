import { axionsInstanceBearer } from "./instances";


export const getAllSourceFiles = async () => {
    const response = await axionsInstanceBearer.get("/source/?$expand=True");
    return response.data;
}

export const getSourceFileById = async (id) => {
    const response = await axionsInstanceBearer.get(`/source/${id}`);
    return response.data;
}

export const createSourceFile = async (sourceFile) => {
    const response = await axionsInstanceBearer.post("/source", sourceFile);
    return response.data;
}

export const updateSourceFile = async (id, sourceFile) => {
    const response = await axionsInstanceBearer.patch(`/source/${id}`, sourceFile);
    return response.data;
}

export const deleteSourceFile = async (id) => {
    const response = await axionsInstanceBearer.delete(`/source/${id}`);
    return response.data;
}

