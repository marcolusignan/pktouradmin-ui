import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Player } from './player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  /**
   * Angular HttpClient for making HTTP requests.
   */
  private http = inject(HttpClient);

  /**
   * Base URL for the players API.
   */
  private baseUrl: string = `${environment.API_URL}/players`;

  /**
   * HTTP headers including Basic Authorization.
   */
  private authHeader = new HttpHeaders({
    Authorization: `Basic ${btoa(
      `${environment.API_LOGIN}:${environment.API_PASSWORD}`
    )}`,
  });

  /**
   * Sends a POST request to create a new player.
   * 
   * @param name - The name of the player to add.
   * @returns An Observable of the full HTTP response (status, headers, body).
   */
  postPlayer(name: string): Observable<HttpResponse<void>> {
    return this.http.post<void>(
      this.baseUrl,
      { name },
      {
        headers: this.authHeader,
        observe: 'response',
      }
    );
  }

  /**
   * Fetches the list of players ordered by rank or score.
   * 
   * @returns An Observable of the full HTTP response containing a list of players.
   */
  getOrderedPlayers(): Observable<HttpResponse<Player[]>> {
    return this.http.get<Player[]>(this.baseUrl, {
      headers: this.authHeader,
      observe: 'response',
    });
  }

  /**
   * Clears the tournament by deleting all players.
   * 
   * @returns An Observable of the full HTTP response after deletion.
   */
  clearTournament(): Observable<HttpResponse<void>> {
    return this.http.delete<void>(this.baseUrl, {
      headers: this.authHeader,
      observe: 'response',
    });
  }

  /**
   * Sends a PUT request to update an existing player's  scpre.
   * 
   * @param id - The unique identifier of the player to update.
   * @param score - The new score.
   * @returns An Observable of the full HTTP response (status, headers, body).
   */
  updateScore(id: string, score: number): Observable<HttpResponse<void>> {
    return this.http.put<void>(
      this.baseUrl,
      { id, score },
      {
        headers: this.authHeader,
        observe: 'response',
      }
    );
  }
}
