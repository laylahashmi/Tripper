import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tripsApi = createApi({
    reducerPath: 'tripsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        credentials: 'include'
    }),
    tagTypes: ['Trips', 'Trip'],
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
            query: (id) => ({
                url: `/api/trips/${id}`,
            }),

            providesTags: (id) => [{ type: 'Trip', id: id }]
        }),
        updateTrip: builder.mutation({
            query: ({body, id}) => ({
                url: `/api/trips/${id}`,
                method: 'PUT',
                body: {
                    picture_url: body.pic,
                    start_date: body.start,
                    end_date: body.end,
                    name: body.name,
                    description: body.description,
                },
            }),
            invalidatesTags:(id) => [{type: 'Trip', id: id}]
        }),
        createStop: builder.mutation({
            query: (data, id) => ({
                url: `/api/trips/${id}`,
                body: data,
                method: 'POST',
            }),
            invalidatesTags:(id) => [{type: 'Trip', id: id}]
        }),
        deleteTrip: builder.mutation({
            query: (id) => ({
                url: `api/trips/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:(id) => [{type: 'Trips'}]
        }),
        getStop: builder.query({
            query: (tripId, stopId) => `/api/trips/${tripId}/stops/${stopId}`,
            providesTags:['Trip']
        }),
        updateStop: builder.mutation({
            query: (data, tripId, stopId) => ({
                url: `/api/trips/${tripId}/stops/${stopId}`,
                body: data,
                method: 'PUT',
            }),
            invalidatesTags:(tripId, stopId) => [{type: 'Trip', id: tripId, id: stopId}]
        }),
        deleteStop: builder.mutation({
            query: (tripId, stopId) => ({
                url: `/api/trips/${tripId}/stops/${stopId}`,
                method: 'DELETE'
            }),
            invalidatesTags:(tripId, stopId) => [{type: 'Trip', id: tripId, id: stopId}]
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
