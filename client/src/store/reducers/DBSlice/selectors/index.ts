import { RootState } from "../../..";

export const dbSelector = (state: RootState) => state.dbReducer.db;