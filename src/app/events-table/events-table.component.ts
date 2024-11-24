import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importujemy CommonModule
import { SharedService} from '../services/SharedService';
import { EventDTO } from '../dto/EventDTO';
import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-event-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe]
})

export class EventTableComponent implements OnInit {
  events: EventDTO[] = [];
  newEvent: EventDTO = {
    id: 0,
    category_name: '',
    title: '',
    start_date: '',
    end_date: '',
    description: '',
    image: '',
    color: '',
  };
  constructor(private sharedService: SharedService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.sharedService.getAllEvents().subscribe((events) => {
      this.events = events;
      console.log('Zaktualizowane wydarzenia:', this.events);
    });
  }

  formatDate(date: string): string {
    // Jeśli data jest już w formacie yyyy-MM-dd, zwróć ją bez zmian
    if (!date) return '';

    const parsedDate = new Date(date);

    // Formatowanie na yyyy-MM-dd
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Miesiące zaczynają się od 0
    const day = parsedDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  editEvent(event: EventDTO): void {
    console.log('Edytowanie wydarzenia:', event);
    this.sharedService.editEvent(event);
  }

  deleteEvent(id: number): void {
    this.sharedService.deleteEvent(id);
    console.log('Wydarzenie usunięte:', id);
  }

  addEvent(event: EventDTO): void {
    console.log('Dodawanie nowego wydarzenia:', event);
    this.sharedService.addEvent(event);
    console.log('Wydarzenie dodane:', event);
  }
}
