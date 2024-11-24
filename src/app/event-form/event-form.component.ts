import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/SharedService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventDTO } from '../dto/EventDTO';
import { CategoryDTO } from '../dto/CategoryDTO';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {
  newEvent: EventDTO = {
    id: 0,
    category_name: '',
    title: '',
    start_date: '',
    end_date: '',
    description: '',
    image: '',
    color: '#000000', // Domyślny kolor
  };

  categories: CategoryDTO[] = []; // Lista dostępnych kategorii

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.newEvent.start_date = this.formatDate(this.newEvent.start_date);
    this.newEvent.end_date = this.formatDate(this.newEvent.end_date);
    this.loadCategories(); // Ładujemy listę kategorii przy inicjalizacji
  }

  // Pobierz listę kategorii z serwisu
  loadCategories(): void {
    this.sharedService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log('Zaktualizowane kategorie:', this.categories);
    });
  }

  // Metoda dodająca nowe wydarzenie
  addEvent(): void {
    if (
      this.newEvent.title &&
      this.newEvent.category_name &&
      this.newEvent.start_date &&
      this.newEvent.end_date &&
      this.newEvent.description
    ) {
      this.sharedService.addEvent(this.newEvent); // Wywołanie metody z SharedService
      console.log('Wydarzenie zostało dodane:', this.newEvent);
      this.resetForm(); // Czyszczenie formularza
    }
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


  // Resetowanie formularza po dodaniu wydarzenia
  resetForm(): void {
    this.newEvent = {
      id: 0,
      category_name: '',
      title: '',
      start_date: '',
      end_date: '',
      description: '',
      image: '',
      color: '#000000',
    };
  }
}
