// import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import { useRoutes } from "./routes";

export default function App() {
  const { routes } = useRoutes();
  return (
    <div>
      <Routes>
        {routes.map(({ path, element, children }) => (
          <Route key={path} path={path} element={element}>
            {children?.map((child) => (
              <Route
                key={child.path}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </div>
  );
}
