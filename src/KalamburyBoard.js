import React from "react";
import { Container, Header, Segment, Icon } from "semantic-ui-react";
import DrawArea from "./DrawArea";
import Drawing from "./Drawing";

const KalamburyBoard = ({ G, ctx, moves }) => {

  const { players } = G;
  const { UpdateDrawing } = moves;
  const { currentPlayer, activePlayers } = ctx;

  const playerId = Object.keys(players)[0];
  const phrase = players[currentPlayer] && players[currentPlayer].phrase;

  const styles = {
    mainHeader: {
      marginTop: "20px",
      marginBottom: "30px",
    },
    footer: {
      marginTop: "20px"
    }
  }

  return (
    <div>
      <Container>
        <Header as="h1" textAlign="center" style={styles.mainHeader}>
          <Icon name="pencil" /> Kalambury
        </Header>
      </Container>
      <Container>
        { activePlayers[playerId] === "draw" ? (
          <>
            <Header as='h2' textAlign="center">
              Your phrase
              <Header.Subheader>{phrase}</Header.Subheader>
            </Header>
            <DrawArea width="800" height="600" initialLines={G.drawing} onUpdate={lines => UpdateDrawing(lines)} />
          </>
        ) : (
          <>
            <Header as='h2' textAlign="center">Guess the phrase</Header>
            <Drawing width="800" height="600" lines={G.drawing} />
          </>
        )}
        <Segment textAlign="center" style={styles.footer}>
          PlayerId: {playerId}
        </Segment>
      </Container>
    </div>
  )
}

export default KalamburyBoard;
