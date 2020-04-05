import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Responsive, Segment, Container, Header, Grid } from "semantic-ui-react";
import { filter, reverse } from "lodash";
import Sidebar from "./Sidebar";
import WaitingBoard from "./board/WaitingBoard";
import GameBoard from "./board/GameBoard";

const Board = ({ G, ctx, playerID, moves, gameMetadata, rawClient }) => {
  const { players, actions, canChangePhrase } = G;
  const { activePlayers, phase } = ctx;
  const { Ping, ChangePhrase } = moves;
  const { t } = useTranslation("kalambury");

  const [guess, setGuess] = useState("");
  const playerData = players[playerID];
  const isDrawing = activePlayers[playerID] === "draw";
  const hasGameStarted = phase === "play";
  const canManageGame = activePlayers[playerID] === "manage";

  const guessInputRef = useRef();

  useEffect(() => {
    // resync after connection to broadcast updated gameMetadata
    if (rawClient) {
      const {
        transport: { socket, gameID, playerID, numPlayers },
      } = rawClient;
      const timeout = setTimeout(() => socket.emit("sync", gameID, playerID, numPlayers), 500);
      return () => clearTimeout(timeout);
    }
  }, [rawClient]);

  useEffect(() => {
    Ping();
    let interval = setInterval(Ping, 1000);
    return () => clearInterval(interval);
  }, [Ping]);

  const handleGuessClick = (e) => {
    if (!isDrawing) {
      setGuess(e.target.textContent);
      guessInputRef.current.focus();
    }
  };

  const getUserActions = (actions, playerID, actionType) => {
    let allActions = reverse(filter(actions, { playerID: playerID.toString() }));
    if (actionType) {
      return filter(allActions, { action: actionType });
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

  let gameContent = () => (
    <>
      <Header as="h2" textAlign="center">
        {t(`header.${phase}`)}
        <Header.Subheader>
          {isDrawing ? playerData.phrase : t(`subheader.${phase}.${activePlayers[playerID]}`)}
        </Header.Subheader>
      </Header>
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
    </>
  );

  const sidebarContent = () => (
    <Sidebar
      handleGuessClick={handleGuessClick}
      getUserActions={getUserActions}
      {...{ G, ctx, playerID, moves, gameMetadata }}
    />
  );

  return (
    <Container>
      <Segment basic>
        <Header as="h1" textAlign="center">
          {t("game.name")}
        </Header>
      </Segment>
      <Responsive as={Grid} minWidth={Responsive.onlyComputer.minWidth}>
        <Grid.Column width="12">
          <Grid.Row>{gameContent()}</Grid.Row>
        </Grid.Column>
        <Grid.Column width="4">
          <Grid.Row>{sidebarContent()}</Grid.Row>
        </Grid.Column>
      </Responsive>
      <Responsive as={Grid} maxWidth={Responsive.onlyTablet.maxWidth}>
        <Grid.Row>
          <Grid.Column>{gameContent()}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>{sidebarContent()}</Grid.Column>
        </Grid.Row>
      </Responsive>
    </Container>
  );
};

export default Board;
