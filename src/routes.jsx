import Layout from "./components/Layout";
import App from "./routes/App";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <App /> }],
  },
];

export default routes;
