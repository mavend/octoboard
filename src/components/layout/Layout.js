import React from "react";
import UserMenu from "components/user/UserMenu";
import Footer from "./Footer";

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

export default Layout;
