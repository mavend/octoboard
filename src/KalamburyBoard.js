import React, { useState, useEffect, useRef } from "react";
import { 
  Container,
  Header,
  Form,
  Input,
  Grid,
} from "semantic-ui-react";
import DrawArea from "./DrawArea";
import Drawing from "./Drawing";
import KalamburySidebar from "./KalamburySidebar";

const KalamburyBoard = ({ G, ctx, playerID, moves }) => {
  const { players } = G;
  const { activePlayers } = ctx;
  const { TickTime } = moves;

  const [guess, setGuess] = useState("");
  const playerData = players[playerID];
  const isDrawing = activePlayers[playerID] === "draw";

  const guessInputRef = useRef();

  useEffect(() => {
    let interval = null
    if (isDrawing) { interval = setInterval(TickTime, 1000); }
    return () => clearInterval(interval);
  }, [isDrawing, TickTime]);

  const styles = {
    mainHeader: {
      marginTop: "20px",
      marginBottom: "40px",
    },
    mainContent: {
      marginLeft: "auto",
      marginRight: "auto",
    }
  }

  const handleGuessClick = (e) => {
    if (!isDrawing) {
      setGuess(e.target.textContent);
      guessInputRef.current.focus();
    }
  }

  const remainingTime = () => {
    let minutes = Math.floor(G.remainingSeconds / 60);
    let seconds = G.remainingSeconds - minutes * 60;
    if (seconds < 10) { seconds = "0" + seconds }
    return minutes + ":" + seconds
  }

  return (
    <div>
      <Container>
        <Header as="h1" textAlign="center" style={styles.mainHeader}>
          Kalambury
        </Header>
      </Container>
      <Container style={styles.mainContent}>
        <Grid>
          <Grid.Column width="12">
            { isDrawing ? (
              <DrawingBoard playerData={playerData} {...{ G, ctx, moves }} />
            ) : (
              <GuessingBoard playerData={playerData} guess={guess} guessInputRef={guessInputRef} setGuess={setGuess} {...{ G, ctx, moves }} />
            )}
            <Header as="h3" textAlign="center" style={{marginTop: 0}}>{remainingTime()}</Header>
          </Grid.Column>
          <Grid.Column width="4" style={{marginTop: "19px"}}>
            <KalamburySidebar handleGuessClick={handleGuessClick} {...{ G, ctx, playerID, moves }} />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}

const DrawingBoard = ({
  G: { drawing, remainingSeconds },
  moves: { UpdateDrawing, Forfeit },
  playerData: { phrase }
}) => (
  <>
    <Header as='h2' textAlign="center">
      You are drawing!
      <Header.Subheader>{phrase}</Header.Subheader>
    </Header>
    <DrawArea
      initialLines={drawing}
      remainingSeconds={remainingSeconds}
      onUpdate={lines => UpdateDrawing(lines)}
      onForfeit={() => Forfeit()}
    />
  </>
);

const GuessingBoard = ({
  G: { drawing, remainingSeconds },
  moves: { Guess },
  guess, setGuess, guessInputRef
}) => {

  const sendGuess = () => {
    Guess(guess);
    setGuess("");
  }

  return (
    <>
      <Header as='h2' textAlign="center">
        You are guessing!
        <Header.Subheader>What's on the drawing?</Header.Subheader>
      </Header>
      <Form onSubmit={sendGuess}>
        <Input fluid
          ref={guessInputRef}
          placeholder='The drawing shows...'
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          action={{
            content: "Send your guess",
            icon: "chat",
            labelPosition: "right",
            color: "green",
            onClick: sendGuess
          }}
          style={{
            height: "41px"
          }}
        />
      </Form>
      <Drawing remainingSeconds={remainingSeconds} lines={drawing} />
    </>
  )
};

export default KalamburyBoard;
