import React, { useState, useEffect } from "react";
import { Button, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { auth } from "@service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

import LoginImg from "../../assets/images/logo.svg";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const Index = () => {
  const notifySuccess = () => toast.success("Wow so easy!");
  const notifyError = () => toast.error("Something went wrong");

  const navigate = useNavigate();
  const movSignUp = () => {
    navigate("sign-up");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = await validationSchema.validate(formValues, {
        abortEarly: false,
      });
      setFormErrors({});
      const response = await auth.sign_in(formValues);
      if (response.status === 200) {
        navigate("main");
        localStorage.setItem("access_token", response?.data?.access_token);
        notifySuccess();
      }
    } catch (error) {
      if (error.inner) {
        const formikErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setFormErrors(formikErrors);
      } else {
        console.log(error);
        notifyError();
      }
    }
  };

  return (
    <div className="w-full container h-screen grid grid-cols-2 justify-center items-center">
      <div className="bg-[#F7F7F7] h-full flex justify-center">
        <img
          className="w-full mx-10 max-w-[370px] object-contain"
          src={LoginImg}
          alt=""
        />
      </div>
      <div className="mx-auto sm:w-[400px] w-[300px] flex justify-center flex-col">
        <h1 className="text-start my-3 pb-3 font-medium text-[40px]">Kirish</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField
            sx={{ borderRadius: "10px" }}
            type="email"
            fullWidth
            label="kirish"
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formValues.email}
            error={touched.email && Boolean(formErrors.email)}
            helperText={touched.email && formErrors.email}
          />
          <TextField
            sx={{ borderRadius: "10px" }}
            type={showPassword ? "text" : "password"}
            fullWidth
            label="parol"
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={formValues.password}
            error={touched.password && Boolean(formErrors.password)}
            helperText={touched.password && formErrors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link >Parolni unutdingizmi?</Link>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#BC8E5B",
              "&:hover": {
                backgroundColor: "#A67845",
              },
            }}
            type="submit"
          >
            Login
          </Button>
          <div>
            <p
              className="cursor-pointer p-1 hover:underline"
              onClick={movSignUp}
            >
              Ro'yxatdan o'tish
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
