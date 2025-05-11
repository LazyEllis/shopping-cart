import Layout from "./components/Layout";
import App from "./routes/App";
import Store from "./routes/Store";
import Product from "./routes/Product";
import Bag from "./routes/Bag";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "store", element: <Store /> },
      { path: "store/:productId", element: <Product /> },
      { path: "shop/bag", element: <Bag /> },
    ],
  },
];

export default routes;
