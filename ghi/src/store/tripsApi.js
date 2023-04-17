import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tripsApi = createApi({
    reducerPath: 'tripsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        credentials: 'include'
    }),
    endpoints: builder => ({
        getTrips: builder.query({
            query: () => '/api/trips/',
        }),
    }),
});

export const { useGetTripsQuery } = tripsApi;