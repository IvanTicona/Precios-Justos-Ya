// src/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Layout = () => {
  return (
    <div>
      <NavBar />
        <div>
          <Outlet />
        </div>
    </div>
  );
};
