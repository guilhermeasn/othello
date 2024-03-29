import type { Board as BoardData, Cell, Position } from "./Othello";
import Othello from "./Othello";

export type BoardProps = {
    data : BoardData,
    movies : Position[];
    onClick ?: (position : Position) => void;
}

export default function Board({ data, movies, onClick = () => {} } : BoardProps) {

    const isPlayed = (position : Position) : boolean => {
        return movies.some(move => move.row === position.row && move.col === position.col);
    }

    return (

        <div className="board-root">

            { Array(8).fill(null).map((_, row) => (
                
                <div key={ row } className="board-row">
                    { Array(8).fill(null).map((_, col) => (
                        <BoardCell key={ col } name={ Othello.cols[col].toUpperCase() + Othello.rows[row] } variant={ isPlayed({ row, col }) ? 'play' : data[row][col] } onClick={ () => onClick({ row, col }) } />
                    )) }
                </div>

            )) }

        </div>

    );

}

type CellProps = {
    name : string;
    variant : Cell | 'play';
    onClick : () => void
}

function BoardCell({ name, variant, onClick } : CellProps) {
    return (
        <div title={ name } onClick={ variant === 'play' ? onClick : undefined  } className={ `board-cell board-cell-${ variant }` }>
            <div className={ `board-${ variant }` } />
        </div>
    )
}