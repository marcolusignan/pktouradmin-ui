import { Injectable } from '@angular/core';

/**
 * A simple toast service for displaying temporary notifications.
 *
 * This service maintains a queue of toast messages and automatically
 * removes each toast after a specified duration.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  /**
   * Queue of active toast messages to be displayed.
   */
  toasts: string[] = [];

  /**
   * Displays a toast message.
   *
   * @param message - The message to show in the toast.
   * @param duration - How long (in milliseconds) the toast should be visible. Default is 3000 ms.
   */
  show(message: string, duration = 3000): void {
    this.toasts.push(message);
    setTimeout(() => this.toasts.shift(), duration);
  }
}
