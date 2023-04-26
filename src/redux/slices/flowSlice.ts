import {IFlow} from "../../types/flow.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IFlowSlice {
  flows: IFlow[],
  isLoading: boolean;
  isLoaded: boolean;
}

const initialState: IFlowSlice = {
  flows: [],
  isLoading: true,
  isLoaded: false,
}

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setFlows: (state, action: PayloadAction<IFlow[]>) => {
      state.flows = action.payload;
      state.isLoading = false;
      state.isLoaded = true;
    },
    clearFlows: (state) => {
      state.flows = [];
      state.isLoading = true;
      state.isLoaded = false;
    }
  }
});

export const flowActions = flowSlice.actions;
export default flowSlice;
