import React, { useState, useEffect } from "react";
import { Transition, Form, Input } from "semantic-ui-react";
import Drawing from "../Drawing";
import { useTranslation } from "react-i18next";

const GuessingBoard = ({
  G: { remainingSeconds },
  moves: { Guess },
  rawClient,
  guess,
  setGuess,
  guessInputRef,
  previousUserGuesses,
  envokeLastAnswer,
  lines,
}) => {
  const [animateInput, setAnimateInput] = useState(true);
  const [inputLocked, setInputLocked] = useState(false);
  const [lastGuess, setLastGuess] = useState();
  const [lastSuccess, setLastSuccess] = useState(true);
  const { t } = useTranslation("kalambury");

  const sendGuess = () => {
    if (guess) Guess(guess);
    setGuess("");
  };

  const handleEvokingLastAnswer = (e) => {
    if (e.key === "ArrowUp" && previousUserGuesses.length > 0) {
      envokeLastAnswer(previousUserGuesses[0].phrase);
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
    let guess = previousUserGuesses[0];
    if (!guess) {
      return;
    }
    if (lastGuess && lastGuess.id === guess.id) {
      return;
    }
    setLastGuess(guess);
    setLastSuccess(guess.success);
    setInputLocked(true);
    setTimeout(() => setInputLocked(false), 250);
    setAnimateInput((animateInput) => !animateInput);
  }, [previousUserGuesses, lastGuess]);

  return (
    <>
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
      <Drawing remainingSeconds={remainingSeconds} lines={lines} />
    </>
  );
};

export default GuessingBoard;
