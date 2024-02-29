import { useMemo, useState } from "react";
import Board from "./Board";
import Othello, { NextMove } from "./Othello";

export default function App() {

    const othello = useMemo(() => new Othello(), []);
    const [ nextMove, setNextMove ] = useState<NextMove>(othello.getNextMove());

    return (

        <main>
            <Board
                data={ othello.getBoard() }
                movies={ nextMove === null ? [] : nextMove.moves }
                onClick={ position => setNextMove(othello.makeMove(position)) }
            />
            <p><button onClick={ () => setNextMove(othello.backMove()) } disabled={ !othello.isReturnable() }>Back</button></p>
            <p>{ nextMove?.player ?? 'Game End' }</p>
        </main>

    )

}
