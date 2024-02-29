/**
 * Othello
 * @author Guilherme Neves
 */

export type Player = 'black' | 'white';
export type Cell = Player | 'empty';
export type Board = Cell[][];

export type Status = Record<Cell, number>;
export type GameEnd = null;

export type Position = Record<'row' | 'col', number>;
export type NextMove = {
    player : Player;
    moves : Position[];
} | GameEnd;

export type History = {
    player : Player;
    board : Board;
};

export default class Othello {

    private _player : Player;
    private _moves : Position[];
    private _board : Board;

    private _histories : History[];

    constructor() {

        this._player = 'black';
        this._moves = [];
        this._board = [];

        this._histories = [];

        for(let row = 0; row < 8; row++) {

            this._board.push([]);

            for(let col = 0; col < 8; col++) {

                this._board[row].push('empty');

                if((row === 3 || row === 4) && (col === 3 || col === 4)) {
                    this._board[row][col] = row === col ? 'white' : 'black';
                }
                
            }
        }

    }

    getPlayer() : Player {
        return this._player;
    }

    getMoves() : Position[] {
        return this._moves;
    }

    getBoard() : Board {
        return this._board;
    }

    getGameString() : string {
        
        let game : string = '';

        this._moves.forEach(({ row, col }) => {
            game += ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][col] + (row + 1) + '-';
        });

        return game.replace(/-$/, '');

    }

    getMovesByString(gameString : string) : Position[] {

        gameString = gameString.toLowerCase().trim();
        if(gameString === '') return [];

        if(!/^([a-h][1-8]-)*([a-h][1-8])$/.test(gameString)) {
            throw Error('Game String incorrect format');
        }

        let moves : Position[] = [];

        gameString.split('-').forEach(move => {
            moves.push({
                row: parseInt(move.charAt(1)) - 1,
                col: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].findIndex(v => v === move.charAt(0))
            })
        });

        return moves;

    }

    getStatus() : Status {
        const status : Status = { black: 0, white: 0, empty: 0 };
        this._board.forEach(row => row.forEach(cell => status[cell]++))
        return status;
    }

    getNextMove() : NextMove {
        return {
            player: this._player,
            moves: this.validMoves()
        }
    }

    isReturnable() : boolean {
        return this._histories.length > 0;
    }

    isFull() : boolean {
        return this._board.every(row => row.every(cell => cell !== 'empty'));
    }

    isValidMove(position : Position) : boolean {

        if(this._board[position.row][position.col] !== 'empty') return false;

        for(let nextRow = -1; nextRow <= 1; nextRow++) {
            for(let nextCol = -1; nextCol <= 1; nextCol++) {

                if(nextRow === 0 && nextCol === 0) continue;

                let opposite = false;
                let row = position.row + nextRow;
                let col = position.col + nextCol;

                while(row >= 0 && row < 8 && col >= 0 && col < 8) {

                    if(this._board[row][col] === 'empty') break;
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

    validMoves() : Position[] {

        const moves : Position[] = []

        for(let row = 0; row < 8; row++) {
            for(let col = 0; col < 8; col++) {
                if(this.isValidMove({ row, col })) {
                    moves.push({ row, col });
                }
            }
        }

        return moves;

    }

    makeMove(position : Position) : NextMove {

        if(!this.isValidMove(position)) {
            throw Error('Move is not valid');
        }

        this._histories.push({
            player: this._player,
            board: structuredClone(this._board)
        });

        this._moves.push(position);

        this._board[position.row][position.col] = this._player;

        for(let nextRow = -1; nextRow <= 1; nextRow++) {
            for(let nextCol = -1; nextCol <= 1; nextCol++) {

                if(nextRow === 0 && nextCol === 0) continue;

                const flip : Position[] = [];

                let opposite = false;
                let row = position.row + nextRow;
                let col = position.col + nextCol;

                while(row >= 0 && row < 8 && col >= 0 && col < 8) {

                    if(this._board[row][col] === 'empty') break;

                    if(this._board[row][col] === this._player) {
                        if(opposite) flip.forEach(({ row, col }) => this._board[row][col] = this._player);
                        break;
                    }

                    flip.push({ row, col });
                    opposite = true;
                    row += nextRow;
                    col += nextCol;

                }

            }

        }

        this._player = this._player === 'black' ? 'white' : 'black';
        let moves : Position[] = this.validMoves();

        if(moves.length === 0) {
            this._player = this._player === 'black' ? 'white' : 'black';
            moves = this.validMoves();
        }

        if(moves.length === 0) return null;

        return {
            player: this._player,
            moves
        };

    }

    backMove() : NextMove {

        const history : History | null = this._histories.at(-1) ?? null;
        console.log(history);

        if(history !== null) {

            this._board = history.board;
            this._player = history.player;

            this._histories.pop();

        }

        return this.getNextMove();

    }

}