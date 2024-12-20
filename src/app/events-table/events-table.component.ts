import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService} from '../services/SharedService';
import { EventDTO } from '../dto/EventDTO';
import { DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe]
})

export class EventTableComponent implements OnInit {
  events: EventDTO[] = [];
  editMode: boolean = false;
  eventToEdit: EventDTO | null = null;
  sortField: string = '';
  sortDirection: { [key: string]: boolean } = {};

  constructor(private sharedService: SharedService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.sharedService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  formatDate(date: string): string {
    if (!date) return '';

    const parsedDate = new Date(date);

    // Formatowanie na yyyy-MM-dd
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = parsedDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  startEdit(event: EventDTO): void {
    this.editMode = true;
    this.eventToEdit = { ...event };
  }

  saveChanges(): void {
    if (this.eventToEdit) {
      this.sharedService.editEvent(this.eventToEdit);
      this.editMode = false;
      this.eventToEdit = null;
      this.loadEvents();
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.eventToEdit = null;
  }

  deleteEvent(id: number): void {
    this.sharedService.deleteEvent(id);
  }

  sortEvents(field: keyof EventDTO): void {
    this.sortDirection[field] = !this.sortDirection[field];

    this.events.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (valA < valB) return this.sortDirection[field] ? -1 : 1;
      if (valA > valB) return this.sortDirection[field] ? 1 : -1;
      return 0;
    });
  }
}
