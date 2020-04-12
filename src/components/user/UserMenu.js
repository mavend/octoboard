import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown, Image, Menu } from "semantic-ui-react";

import AuthProvider from "services/Auth";
import { useUser } from "contexts/UserContext";
import { routes } from "config/routes";

const UserMenu = () => {
  const { logout } = AuthProvider;
  const user = useUser();
  const { t } = useTranslation();

  if (!user) return null;

  const { displayName, photoURL, email, isAnonymous } = user;

  return (
    <Menu secondary as="nav">
      <Menu.Menu position="right">
        <Menu.Item>
          <Dropdown
            pointing="top right"
            trigger={
              <>
                <Image avatar style={{ marginRight: "10px" }} src={photoURL} />
                {displayName}
              </>
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item icon="user" text={email || t("user.guest")} />
              <Dropdown.Divider />
              {!isAnonymous && (
                <Dropdown.Item
                  icon="exchange"
                  as={Link}
                  to={routes.change_password()}
                  text={t("user.change_password")}
                />
              )}
              <Dropdown.Item as="a" onClick={logout} icon="log out" text={t("user.logout")} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default UserMenu;
