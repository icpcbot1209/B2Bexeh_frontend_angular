import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  tabs = [
    { label: 'Account', url: '/main/settings/account' },
    { label: 'Notifications', url: '/main/settings/notifications' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
