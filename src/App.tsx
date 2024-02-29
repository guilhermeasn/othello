import { useMemo } from "react";
import Othello from "./Othello";

export default function App() {

    const othello = useMemo(() => new Othello(), []);
    console.log(othello.validMovies());
    console.log(othello.getGame());

    return (

        <main>

            

        </main>

    )

}
