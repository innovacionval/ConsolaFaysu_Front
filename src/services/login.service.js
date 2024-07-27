import { axionsInstanceBearer } from "./instances";

export const login = async (username, password) => {
    const response = await axionsInstanceBearer.post("/login", {
      username,
      password,
    });
    return response.data;
}

export const refreshToken = async () => {
    const response = await axionsInstanceBearer.post("/refresh");
    return response.data;
}

export const logout = async (refreshToken) => {
    const response = await axionsInstanceBearer.post("/logout", {
      refreshToken,
    });
    return response.data;
}