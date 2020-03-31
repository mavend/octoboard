import React, { useState, useEffect, useRef } from "react";
import { Responsive, Segment, Container, Header, Grid } from "semantic-ui-react";
import Sidebar from "./Sidebar";
import { avatarForName } from "./utils/avatar";
import { useTranslation } from "react-i18next";
import WaitingBoard from "./board/WaitingBoard";
import GameBoard from "./board/GameBoard";
import { DESKTOP_MIN_WIDTH, MOBILE_MAX_WIDTH } from "config/constants";

const Board = ({ G, ctx, playerID, moves, gameMetadata, rawClient }) => {
  const { players, actions, canChangePhrase } = G;
  const { activePlayers, phase } = ctx;
  const { Ping, ChangePhrase } = moves;
  const { t } = useTranslation("kalambury");

  const [guess, setGuess] = useState("");
  const playerData = players[playerID];
  const playerMetadata = gameMetadata[playerID] || {};
  const playerName = playerMetadata.name;
  const isDrawing = activePlayers[playerID] === "draw";
  const hasGameStarted = phase === "play";
  const canManageGame = activePlayers[playerID] === "manage";

  const guessInputRef = useRef();

  useEffect(() => {
    const pingPlayersData = () => {
      Ping({
        name: playerName,
        avatar: avatarForName(playerName),
      });
    };
    pingPlayersData();
    let interval = setInterval(pingPlayersData, 1000);
    return () => clearInterval(interval);
  }, [Ping, playerName]);

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
    <Container>
      <Segment basic>
        <Header as="h1" textAlign="center">
          {t("game.name")}
        </Header>
      </Segment>
      <Responsive as={Grid} minWidth={DESKTOP_MIN_WIDTH}>
        <Grid.Column width="12">
          <Grid.Row>
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
                  rawClient,
                }}
              />
            ) : (
              <WaitingBoard
                previousUserMessages={getUserActions(actions, playerID, "message")}
                {...{ moves, canManageGame, setGuess, guess }}
              />
            )}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width="4">
          <Grid.Row>
            <Sidebar
              handleGuessClick={handleGuessClick}
              getUserActions={getUserActions}
              {...{ G, ctx, playerID, moves, gameMetadata }}
            />
          </Grid.Row>
        </Grid.Column>
      </Responsive>
      <Responsive as={Grid} maxWidth={MOBILE_MAX_WIDTH}>
        <Grid.Row>
          <Grid.Column>
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
                  rawClient,
                }}
              />
            ) : (
              <WaitingBoard
                previousUserMessages={getUserActions(actions, playerID, "message")}
                {...{ moves, canManageGame, setGuess, guess }}
              />
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Sidebar
              handleGuessClick={handleGuessClick}
              getUserActions={getUserActions}
              {...{ G, ctx, playerID, moves, gameMetadata }}
            />
          </Grid.Column>
        </Grid.Row>
      </Responsive>
    </Container>
  );
};

export default Board;
