import { Component } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';

/**
 * Component responsible for displaying toast notifications.
 * 
 * It listens to the ToastService and renders each toast message as a floating element
 * in the UI. Toasts are automatically dismissed after a timeout handled by the service.
 */
@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container">
      <div class="toast" *ngFor="let toast of toastService.toasts">
        {{ toast }}
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ToastComponent {
  /**
   * Injects the ToastService to access and render active toasts.
   * 
   * @param toastService - Service that manages toast messages.
   */
  constructor(public toastService: ToastService) {}
}
