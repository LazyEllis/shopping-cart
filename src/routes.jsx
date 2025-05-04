import Layout from "./components/Layout";
import App from "./routes/App";
import Store from "./routes/Store";
import Product from "./routes/Product";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "store", element: <Store /> },
      { path: "store/:productId", element: <Product /> },
    ],
  },
];

export default routes;
