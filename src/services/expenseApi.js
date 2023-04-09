// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access_token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-type", "application/json; charset=UTF-8");
      }
      return headers;
    },
  }),

  tagTypes: ["Expenses"],
  endpoints: (builder) => ({
    getAllExpense: builder.query({
      query: () => ({
        url: `list/`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),

    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),

    createExpense: builder.mutation({
      query: (form_data) => ({
        url: `add-expense/`,
        method: "POST",
        body: form_data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Expenses"],
    }),

    Register: builder.mutation({
      query: (form_data) => ({
        url: `account/register/`,
        method: "POST",
        body: form_data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    login: builder.mutation({
      query: (form_data) => ({
        url: `account/login/`,
        method: "POST",
        body: form_data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Expenses"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `account/logout/`,
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const {
  useGetAllExpenseQuery,
  useDeleteExpenseMutation,
  useCreateExpenseMutation,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = expenseApi;
