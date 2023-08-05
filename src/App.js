import { Button } from "flowbite-react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}>
        <h1 className="">hi</h1>
        <Button>Click </Button>
      </RouterProvider>
    </div>
  );
}

export default App;
