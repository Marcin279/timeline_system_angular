import { Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import {EventFormComponent} from './event-form/event-form.component';
import {EventsTableComponent} from './events-table/events-table.component';

export const routes: Routes = [
  { path: 'timeline', component: TimelineComponent }, // Trasa do komponentu timeline
];
