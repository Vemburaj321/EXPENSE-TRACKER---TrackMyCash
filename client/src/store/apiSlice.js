import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseURI = 'http://localhost:8000';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseURI}),
    endpoints:builder=>({
        //get categories
        getCategories:builder.query({
            //get: 'http://localhost:8000/api/categories'
            query:()=>'/api/categories',
            providesTags:['categories']
        }),

        //get labels
        getLabels:builder.query({
            //get: 'http://localhost:8000/api/labels'
            query:()=>'/api/labels',
            providesTags:['transaction']
        }),

        //add new Transaction
        addTransaction:builder.mutation({
            query:(initialTransaction)=>({
                //get: 'http://localhost:8000/api/transaction'
                url:'/api/transaction',
                method:"POST",
                body:initialTransaction
            }),
            invalidatesTags:['transaction']
        }),

        //delete record
        deleteTransaction:builder.mutation({
            query:recordId=>({
                //get: 'http://localhost:8000/api/transaction'
                url:'/api/transaction',
                method:"DELETE",
                body:recordId
            }),
            invalidatesTags:['transaction']

        }),
    })
})

export default apiSlice;