import Layout from "./components/Layout";
import Home from "./routes/Home";
import Error from "./routes/Error";
import Store from "./routes/Store";
import Product from "./routes/Product";
import Bag from "./routes/Bag";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "store", element: <Store /> },
      { path: "store/:productId", element: <Product /> },
      { path: "shop/bag", element: <Bag /> },
    ],
  },
];

export default routes;
