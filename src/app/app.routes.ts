import { Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import {EventFormComponent} from './event-form/event-form.component';
import {EventTableComponent} from './events-table/events-table.component';
import {CategoryComponent} from './category/category.component';

export const routes: Routes = [
  { path: '', component: TimelineComponent }, // Trasa do komponentu timeline
  { path: 'events-table', component: EventTableComponent },
  { path: '', component: CategoryComponent },
  { path: '**', redirectTo: '' },
];
