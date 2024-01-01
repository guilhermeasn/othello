export type BoardProps = {

    /**
     * - ```true``` is black piece
     * - ```false``` is white piece
     * - ```undefined``` is empty
     */
    data : Array<Array<boolean | undefined>>;

}

export default function Board({ data } : BoardProps) {

    return (

        <div className="board-root">

            { Array(8).fill(null).map((_, row) => (
                
                <div key={ row } className="board-row">

                    { Array(8).fill(null).map((_, cell) => (

                        <div key={ cell } className={ "board-cell-" + (typeof data[row][cell] === 'boolean' ? 'fill' : 'empty') }>

                            <div className={ (
                                data?.[row]?.[cell] === true ? 'board-black' : (
                                    data?.[row]?.[cell] === false ? 'board-white' : 'board-empty'
                                )
                            ) } />

                        </div>

                    )) }

                </div>

            )) }

        </div>

    );

}