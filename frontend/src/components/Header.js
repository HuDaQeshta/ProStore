import React, { useState } from "react";
import logo from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Route, Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {
  CART_CLEAR_SHIPPING_ADDRESS,
  CART_CLEAR_PAYMENT_METHOD,
} from "../constants/cartConstants";
import SearchBox from "./SearchBox";
import { clearCart } from "../actions/cartActions";
const Header = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [isShown, setIsShown] = useState(false);
  const [xPosition, setXPosition] = useState(-250);
  const logoutHandler = () => {
    dispatch(clearCart());
    dispatch({ type: CART_CLEAR_SHIPPING_ADDRESS });
    dispatch({ type: CART_CLEAR_PAYMENT_METHOD });
    dispatch(logout());
    history.push("/");
  };

  const toggleMenu = () => {
    if (xPosition < 0) {
      setXPosition(0);
    } else {
      setXPosition(-250);
    }
  };
  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="text-uppercase"
        collapseOnSelect
      >
        {isShown && (
          <div
            className="side-bar bg-secondary"
            style={{
              transform: `translatex(${xPosition}px)`,
              width: "250px",
              minHeight: "100vh",
            }}
          >
            <h3 className="text-uppercase text-white pl-2">Categories</h3>
            <>
              <Link
                to="/section/electronics"
                className="nav-link py-3 bold text-uppercase text-white"
              >
                <i className="fas mr-2 fa-desktop"></i> Electronics
              </Link>
              <Link
                to="/section/women-fashion"
                className="nav-link py-3 bold text-uppercase text-white"
              >
                <i className="fas mr-2 fa-crown"></i> Women Fashion
              </Link>
              <Link
                to="/section/men-fashion"
                className="nav-link py-3 bold text-uppercase text-white"
              >
                <i className="fab mr-2 fa-black-tie"></i>Men Fashion
              </Link>
              <Link
                to="/section/books"
                className="nav-link py-3 bold text-uppercase text-white"
              >
                <i className="fas mr-2 fa-book"></i>Books
              </Link>
              <Link
                to="/section/school-things"
                className="nav-link py-3 bold text-uppercase text-white"
              >
                <i className="fas mr-2 fa-school"></i> School things
              </Link>
            </>
          </div>
        )}
        <Container>
          <Navbar.Brand className="mr-5">
            {/*Icons made by <a href="https://www.flaticon.com/authors/iconixar" title="iconixar">iconixar</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
            <img
              onMouseEnter={() => setIsShown(true)}
              onClick={() => {
                toggleMenu();
              }}
              style={{ cursor: "pointer" }}
              src={logo}
              className="mr-2"
              alt="online-shopping"
            />
            <Link className="navbar-brand" to="/">
              ProStore
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-sign-in-alt"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  {"|"}
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-user-plus"></i> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userInfo && userInfo.role === "admin" && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
