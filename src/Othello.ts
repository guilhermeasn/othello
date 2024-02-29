
export type Player = 'black' | 'white';
export type Cell = Player | null;
export type Board = Cell[][];
export type Move = Record<'row' | 'col', number>;

export default class Othello {

    private _player : Player;
    private _movies : Move[];
    private _board : Board;

    constructor() {

        this._player = 'black';
        this._movies = [];
        this._board = [];

        for(let row = 0; row < 8; row++) {

            this._board.push([]);

            for(let col = 0; col < 8; col++) {

                this._board[row].push(null);

                if((row === 3 || row === 4) && (col === 3 || col === 4)) {
                    this._board[row][col] = row === col ? 'white' : 'black';
                }
                
            }
        }

    }

    getPlayer() : Player {
        return this._player;
    }

    getMovies() : Move[] {
        return this._movies;
    }

    getBoard() : Board {
        return this._board;
    }

    getGame() : string {
        
        let game : string = '';

        this._movies.forEach(({ row, col }) => {
            game += ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][col] + (row + 1) + '-';
        });

        return game.replace(/-$/, '');

    }

    isValidMove(move : Move) : boolean {

        if(this._board[move.row][move.col] !== null) return false;

        for(let nextRow = -1; nextRow <= 1; nextRow++) {
            for(let nextCol = -1; nextCol <= 1; nextCol++) {

                if(nextRow === 0 && nextCol === 0) continue;

                let opposite = false;
                let row = move.row + nextRow;
                let col = move.col + nextCol;

                while(row >= 0 && row < 8 && col >= 0 && col < 8) {

                    if(this._board[row][col] === null) break;
                    if(this._board[row][col] === this._player) {
                        if(opposite) return true;
                        break;
                    }

                    opposite = true;
                    row += nextRow;
                    col += nextCol;

                }

            }
        }

        return false;

    }

    validMovies() : Move[] {

        const movies : Move[] = []

        for(let row = 0; row < 8; row++) {
            for(let col = 0; col < 8; col++) {
                if(this.isValidMove({ row, col })) {
                    movies.push({ row, col });
                }
            }
        }

        return movies;

    }

}