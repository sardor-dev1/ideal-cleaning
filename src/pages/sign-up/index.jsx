import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { auth } from "@service";
import { SignUpModal } from "@modal";

import RegistrationImg from "../../assets/images/register.png";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const notifySucces = () => toast.success("Wow so easy!");
  const notifyError = () => toast.error("Something went error");

  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await auth.sign_up(form);
      if (response.status === 200) {
        setOpen(true);
        notifySucces();
      }
    } catch (error) {
      console.log(error);
      notifyError();
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
        <div className="h-full w-full flex justify-center bg-[#36BAEC]">
          <img className="w-[400px] object-contain" src={RegistrationImg} alt="" />
        </div>
        <div className="w-[500px]">
          <h1 className="text-center my-3 font-medium text-[40px]">
            Tizimga kirish
          </h1>

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
              type="text"
              onChange={handleChange}
              fullWidth
              label="Full Name"
              id="full_name"
              name="full_name"
            />
            <TextField
              type="password"
              onChange={handleChange}
              fullWidth
              label="Password"
              id="password"
              name="password"
            />
            <TextField
              type="text"
              onChange={handleChange}
              fullWidth
              label="Phone Number"
              id="phone_number"
              name="phone_number"
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
