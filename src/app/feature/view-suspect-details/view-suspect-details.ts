import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Suspect } from '../../core/interface/suspect.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-suspect-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-suspect-details.html',
  styleUrl: './view-suspect-details.scss',
})
export class ViewSuspectDetails {
  @Input() suspect?: Suspect;
  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }
}
