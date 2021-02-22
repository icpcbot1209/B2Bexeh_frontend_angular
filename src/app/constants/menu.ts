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

const mydata: IMenuItem[] = [
  {
    icon: 'fas fa-search-dollar',
    label: 'Browse Market',
    to: `/main/market`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    icon: 'fas fa-tasks',
    label: 'My Offers',
    to: `/main/myoffers`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    icon: 'fas fa-comments',
    label: 'Messages',
    to: `/main/messages`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    icon: 'fas fa-user-cog',
    label: 'Settings',
    to: `/main/settings`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
  {
    icon: 'fas fa-question-circle',
    label: 'Help',
    to: `/main/help`,
    // roles: [UserRole.Admin, UserRole.Editor],
  },
];

export default mydata;
