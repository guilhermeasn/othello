export type BoardPiece = 'black' | 'white';

export type BoardCell = BoardPiece | 'play' | 'empty';

export type BoardIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type BoardRow = [
    BoardCell, BoardCell, BoardCell, BoardCell,
    BoardCell, BoardCell, BoardCell, BoardCell
]

export type BoardData = [
    BoardRow, BoardRow, BoardRow, BoardRow,
    BoardRow, BoardRow, BoardRow, BoardRow
]

export type BoardProps = {
    data : BoardData
}

export default function Board({ data } : BoardProps) {

    return (

        <div className="board-root">

            { Array(8).fill(null).map((_, row) => (
                
                <div key={ row } className="board-row">

                    { Array(8).fill(null).map((_, cell) => (

                        <div key={ cell } className={ `board-cell board-cell-${ data[row][cell] }` }>

                            <div className={ `board-${ data[row][cell] }` } />

                        </div>

                    )) }

                </div>

            )) }

        </div>

    );

}