import { useEffect, useState } from "react";
import Board from "./Board";
import bot, { Level } from "./Bot";
import Othello, { NextMove, Player, Status } from "./Othello";

function save(gameString : string) : void {
    if(!localStorage) return;
    localStorage.setItem('othello', gameString);
}

function restore() : string {
    if(!localStorage) return '';
    return localStorage.getItem('othello') ?? '';
}

export default function App() {

    const [ play, setPlay ] = useState<Record<Player, Level | 'user'>>({ black: 'user', white: 'user' });
    const [ othello, setOthello ] = useState<Othello>(new Othello(restore()));
    const [ nextMove, setNextMove ] = useState<NextMove>(null);
    
    const status = othello.getStatus();

    useEffect(() => setNextMove(othello.getNextMove()), [ othello ]);

    useEffect(() => {

        save(othello.getGameString());

        if(nextMove && play[nextMove.player] !== 'user') {
            setTimeout(() => {
                setNextMove(othello.makeMove(bot({
                    next: nextMove,
                    level: play[nextMove.player] as Level
                })));
            }, 1000);
        }

    }, [nextMove, othello, play]);

    return (

        <main>

            <div className="player">
                { nextMove ? (
                    <>
                        <div className={ `board-${ nextMove.player }` }></div>
                        <div className="strong">{ nextMove.player }&nbsp;play</div>
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
                movies={ nextMove === null || play[nextMove.player] !== 'user' ? [] : nextMove.moves }
                onClick={ position => setNextMove(othello.makeMove(position)) }
            />

            <div className="selections">
                { Object.keys(play).map(player => (
                    <div className="margin" key={ player }>
                        <label>{player}:</label>
                        <select value={ play[player as keyof typeof play] } onChange={ input => setPlay(play => ({ ...play, [player]: input.target.value })) }>
                            <option value='user'>User</option>
                            <option value='easy'>Easy Bot</option>
                            {/* <option value='medium'>Medium Bot</option> */}
                            <option value='hard'>Hard Bot</option>
                        </select>
                    </div>
                )) }
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
                <p><button onClick={ () => setOthello(new Othello()) } disabled={ !othello.isReturnable() }>Reset</button></p>
            </div>
            
        </main>

    )

}
