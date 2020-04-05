import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Responsive, Segment, Container, Header, Grid } from "semantic-ui-react";
import Sidebar from "./Sidebar";
import WaitingBoard from "./board/WaitingBoard";
import GameBoard from "./board/GameBoard";
import { useBoardGame } from "contexts/BoardGameContext";

const Board = () => {
  const { G, ctx, moves, playerID, rawClient } = useBoardGame();
  const { t } = useTranslation("kalambury");

  const [guess, setGuess] = useState("");
  const isDrawing = ctx.activePlayers[playerID] === "draw";
  const playerData = G.players[playerID];
  const hasGameStarted = ctx.phase === "play";
  const canManageGame = ctx.activePlayers[playerID] === "manage";

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
    moves.Ping();
    let interval = setInterval(moves.Ping, 1000);
    return () => clearInterval(interval);
  }, [moves, moves.Ping]);

  const handleGuessClick = useCallback(
    (e) => {
      if (!isDrawing) {
        setGuess(e.target.textContent);
        guessInputRef.current.focus();
      }
    },
    [isDrawing]
  );

  const envokeLastAnswer = useCallback(
    (lastGuess) => {
      if (!isDrawing) {
        setGuess(lastGuess);
        guessInputRef.current.inputRef.current.blur();
        setTimeout(() => guessInputRef.current.focus(), 1);
      }
    },
    [isDrawing]
  );

  let gameContent = () => (
    <>
      <Header as="h2" textAlign="center">
        {t(`header.${ctx.phase}`)}
        <Header.Subheader>
          {isDrawing
            ? playerData.phrase
            : t(`subheader.${ctx.phase}.${ctx.activePlayers[playerID]}`)}
        </Header.Subheader>
      </Header>
      {hasGameStarted ? (
        <GameBoard
          {...{
            envokeLastAnswer,
            guessInputRef,
            guess,
            setGuess,
          }}
        />
      ) : (
        <WaitingBoard {...{ canManageGame, setGuess, guess }} />
      )}
    </>
  );

  const sidebarContent = () => <Sidebar handleGuessClick={handleGuessClick} />;

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
