import { useEffect, useState } from "react";
import Board from "./Board";
import bot, { Level, randomInt } from "./Bot";
import Othello, { NextMove, Player, Status } from "./Othello";

export default function App() {

    const [ user, setUser ] = useState<Player>();
    const [ level, setLevel ] = useState<Level | 'alone'>('alone');
    const [ othello, setOthello ] = useState<Othello>(new Othello());
    const [ nextMove, setNextMove ] = useState<NextMove>(null);
    
    const status = othello.getStatus();

    useEffect(() => {
        setUser(randomInt(0, 1) ? 'black' : 'white');
        setNextMove(othello.getNextMove());
    }, [ othello ]);

    useEffect(() => {
        if(nextMove && level !== 'alone' && nextMove.player !== user) {
            setTimeout(() => {
                    setNextMove(othello.makeMove(bot({
                    board: othello.getBoard(),
                    next: nextMove,
                    level
                })));
            }, 1000);
        }
    }, [level, nextMove, othello, user]);

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
                movies={ nextMove === null || (level !== 'alone' && nextMove.player !== user) ? [] : nextMove.moves }
                onClick={ position => setNextMove(othello.makeMove(position)) }
            />
            
            <div>
                <label>Level:&nbsp;</label>
                <select value={ level } onChange={ input => setLevel(input.target.value as Level) }>
                    <option value='alone'>Alone</option>
                    <option value='easy'>Easy Bot</option>
                    <option value='medium' disabled>Medium Bot</option>
                    <option value='hard' disabled>Hard Bot</option>
                </select>
            </div>

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
