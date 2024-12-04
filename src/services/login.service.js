import { axiosInstanceBearer } from "./instances";

export const login = async (username, password) => {
    const response = await axiosInstanceBearer.post("/login", {
      username,
      password,
    },{
      skipAuthRefresh: true
    });
    return response.data;
}

/* export const refreshToken = async () => {
    const response = await axiosInstanceBearer.post("/refresh");
    return response.data;
} */

export const logout = async (refreshToken) => {
    const response = await axiosInstanceBearer.post("/logout", {
      refreshToken,
    });
    return response.data;
}