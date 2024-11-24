import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import {EventFormComponent} from './event-form/event-form.component';
import {EventTableComponent} from './events-table/events-table.component';
import {CategoryComponent} from './category/category.component';
import { NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Trasa do komponentu timeline
  { path: 'events-table', component: EventTableComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
