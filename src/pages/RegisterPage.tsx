import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { SignUp } from "../services/authService";
import { useState } from "react";

const SignUpSchema = yup.object({
    email:yup
        .string()
        .email("The email must be a valid email address")
        .required("Email is required"),
    password:yup 
        .string()
        .min(8, "The password must be at least 8 characters long")
        .required("The password is required"),
});

export const typeOfUser = [
    {key: "Vendedor", label: "Vendedor"},
    {key: "Consumidor", label: "Consumidor"},
];



function RegisterPage() {
    const [error, setError] = useState(""); 
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            email: "",
            password: "",
            typeOfUser: "",
        },
        validationSchema: SignUpSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setError("");
                await SignUp(values.email, values.password, values.typeOfUser); 
                navigate("/login", { replace: true }); 
            } catch (error) {
                setError(
                    error && typeof error === "object" && "message" in error
                        ? (error as { message: string }).message
                        : "Something went wrong. Please try again."
                );
            } finally {
                setSubmitting(false);
            }
            },
        });

    return (
        <div className="flex flex-row items-center h-screen w-screen ">
            <Form
                className="flex flex-col items-center justify-center sm:max-w-sm md:max-w-md lg:max-w-lg w-full mx-auto gap-4 h-1/2 p-6 rounded-lg shadow-lg"
                onSubmit={formik.handleSubmit}
            >
                <h1 className="text-2xl font-bold mb-4">Sign up</h1>
                <Input 
                    isRequired
                    errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                    label="Email" 
                    placeholder="Enter your email" 
                    type="email"
                    name="email"
                    id="input-email-textfield-signup"
                    autoFocus
                    fullWidth
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <Input
                    isRequired
                    errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                    label="Password" 
                    placeholder="Enter your password"
                    type="password"
                    name="password"
                    id="input-password-textfield"
                    autoComplete="current-password"
                    fullWidth
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />

                <Select
                    isRequired
                    className="max-w-xs self-start"
                    label="Cual es tu tipo de usuario?"
                    placeholder="Seleccione el tipo de usuario"
                    >
                    {typeOfUser.map((typeOfUser) => (
                        <SelectItem key={typeOfUser.key}>{typeOfUser.label}</SelectItem>
                    ))}
                </Select>

                <Button
                    type="submit"
                    fullWidth
                >
                Sign up
                </Button>
            </Form>
            </div>
    );  
}

export default RegisterPage;