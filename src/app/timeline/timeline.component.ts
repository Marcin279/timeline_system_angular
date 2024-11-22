import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importujemy CommonModule

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  standalone: true,
  imports: [CommonModule]  // Używamy CommonModule w tym komponencie
})
export class TimelineComponent implements OnInit {

  events = [
    {
      title: 'University',
      subtitle: 'Web Development',
      date: '2016-2020',
      location: 'Miami',
      description: 'Quisque sit amet urna et neque porttitor mattis.',
      image: 'https://www.bootdey.com/image/600x600/FFB6C1/000000',
      isOpen: false,
    },
    {
      title: 'High School',
      subtitle: 'Web Design',
      date: '2012-2016',
      location: 'New York',
      description: 'Quisque sit amet urna et neque porttitor mattis.',
      image: 'https://www.bootdey.com/image/600x600/FFB6C1/000000',
      isOpen: false,
    }
  ];

  constructor() { }

  ngOnInit(): void {}

  toggleEvent(event: any): void {
    event.isOpen = !event.isOpen;
  }
}
