import type { NextMove, Position } from "./Othello";

export type Level = 'easy' | 'medium' | 'hard';

export type BotProps = {
    // board : Board;
    next  : NonNullable<NextMove>;
    level : Level;
};

function easy(props : BotProps) : Position {
    const random : number = randomInt(1, props.next.moves.length);
    return props.next.moves[random - 1];
}

// function medium(props : BotProps) : Position {
//     return { row: 0, col: 0 };
// }

function hard(props : BotProps) : Position {

    const desidered = props.next.moves.filter(position => (
        (position.col === 0 || position.col === 7) &&
        (position.row === 0 || position.row === 7)
    ));

    if(desidered.length > 0) {
        const random : number = randomInt(1, desidered.length);
        return desidered[random - 1];
    }

    const desidered2 = props.next.moves.filter(position => !(
        (position.col === 0 || position.col === 1 || position.col === 6 || position.col === 7) &&
        (position.row === 0 || position.row === 1 || position.row === 6 || position.row === 7)
    ));

    if(desidered2.length > 0) {
        const random : number = randomInt(1, desidered2.length);
        return desidered2[random - 1];
    }

    const random : number = randomInt(1, props.next.moves.length);
    return props.next.moves[random - 1];

}

export default function bot(props : BotProps) : Position {
    switch(props.level) {
        case 'easy'   : return easy(props);
        case 'medium' : return easy(props);
        case 'hard'   : return hard(props);
    }
}

export function randomInt(min : number, max : number) : number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
