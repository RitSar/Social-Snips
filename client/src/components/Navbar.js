import React, { useContext, useState } from "react";
import { Menu, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const navbar = user ? (
    <div>
      <Menu pointing secondary size="huge" color="teal">
        <Menu.Item name={user.username} active as={Link} to="/" />

        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={() => setConfirmOpen(true)} />
        </Menu.Menu>
      </Menu>

      <Confirm
        open={confirmOpen}
        cancelButton="Cancel"
        confirmButton="Confirm"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          logout();
          setConfirmOpen(false);
        }}
        content="Are you sure you want to logout?"
      />
    </div>
  ) : (
    <div>
      <Menu pointing secondary size="huge" color="teal">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );

  return navbar;
}
