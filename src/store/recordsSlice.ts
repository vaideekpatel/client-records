import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';
import type { ClientRecord } from '../types/ClientRecord';
import { mergeAndDedupe } from '../utils/recordUtils';

interface RecordsState {
  records: ClientRecord[];
}

const initialState: RecordsState = {
  records: [],
};

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    setRecords(state, action: PayloadAction<ClientRecord[]>) {
      state.records = action.payload;
    },
    mergeRecords(state, action: PayloadAction<ClientRecord[]>) {
      state.records = mergeAndDedupe(state.records, action.payload);
    },
    addRecord(state, action: PayloadAction<ClientRecord>) {
      const exists = state.records.find((r) => r.email === action.payload.email);
      if (!exists) state.records.push(action.payload);
    },
    updateRecord(state, action: PayloadAction<ClientRecord>) {
      const idx = state.records.findIndex((r) => r.id === action.payload.id);
      if (idx !== -1) {
        const duplicate = state.records.find(
          (r) => r.email === action.payload.email && r.id !== action.payload.id,
        );
        if (!duplicate) {
          state.records[idx] = action.payload;
        }
      }
    },
    removeRecord(state, action: PayloadAction<string>) {
      state.records = state.records.filter((r) => r.id !== action.payload);
    },
  },
});

export const { setRecords, mergeRecords, addRecord, updateRecord, removeRecord } =
  recordsSlice.actions;
export default recordsSlice.reducer;
