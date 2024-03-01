import type { Board, NextMove, Position } from "./Othello";

export type Level = 'easy' | 'medium' | 'hard';

export type BotProps = {
    board : Board;
    next  : NonNullable<NextMove>;
    level : Level;
};

function easy(props : BotProps) : Position {
    const random : number = randomInt(1, props.next.moves.length);
    return props.next.moves[random - 1];
}

function medium(props : BotProps) : Position {
    return { row: 0, col: 0 };
}

function hard(props : BotProps) : Position {
    return { row: 0, col: 0 };
}

export default function bot(props : BotProps) : Position {
    switch(props.level) {
        case 'easy'   : return easy(props);
        case 'medium' : return easy(props);
        case 'hard'   : return easy(props);
    }
}

export function randomInt(min : number, max : number) : number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
