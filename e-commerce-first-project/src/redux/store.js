import { configureStore,combineReducers } from '@reduxjs/toolkit'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartSlice from './cartSlice';

export const rootReducer=combineReducers({
    cart:cartSlice
});
const persistConfig={
    key:"root",
    storage,
    whitelist: ["cart"],
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefultMiddleware)=>getDefultMiddleware({
        serializableCheck:false,
    })
})

const persistor = persistStore(store);

export {store,persistor};

export default store;