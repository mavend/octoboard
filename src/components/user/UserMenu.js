import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown, Menu } from "semantic-ui-react";
import Avatar from "components/user/Avatar";
import AuthProvider from "services/Auth";
import { useUser } from "contexts/UserContext";
import { routes } from "config/routes";

const UserDropdown = React.memo(({ displayName, uid, email, isAnonymous, onLogout }) => {
  const { t } = useTranslation();
  return (
    <Dropdown
      pointing="top right"
      trigger={
        <>
          <Avatar style={{ marginRight: "10px" }} small uid={uid} />
          {displayName}
        </>
      }
    >
      <Dropdown.Menu>
        <Dropdown.Item icon="user" disabled text={email || t("user.guest")} />
        <Dropdown.Divider />
        {!isAnonymous && (
          <Dropdown.Item
            icon="exchange"
            as={Link}
            to={routes.change_password()}
            text={t("user.change_password")}
          />
        )}
        <Dropdown.Item as="a" onClick={onLogout} icon="log out" text={t("user.logout")} />
      </Dropdown.Menu>
    </Dropdown>
  );
});
UserDropdown.displayName = "UserDropdown";
UserDropdown.propTypes = {
  displayName: PropTypes.string,
  uid: PropTypes.string,
  email: PropTypes.string,
  isAnonymous: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
};

const UserMenu = ({ className }) => {
  const user = useUser();
  if (!user) return null;

  const { displayName, uid, email, isAnonymous } = user;

  return (
    <Menu secondary as="nav" className={className}>
      <Menu.Menu position="right">
        <Menu.Item>
          <UserDropdown
            displayName={displayName}
            uid={uid}
            email={email}
            isAnonymous={isAnonymous}
            onLogout={AuthProvider.logout}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
UserMenu.propTypes = {
  className: PropTypes.string,
};

export default UserMenu;
