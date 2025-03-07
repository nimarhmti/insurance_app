import { BrowserRouter } from "react-router-dom";
import { ReactNode } from "react";

export default function RouterProvider({ children }: { children: ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
