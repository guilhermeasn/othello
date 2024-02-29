import { useEffect, useState } from "react";
import Board from "./Board";
import Othello, { NextMove } from "./Othello";

export default function App() {

    const [ othello, setOthello ] = useState<Othello>(new Othello());
    const [ nextMove, setNextMove ] = useState<NextMove>(null);

    useEffect(() => setNextMove(othello.getNextMove()), [ othello ]);

    return (

        <main>

            <Board
                data={ othello.getBoard() }
                movies={ nextMove === null ? [] : nextMove.moves }
                onClick={ position => setNextMove(othello.makeMove(position)) }
            />

            <div>
                <p><button onClick={ () => setNextMove(othello.backMove()) } disabled={ !othello.isReturnable() }>Back</button></p>
                <p><button onClick={ () => console.log(othello.getGameString()) }>Salvar</button></p>
                <p><button onClick={ () => setOthello(new Othello()) }>Reset</button></p>
                <p>{ nextMove?.player ?? 'Game End' }</p>
            </div>
            
        </main>

    )

}
