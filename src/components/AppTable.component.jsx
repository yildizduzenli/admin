import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {Check, MoreHorizontal, X} from 'lucide-react';
import {dateToString} from '../utils/date';
import {AppDropdown} from '.';
import {useNavigate} from 'react-router';

const AppTable = ({
  isActionsActive = false,
  isDetailActive = false,
  isEditActive = true,
  isDeleteActive = true,
  pageKey,
  tableColumns,
  data = [],
  onDelete,
  isHashActive = true,
  editItemKey = '_id',
  title,
  Actions,
  HeaderActions,
}) => {
  const navigate = useNavigate();

  const processedColumns = () => {
    const columns = [...tableColumns];

    if (isHashActive) {
      columns.unshift({
        id: 'hash',
        header: '#',
        cell: ({row}) => {
          return (
            <span className="text-gray-500 font-medium text-xs">
              {Number(row.id) + 1}
            </span>
          );
        },
      });
    }

    if (isActionsActive) {
      columns.push({
        id: 'actions',
        header: 'İşlemler',
        cell: ({row}) => {
          const rowData = row.original;
          const index = row.index;

          return (
            <AppDropdown
              trigger={
                <MoreHorizontal
                  size={20}
                  className="text-gray-800 hover:text-gray-700 transition-all duration-300"
                />
              }>
              {Actions && <Actions data={rowData} index={index} />}
              {isEditActive && (
                <button
                  onClick={() => navigate(`/${pageKey}/update?id=${index}`)}
                  className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <span className="mr-2">
                    {isDetailActive ? 'Detay' : 'Düzenle'}
                  </span>
                </button>
              )}

              {isDeleteActive && onDelete && (
                <button
                  onClick={() => onDelete(index)}
                  className="flex cursor-pointer items-center px-4 py-2 text-sm text-red-500 hover:bg-red-100 w-full text-left">
                  <span>Sil</span>
                </button>
              )}
            </AppDropdown>
          );
        },
      });
    }

    return columns;
  };

  const table = useReactTable({
    data,
    columns: processedColumns(),
    getCoreRowModel: getCoreRowModel(),
  });

  const checkValue = cell => {
    const value = cell.getValue();

    if (typeof value === 'string') {
      if (
        value.substring(0, 4) === 'http' ||
        value === '/images/default-photo.png'
      ) {
        return (
          <img
            src={value}
            className="min-h-32 min-w-32 max-h-32 max-w-32 h-32 w-32 object-contain rounded-md"
          />
        );
      }

      if (!isNaN(new Date(value).getDate())) {
        return `${dateToString(value)}`;
      }

      if (value.length > 40) {
        return `${value}...`;
      }
    }

    if (typeof value === 'boolean') {
      return value ? (
        <Check size={24} className="text-green-500" />
      ) : (
        <X size={24} className="text-red-500" />
      );
    }

    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <div className="rounded-xl border border-gray-200 py-6 bg-white mt-5">
      <div className="px-6 flex flex-col gap-4 justify-between">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl text-gray-800 font-semibold">{title}</h2>
          {HeaderActions && <HeaderActions />}
        </div>
      </div>

      <table className="w-full mt-4">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th
                    key={header.id}
                    className="py-3 px-4 border-y border-gray-200 text-left align-middle bg-gray-100 text-gray-500 tracking-[-0.18px] text-sm font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-gray-200 text-sm">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4 align-middle">
                    {checkValue(cell)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={processedColumns().length}
                className="h-16 text-center text-neutral-800">
                Herhangi bir veri bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppTable;
