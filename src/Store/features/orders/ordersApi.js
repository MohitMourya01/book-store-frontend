import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi =  createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/v1/orders`,
        credentials: 'include' 
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder:  (builder.mutation)({
            query: (newOrder) => ({
                url: '/',
                method: "POST",
                body: newOrder,
                credentials: 'include',
            }),
            providesTags: ['Orders']
        }),
        getOrderByEmail: (builder.query) ({
            query: (email) => ({
                url: `/email/${email}`
            }),
            providesTags: ['Orders']
          
        })
    })
})

export const {useCreateOrderMutation, useGetOrderByEmailQuery} = ordersApi ;

export default ordersApi;