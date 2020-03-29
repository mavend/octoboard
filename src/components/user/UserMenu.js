import React, {useContext, useState} from "react";
import {Sidebar, Image, Segment, Menu, Icon,} from "semantic-ui-react";
import {UserContext} from "../../contexts/UserContext";
import {avatarForName} from "../../games/kalambury/utils/avatar";

const UserMenu = ({children }) => {
  const { user, logout } = useContext(UserContext);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width='thin'
          style={{minHeight: "100hv"}}
        >
          <Menu.Item as={'div'}>
            <Icon name="user"/>
            {user.email}
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='exchange' />
            Change Password
          </Menu.Item>
          <Menu.Item as='a' onClick={logout}>
            <Icon name='log out' />
            Log Out
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment floated="right" onClick={() => {{ setVisible(!visible)}}}>
            <Image
              avatar
              bordered
              src={avatarForName(user.email)}
            />
            <span>{user.email}</span>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
    );
};

export default UserMenu;




