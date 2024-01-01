import { useCallback, useEffect, useState } from "react";
import Board, { BoardData, BoardIndex, BoardPiece } from "./Board";

export default function App() {

    const [ play, setPlay ] = useState<BoardPiece>('black');
    const [ data, setData ] = useState<BoardData>(Array(8).fill(Array(8).fill('empty')) as BoardData);

    const update = useCallback((...changes : Array<[ BoardIndex, BoardIndex, BoardPiece ]>) : void => {

        setData(data => {
            let newData = data.map(row => row.map(cell => cell === 'play' ? 'empty' : cell)) as BoardData;
            changes.forEach(([ row, cell, status ]) => newData[row][cell] = status);
            return CalculateCellPlay(newData, play);
        });

        setPlay(play => play === 'black' ? 'white' : 'black');
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => update(
        [ 3, 3, 'white' ],
        [ 3, 4, 'black' ],
        [ 4, 3, 'black' ],
        [ 4, 4, 'white' ]
    ), [ update ]);

    return (

        <main>

            <Board data={ data } />

        </main>

    )

}

function CalculateCellPlay(data : BoardData, current : BoardPiece) : BoardData {

    const oposite : BoardPiece = current === 'black' ? 'white' : 'black';

    const regexs : Array<[ RegExp, string ]> = [
        [ new RegExp(`empty-(${oposite}-)+${current}`, 'g'), `play-$1${current}` ], // left to right
        [ new RegExp(`${current}(-${oposite})+-empty`, 'g'), `${current}$1-play` ], // right to left
        [ new RegExp(`empty(([-|][a-z]+){7}[-|]${oposite})+(([-|][a-z]+){7}[-|]${current})`, 'g'), `play$1$3` ], // top to bottom
        [ new RegExp(`${current}(([-|][a-z]+){7}[-|]${oposite})+(([-|][a-z]+){7}[-|])empty`, 'g'), `${current}$1$3play` ], // bottom to top
    ];

    let board : string = data.map(row => row.join('-')).join('|');
    regexs.forEach(([ regex, pattern ]) => board = board.replace(regex, pattern));
    console.log(board.split('|').map(row => row.split('-')));
    return board.split('|').map(row => row.split('-')) as BoardData;

}
