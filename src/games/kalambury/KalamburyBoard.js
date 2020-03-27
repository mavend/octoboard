import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  Container,
  Icon,
  Transition,
  Segment,
  Button,
  Header,
  Form,
  Input,
  Grid,
} from "semantic-ui-react";
import DrawArea from "./DrawArea";
import Drawing from "./Drawing";
import KalamburySidebar from "./KalamburySidebar";
import { avatarForName } from "./utils/avatar";
import { timerFormat } from "./utils/time";
import { useTranslation } from "react-i18next";

const KalamburyBoard = ({ G, ctx, playerID, moves, gameMetadata }) => {
  const { players, actions, canChangePhrase, remainingSeconds } = G;
  const { activePlayers, phase } = ctx;
  const { Ping, ChangePhrase } = moves;
  const { t, i18n } = useTranslation("kalambury");

  const [guess, setGuess] = useState("");
  const playerData = players[playerID];
  const playerMetadata = gameMetadata[playerID] || {};
  const playerName = playerMetadata.name;
  const isDrawing = activePlayers[playerID] === "draw";
  const hasGameStarted = phase === "play";
  const canManageGame = activePlayers[playerID] === "manage";

  const guessInputRef = useRef();

  const pingPlayersData = () => {
    Ping({
      name: playerName,
      avatar: avatarForName(playerName),
    });
  };

  useEffect(() => {
    pingPlayersData();
    let interval = setInterval(pingPlayersData, 1000);
    return () => clearInterval(interval);
  }, [Ping, playerName]);

  const styles = {
    mainHeader: {
      marginTop: "20px",
      marginBottom: "40px",
    },
    mainContent: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  };

  const handleGuessClick = (e) => {
    if (!isDrawing) {
      setGuess(e.target.textContent);
      guessInputRef.current.focus();
    }
  };

  const getUserActions = (actions, _playerID, actionType) => {
    let allActions = [...actions]
      .reverse()
      .filter(({ playerID, action }) => playerID === _playerID);
    if (actionType) {
      return allActions.filter(({ action }) => action === actionType);
    }
    return allActions;
  };

  const envokeLastAnswer = (lastGuess) => {
    if (!isDrawing) {
      setGuess(lastGuess);
      guessInputRef.current.inputRef.current.blur();
      setTimeout(() => guessInputRef.current.focus(), 1);
    }
  };

  let header = (
    <Header as="h2" textAlign="center">
      {t(`header.${phase}`)}
      <Header.Subheader>
        {isDrawing ? playerData.phrase : t(`subheader.${phase}.${activePlayers[playerID]}`)}
      </Header.Subheader>
    </Header>
  );

  return (
    <>
      <Container>
        <Header as="h1" textAlign="center" style={styles.mainHeader}>
          {t("game.name")}
        </Header>
      </Container>
      <Container style={styles.mainContent}>
        <Grid>
          <Grid.Column width="12">
            {header}
            {hasGameStarted ? (
              <GameBoard
                {...{
                  G,
                  ctx,
                  moves,
                  playerData,
                  isDrawing,
                  envokeLastAnswer,
                  getUserActions,
                  actions,
                  playerID,
                  guessInputRef,
                  guess,
                  setGuess,
                  canChangePhrase,
                  ChangePhrase,
                }}
              />
            ) : (
              <WaitingBoard
                previousUserMessages={getUserActions(actions, playerID, "message")}
                {...{ moves, canManageGame, setGuess, guess }}
              />
            )}
          </Grid.Column>
          <Grid.Column width="4" style={{ marginTop: "19px" }}>
            <KalamburySidebar
              handleGuessClick={handleGuessClick}
              getUserActions={getUserActions}
              {...{ G, ctx, playerID, moves, gameMetadata }}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

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

  const handleChange = (e) => {
    setGuess(e.target.value);
  };
  const sendGuess = () => {
    SendText(guess);
    setGuess("");
  };

  useEffect(() => {
    let message = previousUserMessages[0];
    if (!message) {
      return;
    }
    if (lastMessage && lastMessage.time === message.time) {
      return;
    }
    setLastMessage(message);
    setInputLocked(true);
    setTimeout(() => setInputLocked(false), 250);
    setAnimateInput((animateInput) => !animateInput);
  }, [previousUserMessages]);

  return (
    <>
      <Form onSubmit={sendGuess}>
        <Transition animation={"pulse"} duration={300} visible={animateInput}>
          <Form.Field>
            <Input
              fluid
              autoFocus
              readOnly={inputLocked}
              placeholder="Talk to other players while waiting..."
              value={guess}
              onChange={handleChange}
              action={{
                content: "Send your messsage",
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
            Start game
            <Icon name="pencil" />
          </Button>
        ) : (
          <Image src="/images/hugo-waiting.png" style={{ width: 400, margin: "0 auto" }} />
        )}
      </Segment>
    </>
  );
};

const GameBoard = ({
  isDrawing,
  playerData,
  G,
  ctx,
  moves,
  envokeLastAnswer,
  getUserActions,
  actions,
  playerID,
  guessInputRef,
  guess,
  setGuess,
  canChangePhrase,
  ChangePhrase,
}) => (
  <>
    {isDrawing ? (
      <DrawingBoard playerData={playerData} {...{ G, ctx, moves }} />
    ) : (
      <GuessingBoard
        envokeLastAnswer={envokeLastAnswer}
        previousUserGuesses={getUserActions(actions, playerID, "guess")}
        playerID={playerID}
        guessInputRef={guessInputRef}
        guess={guess}
        setGuess={setGuess}
        {...{ G, ctx, moves }}
      />
    )}
    <Header as="h3" textAlign="center" style={{ marginTop: 0 }}>
      {timerFormat(G.remainingSeconds)}
    </Header>
    {isDrawing ? (
      <Segment basic textAlign="center">
        <Button color="yellow" disabled={!canChangePhrase} onClick={() => ChangePhrase()}>
          Get new phrase
        </Button>
      </Segment>
    ) : (
      <></>
    )}
  </>
);

const DrawingBoard = ({
  G: { drawing, remainingSeconds },
  moves: { UpdateDrawing, Forfeit },
  playerData: { phrase },
}) => (
  <DrawArea
    initialLines={drawing}
    remainingSeconds={remainingSeconds}
    onUpdate={(lines) => UpdateDrawing(lines)}
    onForfeit={() => Forfeit()}
  />
);

const GuessingBoard = ({
  G: { drawing, remainingSeconds },
  moves: { Guess },
  guess,
  setGuess,
  guessInputRef,
  previousUserGuesses,
  envokeLastAnswer,
}) => {
  const [animateInput, setAnimateInput] = useState(true);
  const [inputLocked, setInputLocked] = useState(false);
  const [lastGuess, setLastGuess] = useState();
  const [lastSuccess, setLastSuccess] = useState(true);

  const sendGuess = () => {
    Guess(guess);
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
      placeholder="The drawing shows..."
      value={guess}
      onChange={handleChange}
      onKeyDown={handleEvokingLastAnswer}
      action={{
        content: "Send your guess",
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
    if (lastGuess && lastGuess.time === guess.time) {
      return;
    }
    setLastGuess(guess);
    setLastSuccess(guess.success);
    setInputLocked(true);
    setTimeout(() => setInputLocked(false), 250);
    setAnimateInput((animateInput) => !animateInput);
  }, [previousUserGuesses]);

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
      <Drawing remainingSeconds={remainingSeconds} lines={drawing} />
    </>
  );
};

export default KalamburyBoard;
