import React from 'react';
import { Text, Stack } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react/lib/Styling';


const Footer = ( props ) => {
const { companyName } = props;
  const footerStyles = mergeStyles([
    {
    //   backgroundColor: isDarkTheme ? darkTheme.palette.themePrimary : lightTheme.palette.themePrimary,
      // color: theme.palette.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50px',
      position: 'fixed', // Fixed position at the bottom
      bottom: '0', // Stick to the bottom
      width: '100%', // Full width
    },
  ]);

  const textStyles = {
    root: {
      margin: '5px',
    //   color: theme.palette.white,
    },
  };

  return (
    <Stack horizontalAlign="center">
      <div className={footerStyles}>
        <Text variant="mediumPlus" styles={textStyles}>
            {companyName}
        </Text>
      </div>
    </Stack>
  );
};

export default Footer;
