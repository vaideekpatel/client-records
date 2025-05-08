import React, { useState, useMemo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { useAppSelector } from './hooks/useTypedHooks';
import { usePagination } from './hooks/usePagination';
import FileUploader from './components/FileUploader';
import SearchBar from './components/SearchBar';
import RecordsTable from './components/RecordsTable';
import Pagination from './components/Pagination';
import RecordFormModal from './components/RecordFormModal';
import type { ClientRecord } from './types/ClientRecord';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const allRecords = useAppSelector((state) => state.records.records);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return allRecords.filter(
      (r) =>
        String(r.id).toLowerCase().includes(term) ||
        r.name.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term),
    );
  }, [allRecords, searchTerm]);

  const pageSize = 10;
  const { currentPage, totalPages, currentData, goToPage } = usePagination<ClientRecord>(
    filteredRecords,
    pageSize,
  );

  const [editingRecord, setEditingRecord] = useState<ClientRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (record: ClientRecord) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setEditingRecord(null);
    setIsModalOpen(false);
  };
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    goToPage(1);
  };

  const rowOffset = (currentPage - 1) * pageSize;

  const indexMap = useMemo(() => new Map(allRecords.map((r, i) => [r.id, i])), [allRecords]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className=" font-sans bg-gray-100 flex justify-center items-center min-h-screen py-8">
          <div className="w-full max-w-3xl px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <header className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-800">Client Records Management</h1>
              </header>

              <section className="mb-6">
                <FileUploader />
              </section>

              <section className="mb-6">
                <SearchBar onSearch={handleSearch} />
              </section>

              <section className="mb-6">
                <div className="overflow-x-auto">
                  <RecordsTable
                    data={currentData}
                    onEdit={handleEdit}
                    rowOffset={rowOffset}
                    indexMap={indexMap}
                    isSearching={searchTerm.length > 0}
                  />
                </div>
              </section>

              <section className="flex justify-center mb-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </section>

              {isModalOpen && editingRecord && (
                <RecordFormModal
                  isOpen={isModalOpen}
                  initialRecord={editingRecord}
                  onClose={handleClose}
                />
              )}
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
          />
          ;
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
