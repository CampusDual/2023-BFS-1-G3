import { MenuRootItem } from 'ontimize-web-ngx';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'views', name: 'VIEW', icon: 'remove_red_eye', opened: false,
    items: [
      { id: 'users', name: 'USERS', route: '/main/users', icon: 'people'},
    ]
  },
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' },
];
