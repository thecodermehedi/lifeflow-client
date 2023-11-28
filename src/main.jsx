import ReactDOM from "react-dom/client";
import {HelmetProvider} from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";
import {RouterProvider} from "react-router-dom";
import router from "./routes";
import "./index.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </HelmetProvider>
);
