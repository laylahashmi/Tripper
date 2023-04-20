import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['Account'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
    }),
    endpoints: builder => ({
        login: builder.mutation({
            query: info => {
                let formData = null;
                if (info instanceof HTMLElement) {
                    formData = new FormData(info);
                } else {
                    formData = new FormData();
                    formData.append('username', info.username);
                    formData.append('password', info.password);
                }
                return {
                    url: '/token',
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                };
            },
            invalidatesTags: result => {
                return (result && ['Account']) || [];
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/token',
                method: 'DELETE'
            }),
            invalidatesTags: ['Account', 'Trips']
        }),
        signup: builder.mutation ({
            query: (data) => ({
                url: '/api/accounts',
                method: 'POST',
                body: {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    ...data
                }
            }),
            invalidatesTags: ['Account']
        }),
        getToken: builder.query({
            query: () => ({
                url: '/token',

                credentials: 'include',
            }),
            providesTags: ['Account'],
        }),
    }),
});

export const {
    useLoginMutation,
    useGetTokenQuery,
    useLogoutMutation,
    useSignupMutation
} = authApi;