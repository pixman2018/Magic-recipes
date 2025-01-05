import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sitenavigation',
  templateUrl: './sitenavigation.component.html',
  styleUrls: ['./sitenavigation.component.scss'],
  standalone: false,
})
export class SitenavigationComponent  implements OnInit {

  protected appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  protected labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() { }

  ngOnInit() {}

}
