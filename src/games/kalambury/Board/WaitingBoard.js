import React, { useState, useEffect } from "react";
import { Image, Icon, Transition, Segment, Button, Form, Input } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useBoardGame } from "contexts/BoardGameContext";
import filterActions from "utils/user/filterActions";

const WaitingBoard = ({ guess, setGuess }) => {
  const {
    G,
    playerID,
    player: { canManageGame },
    moves: { SendText, StartGame },
  } = useBoardGame();
  const [inputLocked, setInputLocked] = useState(false);
  const [animateInput, setAnimateInput] = useState(true);
  const [lastMessageID, setLastMessageID] = useState(null);
  const { t } = useTranslation("kalambury");

  const lastUserMessage = filterActions(G.actions, playerID, "message")[0];
  const lastUserMessageID = lastUserMessage ? lastUserMessage.id : null;

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const sendGuess = () => {
    if (guess) SendText(guess);
    setGuess("");
  };

  useEffect(() => {
    if (lastMessageID === lastUserMessageID) {
      return;
    }
    setLastMessageID(lastUserMessageID);
    setInputLocked(true);
    setTimeout(() => setInputLocked(false), 250);
    setAnimateInput((animateInput) => !animateInput);
  }, [lastUserMessageID, lastMessageID]);

  return (
    <>
      <Form action="#" onSubmit={sendGuess}>
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
