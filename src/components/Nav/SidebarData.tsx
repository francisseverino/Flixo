import React from 'react';
import * as FiIcons from 'react-icons/fi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FiIcons.FiHome />,
    className: 'sidebar__text',
  },
  {
    title: 'Movies',
    path: '/movies',
    icon: <FiIcons.FiFilm />,
    className: 'sidebar__text',
  },
  {
    title: 'Shows',
    path: '/shows',
    icon: <FiIcons.FiTv />,
    className: 'sidebar__text',
  },
];
