import React from 'react';
import { mergeStyles, getTheme } from '@fluentui/react/lib/Styling';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { Text, Stack } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();


// Define some initial variables
let width = 40;
let height = 40;
let imgSrc = 'https://fabricweb.azureedge.net/fabric-website/placeholders/500x500.png';

// Define image properties as a plain JavaScript object
const imageProps = {
  imageFit: ImageFit.cover,
  src: imgSrc,
  // styles: props => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
};


// Create a functional component Header with props
const Header = (props) => {
  const { companyName } = props;

  // Define styles for the header content
  const contentClass = mergeStyles([
    {
      display: 'flex',
      alignItems: 'center',
      lineHeight: '30px',
      justifyContent: 'space-between',
      padding: '5px',
    },
  ]);

  // Define text styles
  const textStyles = {
    root: {
      margin: '5px',
    },
  };

  // Define icon button styles
  const iconButtonStyles = {
    // root: {
    //   color: theme.palette.white, // Set icon color to white
    // },
  };

  return (
    <div className={contentClass}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Image
          {...imageProps}
          alt='Example of the image fit value "cover" on an image taller than the frame.'
          width={width}
          height={height}
        />
        <Text variant="mediumPlus" styles={textStyles}>
          {companyName}
        </Text>
      </div>
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <IconButton
          iconProps={{ iconName: 'SignIn' }}
          title="Login"
          ariaLabel="Login"
          styles={iconButtonStyles}
          onClick={() => {
            // Handle login button click
          }}
        />
        <IconButton
          iconProps={{
            // iconName: props.isDarkTheme ? 'Sunny' : 'ClearNight',
            iconName: 'Sunny' ,

          }}
          // title={props.isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          // ariaLabel={props.isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          title={'Switch to Light Theme'}
          ariaLabel={'Switch to Dark Light'}
          // styles={iconButtonStyles}
          onClick={props.toggleTheme}
        />
        <IconButton
          iconProps={{ iconName: 'Ringer' }}
          title="Alerts"
          ariaLabel="Alerts"
          // styles={iconButtonStyles}
          onClick={() => {
            // Handle alerts button click
          }}
        />
      </Stack>
    </div>
  );
};

export default Header;
