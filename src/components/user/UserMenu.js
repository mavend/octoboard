import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sidebar, Image, Segment, Menu, Icon } from "semantic-ui-react";

import AuthProvider from "services/Auth";
import { useUser } from "contexts/UserContext";
import { routes } from "config/routes";

const UserMenu = ({ style, children }) => {
  const { logout } = AuthProvider;
  const { displayName, photoURL, email, isAnonymous } = useUser();

  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Sidebar.Pushable style={style}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width="thin"
          style={{ width: "180px" }}
        >
          <Menu.Item as={"div"}>
            <Icon name="user" />
            {displayName}
          </Menu.Item>
          {email && <Menu.Item as={"div"}>{email}</Menu.Item>}
          {!isAnonymous && (
            <Menu.Item as={Link} to={routes.change_password()}>
              <Icon name="exchange" />
              {t("user.change_password")}
            </Menu.Item>
          )}
          <Menu.Item as="a" onClick={logout}>
            <Icon name="log out" />
            {t("user.logout")}
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment floated="right" onClick={() => setVisible(!visible)}>
            <Image avatar bordered src={photoURL} />
            <span>{displayName}</span>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

export default UserMenu;
