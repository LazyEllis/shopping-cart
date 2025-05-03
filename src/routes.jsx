import Layout from "./components/Layout";
import App from "./routes/App";
import Store from "./routes/Store";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "store", element: <Store /> },
    ],
  },
];

export default routes;
