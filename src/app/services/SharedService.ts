import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryDTO } from '../dto/CategoryDTO';
import { EventDTO } from '../dto/EventDTO';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private events: Map<number, EventDTO> = new Map();
  private categories: Map<string, CategoryDTO> = new Map();

  private nextEventId: number = 3;

  // BehaviorSubjects do emisji aktualnych danych
  // BehaviorSubject w SharedService umożliwia emitowanie aktualnych danych (wydarzenia i kategorie) do subskrybentów.
  private eventsSubject: BehaviorSubject<EventDTO[]> = new BehaviorSubject<EventDTO[]>([]);
  private categoriesSubject: BehaviorSubject<CategoryDTO[]> = new BehaviorSubject<CategoryDTO[]>([]);

  constructor() {
    const exampleEvent: EventDTO = {
      id: 1,
      category_name: 'Wydarzenia Firmowe',
      title: 'Przykładowe wydarzenie',
      start_date: '2024-12-01',
      end_date: '2024-12-02',
      description: 'Opis przykładowego wydarzenia',
      image: 'https://us-wd.gr-cdn.com/help/sites/9/2022/07/1649/CleanShot202022-07-0720at2018.48.54-1024x621.jpeg',
      color: '#FF5733'
    };
    const exampleEvent2: EventDTO = {
      id: 2,
      category_name: 'Wydarzenia Sportowe',
      title: 'Turniej gwiazd',
      start_date: '2024-10-09',
      end_date: '2024-10-12',
      description: 'Opis przykładowego wydarzenia',
      image: 'https://edukacja.gliwice.eu/sites/default/files/event/images/plakat_balu_2023.jpg',
      color: '#FF0323'
    };

    const exampleCategory: CategoryDTO = {
      name: 'Wydarzenia Firmowe',
      iconName: 'home',
      color: '#FF5733'
    };

    const exampleCategory2: CategoryDTO = {
      name: 'Wydarzenia Sportowe',
      iconName: 'sport',
      color: '#0000FF'
    };

    this.events.set(exampleEvent.id, exampleEvent);
    this.events.set(exampleEvent2.id, exampleEvent2);
    this.categories.set(exampleCategory.name, exampleCategory);
    this.categories.set(exampleCategory2.name, exampleCategory2);
    console.log("Wydarzenia", this.events);
    // Emitowanie początkowych danych
    this.eventsSubject.next(Array.from(this.events.values()));
    this.categoriesSubject.next(Array.from(this.categories.values()));
  }

  // Zarządzanie wydarzeniami
  addEvent(event: EventDTO): void {
    event.id = this.nextEventId++;
    this.events.set(event.id, event);
    this.eventsSubject.next(Array.from(this.events.values())); // Emitowanie nowej listy wydarzeń
  }

  editEvent(updatedEvent: EventDTO): void {
    if (this.events.has(updatedEvent.id)) {
      this.events.set(updatedEvent.id, updatedEvent);
      this.eventsSubject.next(Array.from(this.events.values())); // Emitowanie zaktualizowanej listy wydarzeń
    } else {
      console.error(`Wydarzenie o ID ${updatedEvent.id} nie istnieje.`);
    }
  }

  deleteEvent(id: number): void {
    if (this.events.has(id)) {
      this.events.delete(id);
      this.eventsSubject.next(Array.from(this.events.values())); // Emitowanie zaktualizowanej listy wydarzeń
    }
  }

  // Zarządzanie kategoriami
  addCategory(category: CategoryDTO): void {
    if (!this.categories.has(category.name)) {
      this.categories.set(category.name, category);
      this.categoriesSubject.next(Array.from(this.categories.values())); // Emitowanie nowej listy kategorii
    } else {
      console.error(`Kategoria o nazwie "${category.name}" już istnieje.`);
    }
  }

  updateCategory(name: string, updatedCategory: CategoryDTO): void {
    if (this.categories.has(name)) {
      this.categories.set(name, updatedCategory);
      this.categoriesSubject.next(Array.from(this.categories.values())); // Emitowanie zaktualizowanej listy kategorii
    }
  }

  deleteCategory(name: string): void {
    if (this.categories.has(name)) {
      this.categories.delete(name);
      this.categoriesSubject.next(Array.from(this.categories.values())); // Emitowanie zaktualizowanej listy kategorii
    }
  }

  // Metody dostępowe
  getEventById(id: number): EventDTO | undefined {
    return this.events.get(id);
  }

  getAllEvents() {
    return this.eventsSubject.asObservable(); // Zwracamy Observable, który będzie emitować aktualną listę wydarzeń
  }

  getAllCategories() {
    return this.categoriesSubject.asObservable(); // Zwracamy Observable, który będzie emitować aktualną listę kategorii
  }
}
