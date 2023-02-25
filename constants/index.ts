import { HomeIcon } from '@heroicons/vue/solid';
import {
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  BellIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/vue/outline';

export const sidebarItems = [
  {
    name: 'Home',
    Icon: HomeIcon,
    active: true,
  },
  {
    name: 'Explore',
    Icon: HashtagIcon,
    active: false,
  },
  {
    name: 'Notifications',
    Icon: BellIcon,
    active: false,
  },
  {
    name: 'Messages',
    Icon: InboxIcon,
    active: false,
  },

  {
    name: 'Bookmarks',
    Icon: BookmarkIcon,
    active: false,
  },
  {
    name: 'Lists',
    Icon: DocumentTextIcon,
    active: false,
  },
  {
    name: 'Profile',
    Icon: UserIcon,
    active: false,
  },
  {
    name: 'More',
    Icon: DotsCircleHorizontalIcon,
    active: false,
  },
];
