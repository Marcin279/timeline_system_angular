import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importujemy CommonModule
import { SharedService} from '../services/SharedService';
import { EventDTO } from '../dto/EventDTO';

@Component({
  selector: 'app-event-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css'],
  standalone: true,
  imports: [CommonModule],
})

export class EventTableComponent implements OnInit {
  events: EventDTO[] = [];
  constructor(private sessionService: SharedService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.events = this.sessionService.getAllEvents();
  }

  editEvent(event: EventDTO): void {
    console.log('Edytowanie wydarzenia:', event);
    this.sessionService.editEvent(event);
  }

  deleteEvent(id: number): void {
    this.sessionService.deleteEvent(id);
    console.log('Wydarzenie usunięte:', id);
  }

  addEvent(event: EventDTO): void {
    this.sessionService.addEvent(event);
    console.log('Wydarzenie dodane:', event);
  }
}
