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

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    // Ładowanie wszystkich wydarzeń
    this.sharedService.getAllEvents().subscribe(events => {
      this.events = events;  // Przypisujemy dane z Observable do tablicy
      this.events.forEach(event => {
        this.eventOpenState.set(event.id, false);  // Domyślnie ustawiamy "false" dla każdego wydarzenia
      });
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

  // Pobieranie kategorii na podstawie nazwy
  // getCategoryNameById(categoryName: string): string {
  //   const category = this.categories.get(categoryName);
  //   return category ? category.name : 'Brak kategorii';
  // }

  // Sprawdzenie, czy wydarzenie jest rozwinięte
  isEventOpen(event: EventDTO): boolean {
    return this.eventOpenState.get(event.id) ?? false;  // Zwraca stan dla danego wydarzenia
  }
}
