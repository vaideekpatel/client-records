import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedHooks';
import { updateRecord } from '../../store/recordsSlice';
import { isEmailUnique } from '../../utils/recordUtils';
import type { ClientRecord } from '../../types/ClientRecord';

interface RecordFormModalProps {
  isOpen: boolean;
  initialRecord: ClientRecord;
  onClose: () => void;
}

const RecordFormModal: React.FC<RecordFormModalProps> = ({ isOpen, initialRecord, onClose }) => {
  const dispatch = useAppDispatch();
  const records = useAppSelector((state) => state.records.records);

  // Local form state
  const [formData, setFormData] = useState({
    name: initialRecord.name,
    email: initialRecord.email,
  });
  const [error, setError] = useState('');

  // Reset form when the modal opens with a new record
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: initialRecord.name, email: initialRecord.email });
      setError('');
    }
  }, [isOpen, initialRecord]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const { name, email } = formData;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedEmail) {
      setError('Name and Email are required.');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email format.');
      return;
    }

    if (!isEmailUnique(records, trimmedEmail, initialRecord.id)) {
      setError('Email must be unique.');
      return;
    }

    dispatch(
      updateRecord({
        ...initialRecord,
        name: trimmedName,
        email: trimmedEmail,
      }),
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Record</h2>
        {error && <p className="mb-2 text-red-600">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordFormModal;
