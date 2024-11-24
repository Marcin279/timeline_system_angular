import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventDTO } from '../dto/EventDTO';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private selectedEventSubject = new BehaviorSubject<EventDTO | null>(null);
  selectedEvent$ = this.selectedEventSubject.asObservable();

  constructor() {}

  // Funkcja do ustawienia wydarzenia do edycji
  setSelectedEvent(event: EventDTO): void {
    this.selectedEventSubject.next(event);
  }

  // Funkcja do zresetowania wydarzenia
  clearSelectedEvent(): void {
    this.selectedEventSubject.next(null);
  }
}
