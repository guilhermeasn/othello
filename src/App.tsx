import { useEffect, useState } from "react";
import Board, { BoardProps } from "./Board";

type CellInfo = {
    row : number;
    cell : number;
    value : boolean | undefined;
}

export default function App() {

    const [ data, setData ] = useState<BoardProps['data']>(Array(8).fill(Array(8).fill(undefined)));
    
    const changeData = (...changes : CellInfo[]) => {
        setData(data => {
            changes.forEach(({ row, cell, value }) => {
                data = data.map((a, r) => a.map((v, c) => r === row && c === cell ? value : v ))
            });
            return data;
        });
    }

    useEffect(() => {
        changeData(
            { row: 3, cell: 3, value: false },
            { row: 3, cell: 4, value: true },
            { row: 4, cell: 3, value: true },
            { row: 4, cell: 4, value: false }
        )
    }, []);

    return (

        <main>

            <Board data={ data } />

        </main>

    )

}