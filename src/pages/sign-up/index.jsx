import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { auth } from "@service";
import { SignUpModal } from "@modal";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RegistrationImg from "../../assets/images/register.png";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  full_name: Yup.string().required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  phone_number: Yup.string().required("Required"),
});

const Index = () => {
  const notifySucces = () => toast.success("Wow so easy!");
  const notifyError = () => toast.error("Something went wrong");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    full_name: "",
    password: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });

    if (touched[name]) {
      try {
        validationSchema.validateSyncAt(name, { [name]: value });
        setErrors({ ...errors, [name]: undefined });
      } catch (err) {
        setErrors({ ...errors, [name]: err.message });
      }
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched({ ...touched, [name]: true });

    try {
      validationSchema.validateSyncAt(name, { [name]: value });
      setErrors({ ...errors, [name]: undefined });
    } catch (err) {
      setErrors({ ...errors, [name]: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(form, { abortEarly: false });
      setErrors({});
      const response = await auth.sign_up(form);
      if (response.status === 200) {
        setOpen(true);
        notifySucces();
      }
    } catch (err) {
      if (err.inner) {
        const formikErrors = err.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(formikErrors);
      } else {
        console.log(err);
        notifyError();
      }
    }
  };

  return (
    <>
      <SignUpModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        email={form.email}
      />
      <div className="w-full h-screen grid grid-cols-2 items-center gap-10 justify-center">
        <div className="h-full  w-full flex justify-center bg-[#36BAEC]">
          <img
            className="w-[400px] object-contain"
            src={RegistrationImg}
            alt=""
          />
        </div>
        <div className="w-[400px] mx-auto">
          <h1 className="text-center my-3 font-medium text-[36px]">
            Ro'yxatdan o'tish
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              label="kirish"
              id="email"
              name="email"
              value={form.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              label="to'liq ism"
              id="full_name"
              name="full_name"
              value={form.full_name}
              error={touched.full_name && Boolean(errors.full_name)}
              helperText={touched.full_name && errors.full_name}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              label="parol"
              id="password"
              name="password"
              value={form.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
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
            <TextField
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              label="telefon raqami"
              id="phone_number"
              name="phone_number"
              value={form.phone_number}
              error={touched.phone_number && Boolean(errors.phone_number)}
              helperText={touched.phone_number && errors.phone_number}
            />
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
