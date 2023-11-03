import React from 'react';
import { Nav, initializeIcons } from '@fluentui/react';

const navigationStyles = {
  root: {
    height: '100vh',
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const links = [
  {
    name: "Basic Components",
    links: [
      {
        name: 'Contact',
        key:'key1',
        url: '/contact',
        iconProps: {
          iconName: 'News',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        }
      },
      {
        name: 'Blogs',
        key: 'key2',
        url: '/blogs',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        }
      },
      {
        name: 'Table',
        key: 'key3',
        url: '/table',
        iconProps: {
          iconName: 'PlayerSettings',
          styles: {
            root: {
              fontSize: 20,
              color: '#106ebe',
            },
          }
        }
      }
    ],
  },
];

const Navigation = () => {
  initializeIcons();
  return (
    <Nav
      groups={links}
      styles={navigationStyles}
    />
  );
};

export default Navigation;