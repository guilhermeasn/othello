import type { BoardData, BoardIndex, BoardPiece } from "./Board";

export const startBoard : Array<[ BoardIndex, BoardIndex, BoardPiece ]> = [
    [ 3, 3, 'white' ],
    [ 3, 4, 'black' ],
    [ 4, 3, 'black' ],
    [ 4, 4, 'white' ]
];

export function calculateNextPlay(data : BoardData, current : BoardPiece) : BoardData {

    const oposite : BoardPiece = current === 'black' ? 'white' : 'black';

    const replacers : Array<[ RegExp | string, string ]> = [
        [ 'play', 'empty' ], // clear
        [ new RegExp(`empty-((${oposite}-)+)${current}`, 'gim'), `play-$1${current}` ], // left to right
        [ new RegExp(`${current}((-${oposite})+)-empty`, 'gim'), `${current}$1-play` ], // right to left
        [ new RegExp(`empty((([-|][a-z]+){7}[-|]${oposite})+)(([-|][a-z]+){7}[-|]${current})`, 'gim'), `play$1$4` ], // top to bottom
        [ new RegExp(`${current}((([-|][a-z]+){7}[-|]${oposite})+)(([-|][a-z]+){7}[-|])empty`, 'gim'), `${current}$1$4play` ], // bottom to top
    ];

    let board : string = data.map(row => row.join('-')).join('|');
    replacers.forEach(([ regex, pattern ]) => board = board.replaceAll(regex, pattern));

    return board.split('|').map(row => row.split('-')) as BoardData;

}

export function calculateReversi(data : BoardData, current : BoardPiece, row : BoardIndex, cell : BoardIndex) : BoardData {

    const oposite : BoardPiece = current === 'black' ? 'white' : 'black';
    let board : string = data.map((r, kr) => r.map((c, kc) => kr === row && kc === cell ? 'UPDATE' : c).join('-')).join('|');

    const replacers : Array<[ RegExp | string, string ]> = [
        [ 'play', 'empty' ], // clear
        [ new RegExp(`(UPDATE-(${oposite}-)*)${oposite}(-${current})`, 'gim'), `$1${current}$2` ], // left to right
        [ new RegExp(`(${current}-(${oposite}-)*)${oposite}-UPDATE`, 'gim'), `$1${current}-UPDATE` ], // right to left
        [ 'UPDATE', current ] // updated
    ];

    replacers.forEach(([ regex, pattern ]) => board = board.replaceAll(regex, pattern));

    console.log(board.split('|').map(row => row.split('-')));

    return board.split('|').map(row => row.split('-')) as BoardData;

}