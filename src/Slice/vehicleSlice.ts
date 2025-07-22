import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type Vehicle = {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
};

type VehicleState = {
  items: Vehicle[];
};

const initialState: VehicleState = {
  items: [],
};

export const fetchVehicles = createAsyncThunk('vehicles/fetch', async () => {
  const res = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles');
  const data = await res.json();
  return data;
});

export const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    updateVehicle: (state, action) => {
      const index = state.items.findIndex(v => v.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.data };
      }
    },
    deleteVehicle: (state, action) => {
      state.items = state.items.filter(v => v.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchVehicles.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { updateVehicle, deleteVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;