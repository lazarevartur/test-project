import { configureStore } from "@reduxjs/toolkit";
import { $api } from "./api";

export const store = configureStore({
    reducer: {
        [$api.reducerPath]: $api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['contractApi/executeQuery/fulfilled'],
            // Ignore these field paths in all actions
            ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
            // Ignore these paths in the state
            ignoredPaths: ['contractApi.queries.testFetch("aaaa").data'],
          }
    }).concat($api.middleware)
})