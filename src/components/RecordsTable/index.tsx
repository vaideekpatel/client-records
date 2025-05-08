import React from 'react';
import type { ClientRecord } from '../../types/ClientRecord';
import { removeRecord } from '../../store/recordsSlice';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/useTypedHooks';
import Swal from 'sweetalert2';

interface Props {
  data: ClientRecord[];
  onEdit: (r: ClientRecord) => void;
  rowOffset: number;
  indexMap: Map<string, number>;
  isSearching: boolean;
}

const RecordsTable: React.FC<Props> = ({ data, onEdit, rowOffset, indexMap, isSearching }) => {
  const dispatch = useAppDispatch();
  return (
    <table className="w-full table-auto">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="px-4 py-3 text-left">#</th>
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">Email</th>
          <th className="px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((record, idx) => {
          const serial = isSearching ? (indexMap.get(record.id) ?? 0) + 1 : rowOffset + idx + 1;
          return (
            <tr key={record.id} className="bg-white hover:bg-gray-50 transition">
              <td className="px-4 py-2">{serial}</td>
              <td className="px-4 py-2">{record.name}</td>
              <td className="px-4 py-2">{record.email}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(record)}
                  className="px-2 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    const result = await Swal.fire({
                      title: 'Delete this record?',
                      text: record.name,
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Yes, delete it!',
                      cancelButtonText: 'Cancel',
                    });
                    if (result.isConfirmed) {
                      dispatch(removeRecord(record.id));
                      toast.success('Record deleted');
                    }
                  }}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
        {data.length === 0 && (
          <tr>
            <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
              No records to display.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RecordsTable;
