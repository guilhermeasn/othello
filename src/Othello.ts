
export type Player = 'black' | 'white';
export type Cell = Player | null;
export type Board = Cell[][];
export type Move = Record<'row' | 'col', number>;

export default class Othello {

    private current : Player;
    private board : Board;

    constructor() {

        this.current = 'black';
        this.board = [];

        for(let row = 0; row < 8; row++) {

            this.board.push([]);

            for(let col = 0; col < 8; col++) {

                this.board[row].push(null);

                if((row === 3 || row === 4) && (col === 3 || col === 4)) {
                    this.board[row][col] = row === col ? 'white' : 'black';
                }
                
            }
        }

    }

    isValidMove(move : Move) : boolean {

        if(this.board[move.row][move.col] !== null) return false;

        for(let nextRow = -1; nextRow <= 1; nextRow++) {
            for(let nextCol = -1; nextCol <= 1; nextCol++) {

                if(nextRow === 0 && nextCol === 0) continue;

                let opposite = false;
                let row = move.row + nextRow;
                let col = move.col + nextCol;

                while(row >= 0 && row < 8 && col >= 0 && col < 8) {

                    if(this.board[row][col] === null) break;
                    if(this.board[row][col] === this.current) {
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