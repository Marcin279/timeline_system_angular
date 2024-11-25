import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/SharedService';
import { CategoryDTO } from '../dto/CategoryDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CategoryComponent implements OnInit {
  categories: CategoryDTO[] = [];
  newCategory: CategoryDTO = { name: '', iconName: '', color: '' };
  editCategory: CategoryDTO | null = null;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.sharedService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  addCategory(): void {
    if (this.newCategory.name && this.newCategory.iconName && this.newCategory.color) {
      const categoryToAdd: CategoryDTO = {
        name: this.newCategory.name,
        iconName: this.newCategory.iconName,
        color: this.newCategory.color,
      };

      this.sharedService.addCategory(categoryToAdd);
      this.saveCategoriesToLocalStorage();

      this.newCategory = { name: '', iconName: '', color: '' };
      this.loadCategories();
    }
  }

  // Edytujemy kategorię
  editCategoryData(category: CategoryDTO): void {
    this.editCategory = { ...category };
  }

  // Zatwierdzamy edycję
  saveEditedCategory(): void {
    if (this.editCategory) {
      this.sharedService.updateCategory(this.editCategory.name, this.editCategory);
      this.editCategory = null;
      this.loadCategories();
    }
  }

  // Usuwamy kategorię
  deleteCategory(name: string): void {
    this.sharedService.deleteCategory(name);
    this.loadCategories();
  }

  // Anulowanie edycji
  cancelEdit(): void {
    this.editCategory = null; // Resetujemy edycję
  }

  private saveCategoriesToLocalStorage(): void {
    const storedCategories = localStorage.getItem('categories');
    let categoriesArray: CategoryDTO[] = [];

    if (storedCategories) {
      categoriesArray = JSON.parse(storedCategories);
    }

    categoriesArray.push(...this.categories);

    localStorage.setItem('categories', JSON.stringify(categoriesArray));
  }

}
