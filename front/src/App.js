import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ROUTES } from "./router"
import { GlobalDataProvider } from "./content/GlobalContent"

const routes = createBrowserRouter(ROUTES)

function App() {
  return (
    <GlobalDataProvider>
      <RouterProvider router={routes} />
    </GlobalDataProvider>
  );
}

export default App;
