import { Injectable } from '@angular/core';
import { CategoryDTO } from '../dto/CategoryDTO';
import { EventDTO } from '../dto/EventDTO';

@Injectable({
  providedIn: 'root' // Serwis będzie singletonem w całej aplikacji
})
export class SharedService {
  private events: Map<number, EventDTO> = new Map(); // Zmieniamy na Map z kluczem number (id)
  private categories: Map<string, CategoryDTO> = new Map(); // Zmieniamy na Map z kluczem string (nazwa kategorii)

  private nextEventId: number = 1; // Inicjalizujemy id dla pierwszego wydarzenia

  constructor() {
    // Przykładowe wydarzenie
    const exampleEvent: EventDTO = {
      id: 1,  // ID = 1
      category_name: 'Wydarzenia Firmowe',  // Nazwa kategorii
      title: 'Przykładowe wydarzenie',  // Tytuł wydarzenia
      start_date: new Date('2024-12-01T10:00:00'),  // Data rozpoczęcia
      end_date: new Date('2024-12-01T12:00:00'),  // Data zakończenia
      description: 'Opis przykładowego wydarzenia',  // Opis wydarzenia
      image: 'https://example.com/image.jpg',  // Adres URL do obrazu
      color: '#FF5733'  // Kolor (np. w formacie hex)
    };

    const exampleCategory: CategoryDTO = {
      name: 'Wydarzenia Firmowe',  // Nazwa kategorii
      iconName: 'home',  // Nazwa ikony
      color: '#FF5733'  // Kolor (np. w formacie hex)
    };

    // Dodajemy przykładowe wydarzenie do mapy
    this.events.set(exampleEvent.id, exampleEvent);
    this.categories.set(exampleCategory.name, exampleCategory);
  }

  // Zarządzanie wydarzeniami
  addEvent(event: EventDTO): void {
    event.id = this.nextEventId++; // Przypisanie unikalnego id i inkrementacja
    this.events.set(event.id, event); // Używamy metody set() do dodania elementu
  }

  editEvent(updatedEvent: EventDTO): void {
    // Sprawdzamy, czy wydarzenie z danym ID istnieje
    if (this.events.has(updatedEvent.id)) {
      this.events.set(updatedEvent.id, updatedEvent); // Zaktualizowanie wydarzenia
    } else {
      console.error(`Wydarzenie o ID ${updatedEvent.id} nie istnieje.`);
    }
  }

  deleteEvent(id: number): void {
    if (this.events.has(id)) {
      this.events.delete(id); // Usunięcie elementu z mapy za pomocą delete()
    }
  }

  getEventById(id: number): EventDTO | undefined {
    return this.events.get(id); // Zwracamy element po ID
  }

  getAllEvents(): EventDTO[] {
    return Array.from(this.events.values()); // Zwracamy wszystkie wartości (wszystkie wydarzenia)
  }

  // Zarządzanie kategoriami
  addCategory(category: CategoryDTO): void {
    if (!this.categories.has(category.name)) {
      this.categories.set(category.name, category); // Używamy nazwy kategorii jako klucza
    } else {
      console.error(`Kategoria o nazwie "${category.name}" już istnieje.`); // Informacja o duplikacie
    }
  }

  updateCategory(name: string, updatedCategory: CategoryDTO): void {
    if (this.categories.has(name)) {
      this.categories.set(name, updatedCategory); // Zaktualizowanie kategorii na podstawie nazwy
    }
  }

  deleteCategory(name: string): void {
    if (this.categories.has(name)) {
      this.categories.delete(name); // Usunięcie kategorii z mapy na podstawie nazwy
    }
  }

  getCategoryByName(name: string): CategoryDTO | undefined {
    return this.categories.get(name); // Zwracamy kategorię po nazwie
  }

  getAllCategories(): CategoryDTO[] {
    return Array.from(this.categories.values()); // Zwracamy wszystkie wartości (wszystkie kategorie)
  }
}
