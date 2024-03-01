import { useEffect, useState } from "react";
import Board from "./Board";
import Othello, { NextMove, Status } from "./Othello";

export default function App() {

    const [ othello, setOthello ] = useState<Othello>(new Othello());
    const [ nextMove, setNextMove ] = useState<NextMove>(null);

    const status = othello.getStatus();

    useEffect(() => setNextMove(othello.getNextMove()), [ othello ]);

    return (

        <main>

            <div className="player">
                { nextMove ? (
                    <>
                        <div className={ `board-${ nextMove.player }` }></div>
                        <div className="strong">{ nextMove.player }&nbsp;player</div>
                    </>
                ) : (
                    <div className="strong red">
                        {
                            status.black > status.white ? 'Black Win' :
                            status.black < status.white ? 'White Win' :
                            'Game Tied'
                        }
                    </div>
                ) }
            </div>

            <Board
                data={ othello.getBoard() }
                movies={ nextMove === null ? [] : nextMove.moves }
                onClick={ position => setNextMove(othello.makeMove(position)) }
            />

            <div className="status">
                { Object.keys(status).map(k => (
                    <div className="strong" key={ k }>
                        { k }:&nbsp;{ status[k as keyof Status] }
                    </div>
                )) }
            </div>

            <div className="buttons">
                <p><button onClick={ () => setNextMove(othello.backMove()) } disabled={ !othello.isReturnable() }>Back</button></p>
                {/* <p><button onClick={ () => console.log(othello.getGameString()) }>Salvar</button></p> */}
                <p><button onClick={ () => setOthello(new Othello()) }>Reset</button></p>
            </div>
            
        </main>

    )

}
