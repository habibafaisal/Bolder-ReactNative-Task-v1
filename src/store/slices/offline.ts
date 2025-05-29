import {createSlice} from '@reduxjs/toolkit';

interface OfflineState {
  online: boolean;
  outbox: any[];
  netInfo: any;
  retryScheduled: boolean;
}

const initialState: OfflineState = {
  online: true,
  outbox: [],
  netInfo: null,
  retryScheduled: false,
};

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {},
});

export default offlineSlice.reducer;
