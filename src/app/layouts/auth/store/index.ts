import { authReducer, featureName } from "./auth.reducers";


export const appReducers = {
    [featureName]: authReducer,
};