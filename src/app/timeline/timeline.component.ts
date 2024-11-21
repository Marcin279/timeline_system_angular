import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importujemy CommonModule

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  standalone: true,  // Określamy, że komponent jest samodzielny
  imports: [CommonModule]  // Używamy CommonModule w tym komponencie
})
export class TimelineComponent implements OnInit {

  events = [
    {
      title: 'Event 1',
      date: '2024-11-01',
      description: 'This is the description for event 1.'
    },
    {
      title: 'Event 2',
      date: '2024-11-05',
      description: 'This is the description for event 2.'
    },
    {
      title: 'Event 3',
      date: '2024-11-10',
      description: 'This is the description for event 3.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
