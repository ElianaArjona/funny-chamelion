import React, { Component } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { filterAllCharacters } from '../../service/apiService'
import ItemsPerPage from './ItemsPerPage'


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

class ItemList extends Component {
  constructor(props) {
    super(props);

    const columns = [
        {
          key: 'column1',
          name: 'Name', // You can change this name if needed
          fieldName: 'name',
          minWidth: 210,
          maxWidth: 350,
          isRowHeader: true,
          isResizable: true,
          isSorted: true,
          isSortedDescending: false,
          sortAscendingAriaLabel: 'Sorted A to Z',
          sortDescendingAriaLabel: 'Sorted Z to A',
          onColumnClick: this._onColumnClick,
          data: 'string',
          isPadded: true,
        },
        {
          key: 'column2',
          name: 'ID', // Change 'ID' to your desired name
          fieldName: 'id',
          minWidth: 210,
          maxWidth: 350,
          isRowHeader: true,
          isResizable: true,
          isSorted: true,
          isSortedDescending: false,
          sortAscendingAriaLabel: 'Sorted A to Z',
          sortDescendingAriaLabel: 'Sorted Z to A',
          onColumnClick: this._onColumnClick,
          data: 'string',
          isPadded: true,
        },
        {
          key: 'column3',
          name: 'Status', // Change 'Status' to your desired name
          fieldName: 'status',
          minWidth: 70,
          maxWidth: 90,
          isResizable: true,
          onColumnClick: this._onColumnClick,
          data: 'number',
          onRender: (item) => {
            return <span>{item.status}</span>;
          },
          isPadded: true,
        },
        {
          key: 'column4',
          name: 'Species', // Change 'Species' to your desired name
          fieldName: 'species',
          minWidth: 70,
          maxWidth: 90,
          isResizable: true,
          isCollapsible: true,
          data: 'string',
          onColumnClick: this._onColumnClick,
          onRender: (item) => {
            return <span>{item.species}</span>;
          },
          isPadded: true,
        },
        {
          key: 'column5',
          name: 'Origin', // Change 'Origin' to your desired name
          fieldName: 'origin',
          minWidth: 70,
          maxWidth: 90,
          isResizable: true,
          isCollapsible: true,
          data: 'string',
          onColumnClick: this._onColumnClick,
          onRender: (item) => {
            return <span>{item.origin}</span>;
          },
        },
      ];
      

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
      getKey: this._getKey,
    });

    const items = this.props.items.map((item) => ({
        id: item.id,
        name: item.name,
        status: item.status,
        species: item.species,
        origin: item.origin.name,
    }));
    console.log(items)

    this.state = {
      items: items,
      originalItems: items,
      columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: false,
      isCompactMode: false,
      announcedMessage: undefined,
      isFilterActive: false,
      itemsNumber: this.props.ItemsPerPage,
    };
  }

  render() {
    const {
      columns,
      originalItems,
      isCompactMode,
      items,
      selectionDetails,
      isModalSelection,
      announcedMessage,
      isFilterActive,
      itemsNumber,
    } = this.state;

    return (
      <div>
        <div className={classNames.controlWrapper}>
          <Toggle
            label="Enable compact mode"
            checked={isCompactMode}
            onChange={this._onChangeCompactMode}
            onText="Compact"
            offText="Normal"
            styles={controlStyles}
          />
          <Toggle
            label="Enable modal selection"
            checked={isModalSelection}
            onChange={this._onChangeModalSelection}
            onText="Modal"
            offText="Normal"
            styles={controlStyles}
          />
          <TextField label="Filter by name:" onChange={this._onChangeText} styles={controlStyles} />
          <Announced message={`Number of items after filter applied: ${items.length}.`} />

          <ItemsPerPage setSelectedOption={this.props.selectedOption} selectedOption={this.props.itemsNumber} ></ItemsPerPage>
        </div>
        <div className={classNames.selectionDetails}>{selectionDetails}</div>
        <Announced message={selectionDetails} />
        {announcedMessage ? <Announced message={announcedMessage} /> : undefined}
        {isModalSelection ? (
          <MarqueeSelection selection={this._selection}>
            <DetailsList
              items={items}
              compact={isCompactMode}
              columns={columns}
              selectionMode={SelectionMode.multiple}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              onItemInvoked={this._onItemInvoked}
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
            getKey={this._getKey}
            setKey="none"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            onItemInvoked={this._onItemInvoked}
          />
        )}
      </div>
    );
  }

  componentDidUpdate(previousProps, previousState) {
    if (
      previousState.isModalSelection !== this.state.isModalSelection &&
      !this.state.isModalSelection
    ) {
      this._selection.setAllSelected(false);
    }
  }

  _getKey(item, index) {
    return item.key;
  }

  _onChangeCompactMode = (ev, checked) => {
    this.setState({ isCompactMode: checked });
  };

  _onChangeModalSelection = (ev, checked) => {
    this.setState({ isModalSelection: checked });
  };

  _onChangeText = async (ev, text) => {
    const isFilterActive = text.trim() === ''; // Check if text is empty after trimming

    try {
      // Call the API method and get the filtered items
      const filteredItems = await filterAllCharacters(text);

      this.setState({
        items: isFilterActive ? this.state.originalItems : filteredItems,
      });

      this.props.onFilterStatus(isFilterActive); // Notify the parent of filter status
    } catch (error) {
      // Handle API call error
      console.error('Error fetching data:', error);
    }
  }
  

  _onItemInvoked = (item) => {
    alert(`Item invoked: ${item.name}`);
  };

  _getSelectionDetails() {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + this._selection.getSelection()[0].name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  _onColumnClick = (ev, column) => {
    const { columns, items } = this.state;
    const newColumns = [...columns];
    const currColumn = newColumns.find((currCol) => column.key === currCol.key);

    newColumns.forEach((newCol) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        this.setState({
          announcedMessage: `${currColumn.name} is sorted ${
            currColumn.isSortedDescending ? 'descending' : 'ascending'
          }`,
        });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = this._copyAndSort(
      items,
      currColumn.fieldName,
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  };

  _copyAndSort(items, columnKey, isSortedDescending) {
    const key = columnKey;
    return items.slice(0).sort((a, b) =>
      isSortedDescending ? (a[key] < b[key] ? 1 : -1) : a[key] > b[key] ? 1 : -1
    );
  }



}


export default ItemList;