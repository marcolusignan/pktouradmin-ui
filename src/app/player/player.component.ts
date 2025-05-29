import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Player } from './player';
import { PlayerService } from './player.service';
import { ToastService } from '../component/toast/toast.service';

/**
 * Component for managing poker tournament players.
 *
 * Handles player creation, score updates, deletion, and retrieval
 * using reactive forms and service calls. Displays toast messages
 * for success or error feedback.
 */
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class PlayerComponent {
  /** Service for performing player-related HTTP requests */
  playerService = inject(PlayerService);

  /** Service to display toast messages */
  toastService = inject(ToastService);

  /** Reactive form group for player input */
  playerForm: FormGroup;

  /** List of players retrieved from the server */
  players: Player[] = [];

  /** Whether a request is currently loading (used for showing loader) */
  isLoading = false;

  /** Stores user input scores keyed by player index */
  scoreInputs: { [key: number]: number } = {};

  /**
   * Constructor initializes the form and triggers initial data load.
   *
   * @param fb - Angular FormBuilder service to create form controls
   */
  constructor(private fb: FormBuilder) {
    this.playerForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.reloadPlayers();
  }

  /**
   * Loads the list of players from the backend and updates the UI.
   * Displays an error toast if the request fails.
   */
  reloadPlayers(): void {
    this.isLoading = true;
    this.playerService.getOrderedPlayers().subscribe({
      next: (response) => {
        this.players = response.body || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.show(`Error : ${err.error.message}`);
        this.isLoading = false;
      },
    });
  }

  /**
   * Submits the player form to add a new player.
   * Resets the form after a successful submission.
   * Displays an error toast on failure.
   */
  addPlayer(): void {
    if (this.playerForm.valid) {
      const name = this.playerForm.value.name;
      this.playerService.postPlayer(name).subscribe({
        next: (_) => this.reloadPlayers(),
        error: (err) => this.toastService.show(`Error : ${err.error.message}`),
      });

      this.playerForm.reset();
    }
  }

  /**
   * Deletes all players from the tournament.
   * Also clears the score input state.
   * Displays an error toast on failure.
   */
  deleteAll(): void {
    this.playerService.clearTournament().subscribe({
      next: (_) => {
        this.reloadPlayers();
        this.scoreInputs = {};
      },
      error: (err) => {
        this.toastService.show(`Error : ${err.error.message}`);
      },
    });
  }

  /**
   * Sends an updated score for the specified player.
   * If successful, reloads the list and resets inputs.
   * Displays an error toast on failure.
   *
   * @param index - Index of the player in the players list
   */
  updateScore(index: number): void {
    const inputScore = this.scoreInputs[index];

    if (inputScore !== undefined && !isNaN(inputScore)) {
      this.playerService
        .updateScore(this.players[index].id, inputScore)
        .subscribe({
          next: (_) => {
            this.reloadPlayers();
            this.scoreInputs = {};
            this.playerForm.reset();
          },
          error: (err) =>
            this.toastService.show(`Error : ${err.error.message}`),
        });
    }
  }
}
