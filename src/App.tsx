import { useMemo } from "react";
import Othello from "./Othello";

export default function App() {

    const othello = useMemo(() => new Othello(), []);
    console.log(othello);
    console.log(othello.getNextMove());

    return (

        <main>

            

        </main>

    )

}
