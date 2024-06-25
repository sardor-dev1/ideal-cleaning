import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { auth } from "@service";
// import { SignUpModal } from "@modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginImg from "../../assets/images/login-img.png";

const Index = () => {
  const notifySucces = () => toast.success("Wow so easy!");
  const notifyError = () => toast.error("Something went error");

  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const movSignUp = () => {
    navigate("sign-up");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const response = await auth.sign_in(form);
      if (response.status === 200) {
        navigate("main");
        localStorage.setItem("access_token", response?.data?.access_token);
        notifySucces();
      }
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

  return (
    <>
      <div className="w-full container h-screen grid grid-cols-2 gap-10 justify-center  items-center">
        <div className="bg-[#F7F7F7] h-full flex justify-center">
          <img
            className="w-full max-w-[600px] object-contain"
            src={LoginImg}
            alt=""
          />
        </div>
        <div className="w-[300px] lg:w-[400] flex justify-center flex-col sm:w-[450px]">
          <h1 className="text-start my-3 font-medium text-[40px]">Login</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              type="email"
              onChange={handleChange}
              fullWidth
              label="Email"
              id="email"
              name="email"
            />
            <TextField
              type="password"
              onChange={handleChange}
              fullWidth
              label="Password"
              id="password"
              name="password"
            />
            <div className="w-20">
              <p
                className="text-blue-600 cursor-pointer p-1 hover:underline"
                onClick={movSignUp}
              >
                Register
              </p>
            </div>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
