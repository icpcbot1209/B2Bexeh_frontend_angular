import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  tabs = [
    { label: 'Account', url: '/main/settings/account' },
    { label: 'Bids / Asks', url: '/main/settings/bids-asks' },
    { label: 'Billing', url: '/main/settings/billing' },
  ];

  constructor() {}

  ngOnInit(): void {}
}