import React, {useContext, useState} from "react";
import {Modal, Form, Image, Header, Button} from "semantic-ui-react";
import {UserContext} from "./contexts/UserContext";

const LoginPage = ({ open }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(UserContext);

  const handleLogin = async () => {
      try{
          await login(email, password)
      } catch (e) {
          console.log(e);
      }
  };

  return (
    <Modal open={open}>
      <Modal.Header>Login</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src="/images/game-hugo.png" />
        <Modal.Description>
          <Header>Login with your name</Header>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Input
                        autoFocus
                        type="email"
                        maxLength="24"
                        placeholder='Email'
                        name='Email'
                        value={email}
                        onChange={(_, {value}) => setEmail(value)}
                    />
                    <Form.Input
                        placeholder='Password'
                        type="password"
                        name='Password'
                        value={password}
                        onChange={(_, {value}) => setPassword(value)}
                    />
                    <Form.Button content='Login' />
                </Form.Group>
            </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default LoginPage;
