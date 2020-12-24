import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  game: any[];
  xIsNext: boolean;
  winner: string;
  xScore: number;
  oScore: number;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
    this.xScore = 0;
    this.oScore = 0;
  }

  newGame() {
    this.game = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = null;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(i) {
      if(!this.game[i] && !this.winner) {
        this.game.splice(i, 1, this.player);
        this.xIsNext = !this.xIsNext;
      }

      if(!this.winner) {
        this.winner = this.calculateWinner();
        if(this.winner === 'X') {
          this.xScore++;
        }else if(this.winner === 'O') {
          this.oScore++;
        }
      }
  }

  calculateWinner() {
    const board = [
      [0, 1, 2], // row
      [3, 4, 5], // row
      [6, 7, 8], // row
      [0, 3, 6], // col
      [1, 4, 7], // col
      [2, 5, 8], // col
      [0, 4, 8], // diagonal
      [2, 4, 6]  // diagonal
    ];

    for(let i = 0; i < board.length; i++) {
      const [a, b, c] = board[i];
      
      if(this.game[a] && this.game[a] === this.game[b] && this.game[a] === this.game[c]) {
        return this.game[a];
      }
    }

    return null;
  }

}
