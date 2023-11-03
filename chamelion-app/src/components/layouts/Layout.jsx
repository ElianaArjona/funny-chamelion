import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import { Stack } from '@fluentui/react';
import { Outlet } from "react-router-dom";

function Layout(props) {
  const companyName = 'Company Name'; // This is the company name you want to pass
  const hasChildren = React.Children.count(props.children) > 0;
  
  return (
  <>
  <Stack
    verticalFill
    verticalAlign="start"
    style={{
      minHeight: '100vh',
      // background: useDarkMode ? darkTheme.palette.neutralDark : lightTheme.palette.white,
    }}
    tokens={{ childrenGap: 12 }}
  >
    <Header companyName={companyName} />
    <Stack horizontal tokens={{ childrenGap: 12 }} style={{ flexGrow: 1, overflowY: 'auto' }}>
      
      <Stack.Item grow={2} styles={{ root: { flexBasis: '10%' } }}>
        <Navigation />
      </Stack.Item>

      <Stack.Item grow={10} styles={{ root: { maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' } }}>
        <Outlet/>
      </Stack.Item>
    </Stack>

    <Footer companyName={companyName}/>
  </Stack>
  </>
  );
}

export default Layout;
