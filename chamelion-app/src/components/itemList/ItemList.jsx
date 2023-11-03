import React, { useState, useEffect } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Announced } from '@fluentui/react/lib/Announced';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
} from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { filterAllCharacters, fetchAllMetadata } from '../../service/apiService';
import ItemsPerPageControl from './ItemsPerPageControl';
import PaginationControl from './PaginationControl'; // You might need to import your PaginationControl component

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px',
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden',
      },
    },
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px',
  },
  controlWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  exampleToggle: {
    display: 'inline-block',
    marginBottom: '10px',
    marginRight: '30px',
  },
  selectionDetails: {
    marginBottom: '20px',
  },
});

const controlStyles = {
  root: {
    margin: '0 30px 20px 0',
    maxWidth: '300px',
  },
};

const ItemList = () => {
  // State hooks related to the component's data
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [columns, setColumns] = useState([]);
  const [metadata, setMetadata] = useState({});

  // State hooks related to itemsPerPage
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // State hooks related to pagination
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  // State hooks for UI control settings
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [selectionDetails, setSelectionDetails] = useState('');
  const [selection] = useState(new Selection({ getKey: (item) => item.key }));

  // const [selection, setSelection] = useState(new Selection());
  const [isModalSelection, setIsModalSelection] = useState(false);
  const [announcedMessage, setAnnouncedMessage] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    const columns = [
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: _onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column2',
        name: 'ID',
        fieldName: 'id',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: _onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column3',
        name: 'Status',
        fieldName: 'status',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: _onColumnClick,
        data: 'number',
        onRender: (item) => {
          return <span>{item.status}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column4',
        name: 'Species',
        fieldName: 'species',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        onColumnClick: _onColumnClick,
        onRender: (item) => {
          return <span>{item.species}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column5',
        name: 'Origin',
        fieldName: 'origin',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        onColumnClick: _onColumnClick,
        onRender: (item) => {
          return <span>{item.origin}</span>;
        },
      },
    ];

    setColumns(columns);

    // Fetch and set items from the API or props
    const fetchData = async () => {
      try {
        let apiData = await filterAllCharacters('');
        
        // Calculate the start and end indices for slicing
        const startIndex = (selectedPageIndex) * parseInt(itemsPerPage);
        let endIndex = startIndex + parseInt(itemsPerPage);

        const totalItems = apiData.length;
        if (endIndex > totalItems) {
          endIndex = totalItems;
        }

        apiData = apiData.slice(startIndex, endIndex);

        console.log("---before apidata-----")
        console.log(items)
        setItems(apiData);

        console.log("---after apidata-----")
        console.log(items)

        setOriginalItems(apiData);

        const response = await fetchAllMetadata(selectedPageIndex);
        const itemsMetadata = {
          count: response.count,
          pages: Math.ceil(response.count / itemsPerPage)
        }
        console.log(itemsMetadata)

        setMetadata(itemsMetadata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [itemsPerPage, selectedPageIndex]);

  const _onColumnClick = (ev, column) => {
    const newColumns = columns.map((newCol) => {
      if (newCol.key === column.key) {
        newCol.isSortedDescending = !newCol.isSortedDescending;
        newCol.isSorted = true;
        setAnnouncedMessage(
          `${newCol.name} is sorted ${
            newCol.isSortedDescending ? 'descending' : 'ascending'
          }`
        );
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
      return newCol;
    });

    console.log("---sort items-----")
    console.log(items.length)

    const newItems = _copyAndSort(
      items,
      column.fieldName,
      column.isSortedDescending
    );

    setColumns(newColumns);
    setItems(newItems);
    
  };

  const _copyAndSort = (items, columnKey, isSortedDescending) => {
    const key = columnKey;
    return items.slice(0).sort((a, b) =>
      isSortedDescending ? (a[key] < b[key] ? 1 : -1) : a[key] > b[key] ? 1 : -1
    );
  };

  const _selection = new Selection({
    onSelectionChanged: () => {
      setSelectionDetails(_getSelectionDetails());
    },
    getKey: _getKey,
  });

  function _getKey(item, index) {
    return item.key;
  }

  const _getSelectionDetails = () => {
    const selectionCount = _selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return `1 item selected: ${_selection.getSelection()[0].name}`;
      default:
        return `${selectionCount} items selected`;
    }
  };

  const _onChangeText = async (ev, text) => {
    const isFilterActive = text.trim() === '';

    try {
      const filteredItems = await filterAllCharacters(text);
      setItems(isFilterActive ? originalItems : filteredItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const _onItemInvoked = (item) => {
    alert(`Item invoked: ${item.name}`);
  };

  const _onChangeCompactMode = (ev, checked) => {
    setIsCompactMode(checked);
  };

  const _onChangeModalSelection = (ev, checked) => {
    setIsModalSelection(checked);
  };

  const handlePageChange = (index) => {
    setSelectedPageIndex(index);
  };

  const handleItemsPerPage = (ev, option) => {
    // Calculate the maximum allowed page index with the new itemsPerPage setting
    const maxPageIndex = Math.floor(metadata.count / option.key);
  
    if (selectedPageIndex > maxPageIndex) {
      // If the current page does not exist with the new setting, reset to page 0
      setSelectedPageIndex(0);
    }
  
    setItemsPerPage(option.key);
  };

  return (
    <div>
      <div className={classNames.controlWrapper}>
        <Toggle
          label="Enable compact mode"
          checked={isCompactMode}
          onChange={_onChangeCompactMode}
          onText="Compact"
          offText="Normal"
          styles={controlStyles}
        />
        <Toggle
          label="Enable modal selection"
          checked={isModalSelection}
          onChange={_onChangeModalSelection}
          onText="Modal"
          offText="Normal"
          styles={controlStyles}
        />
        <ItemsPerPageControl
          setSelectedOption={handleItemsPerPage}
          selectedOption={itemsPerPage}
        />
        <TextField
          label="Filter by name:"
          onChange={_onChangeText}
          styles={controlStyles}
        />
        <Announced message={`Number of items after filter applied: ${items.length}.`} />
      </div>
      <div className={classNames.selectionDetails}>{selectionDetails}</div>
      <Announced message={selectionDetails} />
      {announcedMessage ? <Announced message={announcedMessage} /> : undefined}
      {isModalSelection ? (
        <MarqueeSelection selection={_selection}>
          <DetailsList
            items={items}
            compact={isCompactMode}
            columns={columns}
            selectionMode={SelectionMode.multiple}
            setKey="multiple"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={_selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={_onItemInvoked}
            enterModalSelectionOnTouch={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
          />
        </MarqueeSelection>
      ) : (
        <DetailsList
          items={items}
          compact={isCompactMode}
          columns={columns}
          selectionMode={SelectionMode.none}
          getKey={_getKey}
          setKey="none"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          onItemInvoked={_onItemInvoked}
        />
      )}
      {!isFilterActive ? (
        <PaginationControl
          selectedPageIndex={selectedPageIndex}
          onPageChange={handlePageChange}
          fetchItems={items}
          fetchMetadata={metadata}
        />
      ) : null}
    </div>
  );
};

export default ItemList;
