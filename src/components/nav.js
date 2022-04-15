import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../custom-hooks";

const loggedOutLinks = [
  {
    id: 1,
    name: "Home",
    to: "/home",
  },
  {
    id: 2,
    name: "Login",
    to: "/login",
  },
  {
    id: 3,
    name: "Register",
    to: "/register",
  },
  {
    id: 4,
    name: "Routines",
    to: "/routines",
  },
  {
    id: 5,
    name: "Activities",
    to: "/activities",
  },
];

const loggedInLinks = [
  {
    id: 1,
    name: "Home",
    to: "/home",
  },
  {
    id: 2,
    name: "Routines",
    to: "/routines",
  },
  {
    id: 3,
    name: "Activities",
    to: "/activities",
  },
  {
    id: 4,
    name: "Me",
    to: "/me",
  },
];

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const navLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;
  return (
    <nav>
      {navLinks.map(({ id, name, to }) => (
        <NavLink id={name} key={id} to={to}>
          {name}
        </NavLink>
      ))}
      {isLoggedIn && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
