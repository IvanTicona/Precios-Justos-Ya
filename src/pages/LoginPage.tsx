import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Login } from "../services/authService"; 
import { setStorage } from "../helpers/localStorage";
import { Button, Checkbox, Form, Input, Link } from "@heroui/react";

const loginSchema = yup.object({
    email:yup
        .string()
        .email("The email must be a valid email address")
        .required("Email is required"),
    password:yup 
        .string()
        .min(8, "The password must be at least 8 characters long")
        .required("The password is required"),
});




function LoginPace() {

    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const formik = useFormik({
        initialValues:{
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            const responseLogin = await Login(values.email, values.password);
            if(!responseLogin){
                setLoginError(true);
                formik.resetForm();
                return;
            }
            setStorage("token", responseLogin.token);
            setStorage("user", responseLogin.user);
            navigate("/app/dashboard",{
                replace:true,
            });
        },
    });

    return (
        <div className="flex flex-row items-center h-screen w-screen ">
            <Form
                className="flex flex-col items-center justify-center sm:max-w-sm md:max-w-md lg:max-w-lg w-full mx-auto gap-4 h-1/2 p-6 rounded-lg shadow-lg"
                onSubmit={formik.handleSubmit}
            >
                <h1 className="text-2xl font-bold mb-4">Sign in</h1>
                <Input 
                    isRequired
                    errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                    label="Email" 
                    placeholder="Enter your email" 
                    type="email"
                    name="email"
                    id="input-email-textfield"
                    autoComplete="email"
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

                <Link
                    type="button"
                    href={"/"}
                    >
                    Forgot your password?
                </Link>

                <Checkbox defaultSelected size="lg">
                        Remember me
                </Checkbox>

                <Button
                    type="submit"
                    fullWidth
                >
                Sign in 
                </Button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
                    <span>Don't have an account?</span>
                    <Link href="Register">Sign up</Link>
                </div>
            </Form>
            </div>
    );  
}

export default LoginPace;
