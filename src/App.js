import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ToDo from "./components/todo/ToDo";
import Test from "./components/Test";


const router = createBrowserRouter([
  {
    path: "/",
    element: <ToDo />,
  },

  {
    path: "/test",
    element: <Test />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
