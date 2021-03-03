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
    icon: 'fas fa-city',
    label: 'Browse Market',
    to: `/main/market`,
    roles: ['admin', 'user'],
  },
  {
    icon: 'fas fa-file-invoice-dollar',
    label: 'My Bids/Asks',
    to: `/main/my-bids-asks`,
    roles: ['admin', 'user'],
  },
  {
    icon: 'fas fa-money-check-alt',
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
    label: 'User',
    to: `/admin/user`,
    roles: ['admin'],
  },
  {
    icon: 'fas fa-stream',
    label: 'Category(Sport)',
    to: `/admin/category`,
    roles: ['admin'],
  },
  {
    icon: 'fas fa-stream',
    label: 'Subcate(Year)',
    to: `/admin/subcategory`,
    roles: ['admin'],
  },
  {
    icon: 'fas fa-stream',
    label: 'Deal Methods',
    to: `/admin/dealmethod`,
    roles: ['admin'],
  },
  {
    icon: 'fas fa-volleyball-ball',
    label: 'Product',
    to: `/admin/product`,
    roles: ['admin'],
  },
  {
    icon: 'fas fa-money-check-alt',
    label: 'Transaction',
    to: `/admin/transaction`,
    roles: ['admin'],
  },
  {
    icon: 'fas fa-cogs',
    label: 'Setting',
    to: `/admin/setting`,
    roles: ['admin'],
  },
];
