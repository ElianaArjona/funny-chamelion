import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Announced } from '@fluentui/react/lib/Announced';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
//   IColumn,
} from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { TooltipHost } from '@fluentui/react';

const LOREM_IPSUM = (
    'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
    'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
    'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
    'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt '
  ).split(' ');
  let loremIndex = 0;

// Declare FILE_ICONS at the top of the component's scope
const FILE_ICONS = [
    { name: 'accdb' },
    { name: 'audio' },
    { name: 'code' },
    { name: 'csv' },
    { name: 'docx' },
    { name: 'dotx' },
    { name: 'mpp' },
    { name: 'mpt' },
    { name: 'model' },
    { name: 'one' },
    { name: 'onetoc' },
    { name: 'potx' },
    { name: 'ppsx' },
    { name: 'pdf' },
    { name: 'photo' },
    { name: 'pptx' },
    { name: 'presentation' },
    { name: 'potx' },
    { name: 'pub' },
    { name: 'rtf' },
    { name: 'spreadsheet' },
    { name: 'txt' },
    { name: 'vector' },
    { name: 'vsdx' },
    { name: 'vssx' },
    { name: 'vstx' },
    { name: 'xlsx' },
    { name: 'xltx' },
    { name: 'xsn' },
  ];

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
  const [columns, setColumns] = useState([]);
  const [items, setItems] = useState([]);
  const [isModalSelection, setIsModalSelection] = useState(false);
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [announcedMessage, setAnnouncedMessage] = useState(undefined);

//   let selectionRef = useRef(new Selection({ getKey: (item) => item.key }));


  const _allItems = _generateDocuments();

  useEffect(() => {
    const initialColumns = [
      {
        key: 'column1',
        name: 'File Type',
        className: classNames.fileIconCell,
        iconClassName: classNames.fileIconHeaderIcon,
        ariaLabel: 'Column operations for File type, Press to sort on File type',
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'name',
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: _onColumnClick,
        onRender: (item) => (
          <TooltipHost content={`${item.fileType} file`}>
            <img src={item.iconName} className={classNames.fileIconImg} alt={`${item.fileType} file icon`} />
          </TooltipHost>
        ),
      },
      {
        key: 'column2',
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
        key: 'column3',
        name: 'Date Modified',
        fieldName: 'dateModifiedValue',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: _onColumnClick,
        data: 'number',
        onRender: (item) => {
          return <span>{item.dateModified}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column4',
        name: 'Modified By',
        fieldName: 'modifiedBy',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        onColumnClick: _onColumnClick,
        onRender: (item) => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column5',
        name: 'File Size',
        fieldName: 'fileSizeRaw',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'number',
        onColumnClick: _onColumnClick,
        onRender: (item) => {
          return <span>{item.fileSize}</span>;
        },
      },
    ];

    setColumns(initialColumns);
    setItems(_allItems);
  }, []);


  const [selectionDetails, setSelectionDetails] = useState('');
  let [selection] = useState(new Selection({ getKey: (item) => item.key }));


  function _getKey(item, index) {
    return item.key;
  }
  
  const _getSelectionDetails = () => {
    const selectionCount = selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return `1 item selected: ${selection.getSelection()[0].name}`;
      default:
        return `${selectionCount} items selected`;
    }
  };

useEffect(() => {
    setSelectionDetails(_getSelectionDetails());
    selection = new Selection({
      onSelectionChanged: () => {
      },
      getKey: _getKey,});
  }, []); 

  const _onChangeCompactMode = (ev, checked) => {
    setIsCompactMode(checked);
  };

  const _onChangeModalSelection = (ev, checked) => {
    setIsModalSelection(checked);
  };

  const _onChangeText = (ev, text) => {
    const filteredItems = text
      ? _allItems.filter((i) => i.name.toLowerCase().indexOf(text) > -1)
      : _allItems;
    setItems(filteredItems);
  };

  const _onItemInvoked = (item) => {
    alert(`Item invoked: ${item.name}`);
  };

  const _onColumnClick = (ev, column) => {
    const newColumns = columns.map((newCol) => {
      if (newCol.key === column.key) {
        newCol.isSortedDescending = !newCol.isSortedDescending;
        newCol.isSorted = true;
        setAnnouncedMessage(
          `${newCol.name} is sorted ${newCol.isSortedDescending ? 'descending' : 'ascending'}`
        );
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
      return newCol;
    });

    const newItems = _copyAndSort(items, column.fieldName, column.isSortedDescending);

    setColumns(newColumns);
    setItems(newItems);
  };

  const _copyAndSort = (items, columnKey, isSortedDescending) => {
    const key = columnKey;
    return items.slice(0).sort((a, b) =>
      isSortedDescending ? (a[key] < b[key] ? 1 : -1) : a[key] > b[key] ? 1 : -1
    );
  };

  function _generateDocuments() {
    const items = [];
    for (let i = 0; i < 500; i++) {
      const randomDate = _randomDate(new Date(2012, 0, 1), new Date());
      const randomFileSize = _randomFileSize();
      const randomFileType = _randomFileIcon();
      let fileName = _lorem(2);
      fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1) + `.${randomFileType.docType}`;
      let userName = _lorem(2);
      userName = userName
        .split(' ')
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(' ');
      items.push({
        key: i.toString(),
        name: fileName,
        value: fileName,
        iconName: randomFileType.url,
        fileType: randomFileType.docType,
        modifiedBy: userName,
        dateModified: randomDate.dateFormatted,
        dateModifiedValue: randomDate.value,
        fileSize: randomFileSize.value,
        fileSizeRaw: randomFileSize.rawSize,
      });
    }
    return items;
  }

  function _randomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return {
      value: date.valueOf(),
      dateFormatted: date.toLocaleDateString(),
    };
  }


  function _randomFileIcon() {
    const docType = FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
    return {
      docType,
      url: `https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/item-types/16/${docType}.svg`,
    };
  }

  function _randomFileSize() {
    const fileSize = Math.floor(Math.random() * 100) + 30;
    return {
      value: `${fileSize} KB`,
      rawSize: fileSize,
    };
  }


  function _lorem(wordCount) {
    const startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
    loremIndex = startIndex + wordCount;
    return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
  }


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
        <TextField label="Filter by name:" onChange={_onChangeText} styles={controlStyles} />
        <Announced message={`Number of items after filter applied: ${items.length}.`} />
      </div>
      <div className={classNames.selectionDetails}>{selectionDetails}</div>
      <Announced message={selectionDetails} />
      {announcedMessage ? <Announced message={announcedMessage} /> : undefined}
      {isModalSelection ? (
        <MarqueeSelection selection={selection}>
          <DetailsList
            items={items}
            compact={isCompactMode}
            columns={columns}
            selectionMode={SelectionMode.multiple}
            setKey="multiple"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={selection}
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
    </div>
  );
};

export default ItemList;
