import React, { useState, useEffect } from "react";
import { Transition, Form, Input } from "semantic-ui-react";
import Drawing from "../Drawing";
import { useTranslation } from "react-i18next";
import { useBoardGame } from "contexts/BoardGameContext";

const GuessingBoard = ({
  guess,
  setGuess,
  remainingSeconds,
  guessInputRef,
  lastUserGuess,
  envokeLastAnswer,
  lines,
}) => {
  const [animateInput, setAnimateInput] = useState(true);
  const [inputLocked, setInputLocked] = useState(false);
  const [lastGuessID, setLastGuessID] = useState(null);
  const [lastSuccess, setLastSuccess] = useState(true);
  const { t } = useTranslation("kalambury");
  const { moves } = useBoardGame();

  const lastUserGuessID = lastUserGuess ? lastUserGuess.id : null;

  const sendGuess = () => {
    if (guess) moves.Guess(guess);
    setGuess("");
  };

  const handleEvokingLastAnswer = (e) => {
    if (e.key === "ArrowUp" && lastUserGuess.phrase !== null) {
      envokeLastAnswer(lastUserGuess.phrase);
    }
  };

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  var guessInput = (
    <Input
      fluid
      autoFocus
      readOnly={inputLocked}
      ref={guessInputRef}
      placeholder={t("board.guess.input.placeholder")}
      value={guess}
      onChange={handleChange}
      onKeyDown={handleEvokingLastAnswer}
      action={{
        content: t("board.guess.input.action"),
        icon: "chat",
        labelPosition: "right",
        color: "green",
        type: "submit",
      }}
      style={{
        height: "41px",
      }}
    />
  );

  useEffect(() => {
    if (lastGuessID === lastUserGuessID) {
      return;
    }
    setLastGuessID(lastUserGuessID);
    setLastSuccess(lastUserGuess.success);
    setInputLocked(true);
    setTimeout(() => setInputLocked(false), 250);
    setAnimateInput((animateInput) => !animateInput);
  }, [lastUserGuess, lastUserGuessID, lastGuessID]);

  return (
    <div>
      <Form onSubmit={sendGuess}>
        <Transition
          animation={lastSuccess ? "pulse" : "shake"}
          duration={300}
          visible={animateInput}
        >
          <Form.Field
            error={inputLocked && !lastSuccess}
            className={inputLocked && lastSuccess ? "success" : ""}
          >
            {guessInput}
          </Form.Field>
        </Transition>
      </Form>
      <Drawing lines={lines} remainingSeconds={remainingSeconds} />
    </div>
  );
};

export default GuessingBoard;
