import { Outlet } from "react-router-dom";
import { SignIn } from "@pages";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;
