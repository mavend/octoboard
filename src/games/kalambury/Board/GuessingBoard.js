import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Transition, Form, Input } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import { useBoardGame } from "contexts/BoardGameContext";
import Drawing from "../Drawing";
import { LineType } from "config/propTypes";

const propTypes = {
  guess: PropTypes.string,
  setGuess: PropTypes.func,
  lastUserGuess: PropTypes.shape({
    id: PropTypes.number,
    phrase: PropTypes.string,
    success: PropTypes.bool,
  }),
  envokeLastAnswer: PropTypes.func,
  guessInputRef: PropTypes.object,
  lines: PropTypes.arrayOf(LineType),
};

const GuessingBoard = ({
  guess,
  setGuess,
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

  const sendGuess = (e) => {
    e.preventDefault();
    if (guess) moves.Guess(guess);
    setGuess("");
  };

  const handleEvokingLastAnswer = (e) => {
    if (e.key === "ArrowUp" && lastUserGuess.phrase !== null) {
      envokeLastAnswer(lastUserGuess.phrase);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setGuess(e.target.value);
  };

  const guessInput = (
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
      <Form action="#" onSubmit={sendGuess}>
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
      <Drawing lines={lines} />
    </div>
  );
};
GuessingBoard.propTypes = propTypes;

export default GuessingBoard;
