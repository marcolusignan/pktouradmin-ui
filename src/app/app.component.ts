import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { ToastComponent } from './component/toast/toast.component';

/**
 * Root component of the Poker Tournament Administration UI.
 *
 * It includes routing support, the player management UI, and toast notifications.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PlayerComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /**
   * Title of the application (used optionally in the template or browser tab).
   */
  title = 'pktouradmin-ui';
}
