import React, { useContext, useState } from "react";
import { Sidebar, Image, Segment, Menu, Icon } from "semantic-ui-react";
import { UserContext } from "contexts/UserContext";
import { avatarForName } from "games/kalambury/utils/avatar";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

const UserMenu = ({ style, children }) => {
  const { user, logout, getNickName } = useContext(UserContext);
  const { data: nickname } = useQuery(["user-nickname", user.uid], (key, id) => getNickName(id));
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
            {nickname}
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="exchange" />
            {t("user.change_password")}
          </Menu.Item>
          <Menu.Item as="a" onClick={logout}>
            <Icon name="log out" />
            {t("user.logout")}
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment floated="right" onClick={() => setVisible(!visible)}>
            <Image avatar bordered src={avatarForName(user.uid)} />
            <span>{nickname}</span>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

export default UserMenu;
