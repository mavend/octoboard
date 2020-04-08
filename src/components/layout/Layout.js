import React from "react";
import { bool } from "prop-types";
import UserMenu from "components/user/UserMenu";
import Footer from "./Footer";

const propTypes = {
  userMenu: bool,
};

const Layout = ({ userMenu, children }) => {
  const styles = {
    site: {
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
    },
    content: {
      flex: 1,
    },
  };

  const Wrapper = userMenu ? UserMenu : "div";

  return (
    <div style={styles.site}>
      <Wrapper style={styles.content}>{children}</Wrapper>
      <Footer />
    </div>
  );
};

Layout.propTypes = propTypes;

export default Layout;
