import React, { type ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks/useTypedHooks';
import { mergeRecords } from '../../store/recordsSlice';
import type { ClientRecord } from '../../types/ClientRecord';
import { toast } from 'react-toastify';

const FileUploader: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as ClientRecord[];
        dispatch(mergeRecords(parsed));
        toast.success(`Imported ${parsed.length} records!`);
      } catch {
        alert('Invalid JSON. Please upload a valid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="mb-4">
      <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
        Upload JSON
        <input
          type="file"
          accept=".json,application/json"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileUploader;
