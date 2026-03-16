import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Suspect } from '../../core/interface/suspect.interface';
import { CommonModule } from '@angular/common';
import { SuspectCallLogs } from '../../core/interface/suspects-call-log.interface';

@Component({
  selector: 'app-view-call-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-call-logs.html',
  styleUrl: './view-call-logs.scss',
})
export class ViewCallLogs {

  @Input() callLogs?: SuspectCallLogs;
  @Input() suspects?: Suspect;
  @Input() searchDate?: string;
  @Input() searchTime?: string;

  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) return `${remainingSeconds}s`;

    return `${minutes}m ${remainingSeconds.toString().padStart(2, '0')}s`;
  }

  filteredCallLogs() {
  if (!this.callLogs?.callLogs) return [];

  if (!this.searchDate || !this.searchTime) return this.callLogs.callLogs;

  const searchTimestamp = new Date(`${this.searchDate}T${this.searchTime}`).getTime();

  return this.callLogs.callLogs.filter((call) => {
    const callTime = new Date(call.timestamp).getTime();
    return callTime <= searchTimestamp;
  });
}
}