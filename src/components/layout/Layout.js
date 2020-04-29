import React from "react";
import { Container } from "semantic-ui-react";
import UserMenu from "components/user/UserMenu";
import Footer from "./Footer";

const Layout = ({ hideUserMenu, children }) => (
  <Container style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    {!hideUserMenu && <UserMenu />}
    <main style={{ flex: "1 0 auto" }}>{children}</main>
    <Footer />
  </Container>
);

export default Layout;
