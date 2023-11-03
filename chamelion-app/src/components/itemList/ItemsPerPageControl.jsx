import * as React from 'react';
import { Dropdown, Label, Stack } from '@fluentui/react';

const options = [
  { key: '10', text: '10 items' },
  { key: '20', text: '20 items' },
  { key: '30', text: '30 items' },
];

const stackStyles = {
  root: {
    paddingLeft: 10,  // Add left padding
    paddingRight: 20, // Add right padding
  },
};
const dropdownStyles = {
  dropdown: {
    width: 100, // Adjust the width to make the dropdown smaller
  },
};

const ItemsPerPageControl = (props) => {
  const { setSelectedOption, selectedOption } = props;

  return (
    <Stack tokens={{ childrenGap: 10 }} styles={stackStyles}>
      <Label>Items on display</Label>
      <Dropdown
        selectedKey={selectedOption}
        options={options}
        onChange={setSelectedOption}
        styles={dropdownStyles}
      />
    </Stack>
  );
};

export default ItemsPerPageControl;
