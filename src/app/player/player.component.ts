import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

interface Player {
  name: string;
  score: number;
  rank: number;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class PlayerComponent {
  playerForm: FormGroup;
  players: Player[] = [];

  // We'll store score inputs keyed by player index
  scoreInputs: { [key: number]: number } = {};

  constructor(private fb: FormBuilder) {
    this.playerForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  addPlayer(): void {
    if (this.playerForm.valid) {
      const name = this.playerForm.value.name;
      const newPlayer: Player = {
        name,
        score: 0,
        rank: this.players.length + 1,
      };
      this.players.push(newPlayer);
      this.playerForm.reset();
    }
  }

  deleteAll(): void {
    this.players = [];
    this.scoreInputs = {};
  }

  updateScore(index: number): void {
    const inputScore = this.scoreInputs[index];
    if (inputScore !== undefined && !isNaN(inputScore)) {
      this.players[index].score = inputScore;
      // Optionally reset input:
      // this.scoreInputs[index] = null;
    }
  }
}
