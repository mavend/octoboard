import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import UserMenu from "components/user/UserMenu";
import Footer from "./Footer";
import CookiesConsent from "./CookiesConsent";

const propTypes = {
  hideUserMenu: PropTypes.bool,
};

const Layout = ({ hideUserMenu, children }) => (
  <Container style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    {!hideUserMenu && <UserMenu />}
    <main style={{ flex: "1 0 auto" }}>{children}</main>
    <Footer />
    <CookiesConsent />
  </Container>
);
Layout.propTypes = propTypes;

export default Layout;
