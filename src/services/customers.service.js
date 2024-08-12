import { axiosInstanceBearer } from "./instances";

export const getAllCustomers = async (page) => {
    const response = await axiosInstanceBearer.get(`${page != 1 && page ? `/customers/?page=${page}` : "/customers/"}`);
    return response.data;
}

export const getAllCustomersTotal = async () => {
    const response = await axiosInstanceBearer.get("/customers/?pageSize=1000");
    return response.data;
}

export const getCustomerById = async (id) => {
    const response = await axiosInstanceBearer.get(`/customers/${id}`);
    return response.data;
}

export const createCustomer = async (customer) => {
    const response = await axiosInstanceBearer.post("/customers/", customer);
    return response.data;
}

export const updateCustomer = async (id, customer) => {
    const response = await axiosInstanceBearer.patch(`/customers/${id}`, customer);
    return response.data;
}

export const deleteCustomer = async (id) => {
    const response = await axiosInstanceBearer.delete(`/customers/${id}`);
    return response.data;
}