import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { SearchComponent } from "../components/SearchComponent";
import { Select, SelectItem } from "@heroui/react";
import { useNavigate } from "react-router-dom";

// Simulación de autorización admin (cámbialo por tu lógica real)
const isAdmin = true;

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const NavBar: React.FC = () => {
  const navigate = useNavigate();

  // En práctica, el id debe ser dinámico (de un producto seleccionado)
  const productIdDemo = 1;

  const actions = [
    { label: "Agregar Producto", value: "agregar", path: "/product/create" },
    { label: "Editar Producto", value: "editar", path: `/product/edit/${productIdDemo}` },
    { label: "Eliminar Producto", value: "eliminar", path: `/product/delete/${productIdDemo}` },
  ];

  const handleSelect = (value: string) => {
    const action = actions.find(a => a.value === value);
    if (action) {
      navigate(action.path);
    }
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4" onClick={() => navigate("/app/dashboard")}>
          <AcmeLogo />
          <p className="hidden sm:flex font-bold text-inherit">
            Precios Justo Ya
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <p className="hidden sm:flex font-bold text-inherit">
            ¿Qué buscas hoy?
          </p>
        </NavbarContent>
      </NavbarContent>
      <NavbarContent as="div" className="items-center gap-4" justify="end">
        <SearchComponent />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="logout" color="danger" onClick={() => navigate("/login")}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        {isAdmin && (
          <Select
            className="max-w-xs"
            label="Acciones"
            placeholder="Selecciona acción"
            onChange={e => handleSelect(e.target.value)}
          >
            {actions.map(action => (
              <SelectItem key={action.value} value={action.value}>
                {action.label}
              </SelectItem>
            ))}
          </Select>
        )}
      </NavbarContent>
    </Navbar>
  );
};
