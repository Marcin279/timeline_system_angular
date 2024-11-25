import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/SharedService';
import { CategoryDTO } from '../dto/CategoryDTO';
import { CommonModule } from '@angular/common';  // Importujemy CommonModule
import { FormsModule } from '@angular/forms';  // Zaimportuj FormsModule

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CategoryComponent implements OnInit {
  categories: CategoryDTO[] = [];
  newCategory: CategoryDTO = { name: '', iconName: '', color: '' }; // Obiekt do tworzenia nowych kategorii
  editCategory: CategoryDTO | null = null; // Obiekt do edytowania wybranej kategorii

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Ładujemy wszystkie kategorie
  loadCategories(): void {
    this.sharedService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log('Zaktualizowane kategorie:', this.categories);
    });
  }

  // Tworzymy nową kategorię
  addCategory(): void {
    if (this.newCategory.name && this.newCategory.iconName && this.newCategory.color) {
      const categoryToAdd: CategoryDTO = {
        name: this.newCategory.name,
        iconName: this.newCategory.iconName,
        color: this.newCategory.color,
      };

      this.sharedService.addCategory(categoryToAdd); // Dodajemy kategorię
      this.saveCategoriesToLocalStorage();

      this.newCategory = { name: '', iconName: '', color: '' }; // Resetujemy formularz
      this.loadCategories(); // Załaduj kategorie, aby odświeżyć widok
    }
  }

  // Edytujemy kategorię
  editCategoryData(category: CategoryDTO): void {
    this.editCategory = { ...category }; // Robimy kopię wybranej kategorii do edycji
  }

  // Zatwierdzamy edycję
  saveEditedCategory(): void {
    if (this.editCategory) {
      this.sharedService.updateCategory(this.editCategory.name, this.editCategory);
      this.editCategory = null; // Resetujemy edycję po zapisaniu
      this.loadCategories(); // Przeładuj listę kategorii
    }
  }

  // Usuwamy kategorię
  deleteCategory(name: string): void {
    this.sharedService.deleteCategory(name);
    console.log('Kategoria usunięta:', name);
    this.loadCategories(); // Przeładuj listę kategorii po usunięciu
  }

  // Anulowanie edycji
  cancelEdit(): void {
    this.editCategory = null; // Resetujemy edycję
  }

  private saveCategoriesToLocalStorage(): void {
    // Sprawdzamy, czy są już zapisane kategorie w localStorage
    const storedCategories = localStorage.getItem('categories');
    let categoriesArray: CategoryDTO[] = [];

    if (storedCategories) {
      // Jeśli kategorie już są zapisane, parsujemy je
      categoriesArray = JSON.parse(storedCategories);
    }

    // Dodajemy nową kategorię do listy
    categoriesArray.push(...this.categories);

    // Zapisujemy zaktualizowaną listę kategorii w localStorage
    localStorage.setItem('categories', JSON.stringify(categoriesArray));
  }

}
