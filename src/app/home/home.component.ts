import { Component } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { CategoryComponent } from '../category/category.component';
import { EventTableComponent } from '../events-table/events-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    EventFormComponent,
    TimelineComponent,
    CategoryComponent,
    EventTableComponent,
  ],
})
export class HomeComponent {}
