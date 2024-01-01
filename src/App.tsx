import { useEffect, useState } from "react";
import Board, { BoardData, BoardIndex, BoardPiece } from "./Board";
import { calculateNextPlay, calculateReversi, startBoard } from "./helpers";

export default function App() {

    const [ play, setPlay ] = useState<BoardPiece>('black');
    const [ data, setData ] = useState<BoardData>(Array(8).fill(Array(8).fill('empty')) as BoardData);

    const update = (row : BoardIndex, cell: BoardIndex) : void => {
        let newData = calculateReversi(data, play, row, cell);
        let current : BoardPiece = play === 'black' ? 'white' : 'black';
        setPlay(current);
        setData(calculateNextPlay(newData, current));
    }

    useEffect(() => {

        setData(data => {
            let newData = data.map(row => row.map(cell => cell === 'play' ? 'empty' : cell)) as BoardData;
            startBoard.forEach(([ row, cell, status ]) => newData[row][cell] = status);
            return calculateNextPlay(newData, play);
        });

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (

        <main>

            <Board
                data={ data }
                onClick={ update }
            />

        </main>

    )

}
