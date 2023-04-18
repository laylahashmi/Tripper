import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tripsApi = createApi({
    reducerPath: 'tripsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        credentials: 'include'
    }),
    tagTypes: ['Trips'],
    endpoints: builder => ({
        getTrips: builder.query({
            query: () => '/api/trips/',
            providesTags:['Trips']
        }),
        createTrip: builder.mutation({
            query: (data) => ({
                url: '/api/trips/',
                method: 'POST',
                body: {
                    picture_url: data.pic,
                    start_date: data.start,
                    end_date: data.end,
                    name: data.name,
                    description: data.description,
                },
            }),
            invalidatesTags:['Trips']
        }),
        getTrip: builder.query({
            query: (id) => `/api/trips/${id}`,
            providesTags:['Trips']
        }),
        updateTrip: builder.mutation({
            query: (data, id) => ({
                url: `/api/trips/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags:['Trips']
        }),
        createStop: builder.mutation({
            query: (data, id) => ({
                url: `/api/trips/${id}`,
                body: data,
                method: 'POST',
            }),
            invalidatesTags:['Trips']
        }),
        deleteTrip: builder.mutation({
            query: (id) => ({
                url: `api/trips/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:['Trips']
        }),
        getStop: builder.query({
            query: (tripId, stopId) => `/api/trips/${tripId}/stops/${stopId}`,
            providesTags:['Trips']
        }),
        updateStop: builder.mutation({
            query: (data, tripId, stopId) => ({
                url: `/api/trips/${tripId}/stops/${stopId}`,
                body: data,
                method: 'PUT',
            }),
            invalidatesTags:['Trips']
        }),
        deleteStop: builder.mutation({
            query: (tripId, stopId) => ({
                url: `/api/trips/${tripId}/stops/${stopId}`,
                method: 'DELETE'
            }),
            invalidatesTags:['Trips']
        })
    }),
});

export const {
    useGetTripsQuery,
    useCreateTripMutation,
    useGetTripQuery,
    useUpdateTripMutation,
    useCreateStopMutation,
    useDeleteTripMutation,
    useGetStopQuery,
    useUpdateStopMutation,
    useDeleteStopMutation,
} = tripsApi;