import {createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL.js'


const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/v1/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token =  localStorage.getItem('token');
        if(token){
            Headers.set("Authorization", `Bearer ${token}`)
            return Headers;
        }
    }
})
const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
             query: (id) => `/${id}`,
             providesTags: (result, error, id) => [{type: "Books", id}],
        }),
        addBook: builder.mutation({
             query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
             }),
             invalidatesTags: ["Books"]
        }),
       
    
    updateBook: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]
        }),
    
    deleteBook: builder.mutation({
        query: (id) => ({
            url: `/${id}`,
            method: "DELETE"
        }),
        invalidatesTags: ["Books"]
    })
})
})

export const {useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } = booksApi
export default booksApi
// after this go to store file