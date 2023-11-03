import * as React from 'react';
import { Dropdown, Label } from '@fluentui/react';

const options = [
  { key: '10', text: '10 items' },
  { key: '20', text: '20 items' },
  { key: '30', text: '30 items' },

];

const ItemsPerPage = (props) => {
    const { setSelectedOption, selectedOption } = props;

  return (
    <>
    <Label>Select the number of items to display:</Label>
      <Dropdown
        selectedKey={selectedOption}
        options={options}
        onChange={setSelectedOption}
        style={{ width: 200 }}
      />
    </>
  );
};

export default ItemsPerPage;
