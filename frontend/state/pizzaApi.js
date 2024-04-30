import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaApi = createApi({
    reducerPath: "pizzaApi",
    tagTypes: ["Pizza"],
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:9009/api/pizza/` }),
    endpoints: (build) => ({
        getHistory: build.query({
            // (GET) request here...
            query: () => "history",
            providesTags: ["Pizza"]
        }),
        createOrder: build.mutation({
            // (POST) request done here
            query: (order) => ({
                url: "order",
                method: "POST",
                body: order
                // body: JSON.stringify(order)
            }),
            invalidatesTags: ["Pizza"]
        }),
    }),
});

export const {
    useGetHistoryQuery, useCreateOrderMutation
} = pizzaApi;