import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignUp, SignIn } from "@pages";
// import { Users } from "@main";
import Main from "../pages/main";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/main/*" element={<Main />}>
          {/* <Route path="users" element={<Users />} /> */}
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
