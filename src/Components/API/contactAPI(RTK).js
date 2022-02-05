import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import authSelectors from "../redux/auth/auth-selectors";

const User = () => {
  const userToken = useSelector(authSelectors.getToken);
  return userToken;
};

export const contactApi = createApi({
  // how will be naming
  reducerPath: "contactApi",
  // it baseUrl with which we will work.
  baseQuery: fetchBaseQuery({
    baseUrl: "https://connections-api.herokuapp.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log(token);
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  //   "builder" it function which creates function "getPokemonByName"
  endpoints: (builder) => ({
    fetchContact: builder.query({
      getAccessToken: User,
      query() {
        return { url: `${User}/contacts`, method: "GET" };
      },
      providesTags: ["contacts"],
    }),
    deleteContact: builder.mutation({
      query(id) {
        return { url: `/contacts/${id}`, method: "DELETE" };
      },
      invalidatesTags: ["contacts"],
    }),
    addContact: builder.mutation({
      query(newContact) {
        const { name, number } = newContact;
        return {
          url: "/contacts",
          method: "POST",
          body: {
            name,
            number,
          },
        };
      },
      invalidatesTags: ["contacts"],
    }),
  }),
});

// it function which will be called function "getPokemonByName", with needing "query"
export const {
  useFetchContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactApi;
