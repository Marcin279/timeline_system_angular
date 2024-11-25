import { Component, OnInit } from '@angular/core';
import { SharedService} from '../services/SharedService';
import { EventDTO } from '../dto/EventDTO';
import { CategoryDTO } from '../dto/CategoryDTO';
import {CommonModule} from '@angular/common';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TimelineComponent implements OnInit {

  events: EventDTO[] = [];  // Zmieniamy na tablicę wydarzeń
  // categories: Map<string, CategoryDTO> = new Map();  // Mapujemy kategorie po nazwach
  categories: CategoryDTO[] = [];
  eventOpenState: Map<number, boolean> = new Map();  // Mapa przechowująca stan otwarcia każdego wydarzenia
  EventsForTimeline: EventDTO[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    // Ładowanie wszystkich wydarzeń
    this.sharedService.getAllEvents().subscribe(events => {
      this.events = events;  // Przypisujemy dane z Observable do tablicy
      this.EventsForTimeline = [...events];
      this.events.forEach(event => {
        this.eventOpenState.set(event.id, false);  // Domyślnie ustawiamy "false" dla każdego wydarzenia
      });
      this.sortEventsByStartDate();
    });

    // Ładowanie wszystkich kategorii
    this.loadCategories();
  }


  loadCategories(): void {
    this.sharedService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log('Zaktualizowane kategorie:', this.categories);
    });
  }
  // Funkcja do toggle'owania stanu otwartego wydarzenia
  toggleEvent(event: EventDTO): void {
    const currentState = this.eventOpenState.get(event.id);
    this.eventOpenState.set(event.id, !currentState);  // Zmieniamy stan
  }

  // Funkcja do pobierania koloru
  getCategoryColor(categoryName: string): string {
    const category = this.categories.find(
      (cat) => cat.name === categoryName
    );
    return category ? category.color : '#000000'; // Domyślny kolor, jeśli nie znaleziono
  }

  // Funkcja do sortowania wydarzeń po dacie rozpoczęcia (od najstarszego)
  sortEventsByStartDate(): void {
    this.EventsForTimeline.sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);

      // Porównanie dat w porządku rosnącym (od najstarszego do najnowszego)
      if (dateA < dateB) {
        return -1;  // Jeśli dataA jest wcześniejsza, a więc ma być wyświetlona pierwsza
      }
      if (dateA > dateB) {
        return 1;  // Jeśli dataA jest późniejsza, a więc ma być wyświetlona później
      }
      return 0;  // Jeśli daty są równe, nie zmieniamy kolejności
    });
  }

  // Sprawdzenie, czy wydarzenie jest rozwinięte
  isEventOpen(event: EventDTO): boolean {
    return this.eventOpenState.get(event.id) ?? false;  // Zwraca stan dla danego wydarzenia
  }
}
