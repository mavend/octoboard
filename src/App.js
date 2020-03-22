import { Client } from 'boardgame.io/react';

function SetPhrase(G, ctx, phrase) {
        G.phrase = phrase;
        ctx.events.setActivePlayers({ others: 'guess' });
}

function Guess(G, ctx, phrase) {
        G.guesses.push(ctx.playerID + ": " + phrase);
        if(phrase == G.phrase) {
                G.points[ctx.playerID] += 1;
                ctx.events.endTurn();
        }
}

const Kalambury = {
        setup: (ctx, setupData) => ({ phrase: "", points: Array(ctx.numPlayers).fill(0), guesses: [] }),

        moves: { SetPhrase },

        turn: {
                stages: {
                        guess: {
                                moves: { Guess }
                        }
                }
        }
};

const App = Client({ game: Kalambury, numPlayers: 3 });

export default App;

