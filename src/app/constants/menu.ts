import { environment } from 'src/environments/environment';
const adminRoot = environment.adminRoot;

export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
  roles?: string[];
}

export const menuItemsUser: IMenuItem[] = [
  {
    icon: 'fas fa-search-dollar',
    label: 'Browse Market',
    to: `/main/market`,
    roles: ['admin', 'user'],
  },
  {
    icon: 'fas fa-tasks',
    label: 'My Bids/Asks',
    to: `/main/my-bids-asks`,
    roles: ['admin', 'user'],
  },
  {
    icon: 'fas fa-tasks',
    label: 'My Offers',
    to: `/main/myoffers`,
    roles: ['admin', 'user'],
  },
  {
    icon: 'fas fa-comments',
    label: 'Messages',
    to: `/main/messages`,
    roles: ['admin', 'user'],
  },
  {
    icon: 'fas fa-user-cog',
    label: 'Settings',
    to: `/main/settings`,
  },
  {
    icon: 'fas fa-question-circle',
    label: 'Help',
    to: `/main/help`,
  },
];

export const menuItemsAdmin: IMenuItem[] = [
  {
    icon: 'fas fa-user-cog',
    label: 'Users',
    to: `/admin/users`,
    roles: ['admin'],
  },
];
