import React, { useState, useEffect } from "react";
import { Image, Icon, Transition, Segment, Button, Form, Input } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const WaitingBoard = ({
  canManageGame,
  setGuess,
  guess,
  previousUserMessages,
  moves: { StartGame, SendText },
}) => {
  const [inputLocked, setInputLocked] = useState(false);
  const [animateInput, setAnimateInput] = useState(true);
  const [lastMessage, setLastMessage] = useState();
  const { t } = useTranslation("kalambury");

  const handleChange = (e) => {
    setGuess(e.target.value);
  };
  const sendGuess = () => {
    if (guess) SendText(guess);
    setGuess("");
  };

  useEffect(() => {
    let message = previousUserMessages[0];
    if (!message) {
      return;
    }
    if (lastMessage && lastMessage.id === message.id) {
      return;
    }
    setLastMessage(message);
    setInputLocked(true);
    setTimeout(() => setInputLocked(false), 250);
    setAnimateInput((animateInput) => !animateInput);
  }, [previousUserMessages, lastMessage]);

  return (
    <>
      <Form onSubmit={sendGuess}>
        <Transition animation={"pulse"} duration={300} visible={animateInput}>
          <Form.Field>
            <Input
              fluid
              autoFocus
              readOnly={inputLocked}
              placeholder={t("board.wait.input.placeholder")}
              value={guess}
              onChange={handleChange}
              action={{
                content: t("board.wait.input.action"),
                icon: "chat",
                labelPosition: "right",
                color: "blue",
                type: "submit",
              }}
              style={{
                height: "41px",
              }}
            />
          </Form.Field>
        </Transition>
      </Form>
      <Segment
        style={{
          background: "transparent",
          widht: 800,
          height: 600,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {canManageGame ? (
          <Button icon labelPosition="right" color="green" onClick={() => StartGame()}>
            {t("board.wait.actions.start")}
            <Icon name="pencil" />
          </Button>
        ) : (
          <Image src="/images/hugo-waiting.png" style={{ width: 400, margin: "0 auto" }} />
        )}
      </Segment>
    </>
  );
};

export default WaitingBoard;
