import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
import ProgramsConfig from "../main/programs/ProgramsConfig";
import appsConfigs from "../main/apps/appsConfigs";
import ControlConfig from "../main/countries_control/ControlConfig";
import ProgramCategoryConfig from "../main/program_category/ProgramCategoryConfig";

const routeConfigs = [
  ...appsConfigs,
  ProgramsConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ControlConfig,
  ProgramCategoryConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: process.env.PUBLIC_URL + "/",
    element: <Navigate to={process.env.PUBLIC_URL + "/dashboard"} />,
    auth: settingsConfig.defaultAuth,
  },

  {
    path: process.env.PUBLIC_URL + "/loading",
    element: <FuseLoading />,
  },
  {
    path: process.env.PUBLIC_URL + "/404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];

export default routes;
