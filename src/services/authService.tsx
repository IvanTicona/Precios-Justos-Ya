import jsonServerInstance from "../api/jsonInstance";


export const Login = async (email: string, password: string) => {
    const response = await jsonServerInstance.get("/users", {
        params: { email, password }
    });
    console.log("Server response:", response.data); // Debug log
    return response.data.length > 0 ? response.data[0] : null;
};

export const SignUp = async (email: string, password: string, typeOfUser: string) => {
    const response = await jsonServerInstance.post("/users", {
        email,
        password,
        typeOfUser
    });
    return response.data;
}
