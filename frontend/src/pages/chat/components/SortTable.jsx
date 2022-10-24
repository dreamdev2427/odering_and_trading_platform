import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Table } from 'reactstrap';

import { FontAweIcon } from 'atoms';

const SortIcon = ({ column }) => {
  if (!column.isSorted) {
    return '';
  }
  if (column.isSortedDesc) {
    return <FontAweIcon icon="sort-amount-down" />
  }
  return <FontAweIcon icon="sort-amount-up" />
}

const SortTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  )


  return (
    <Table size="sm" hover {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => {
          const { key, ...headerProps } = headerGroup.getHeaderGroupProps();
          return (
            <tr key={key} {...headerProps}>
              {headerGroup.headers.map(column => {
                const { key: cellKey, ...cellProps } = column.getHeaderProps(column.getSortByToggleProps());
                return (
                  <th key={cellKey} {...cellProps}>
                    {column.render('Header')}
                    <span>
                      <SortIcon column={column} />
                    </span>
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...rowProps } = row.getRowProps();
          return (
            <tr key={key} {...rowProps}>
              {row.cells.map(cell => {
                const { key: cellKey, ...cellProps } = cell.getCellProps();
                return (
                  <td key={cellKey} {...cellProps}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default SortTable;
