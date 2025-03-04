import { setAccessToken } from "@/src/infrastructure/redux/features/auth/auth.slice";
import { loginPayloadType, loginResponseType } from "@/src/infrastructure/types/auth.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { ILoginPayload } from "~/src/domain/interfaces/auth/ILoginPayload";
// import { setAccessToken } from "~/src/infrastructure/redux/features/auth/auth.slice";
// import { loginResponseType } from "~/src/infrastructure/types/auth.type";

// export const authApi = createApi({
//   reducerPath: "auth-api",
//   tagTypes: ["auth"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://56d3-116-108-132-138.ngrok-free.app',
//     prepareHeaders: (headers) => {
//       headers.set('ngrok-skip-browser-warning', 'true');
//       return headers;
//   },
//   }),
//   endpoints: (builder) => ({
//     loginAsync: builder.mutation({
//       query: (payload) => ({
//         url: "api/v1/auth/login",
//         method: "POST",
//         body: payload,
//       }),
//       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//         try {
//           const { data }: { data: loginResponseType } = await queryFulfilled;

//           // Dispatch the action to set the access token (to store it in the Redux store)
//           dispatch(setAccessToken(data.accessToken));
//         } catch (error) {
//           console.error(error);
//         }
//       },
//     }),
//   }),
// });

// export const { useLoginAsyncMutation } = authApi;


// import { setAccessToken } from "~/src/infrastructure/redux/slices/auth/auth.slice";
// import {
//   loginPayloadType,
//   loginResponseType,
//   OtpPayloadType,
//   VerifyType,
// } from "~/src/infrastructure/types/auth.type";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { createQueryEncodedUrl } from "~/src/infrastructure/utils/query-encoded-url";

export const authApi = createApi({
  reducerPath: "auth-api",
  tagTypes: ["auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://56d3-116-108-132-138.ngrok-free.app",
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginAsync: builder.mutation({
      query: (payload: loginPayloadType) => ({
        url: "api/v1/auth/login",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data,
          }: {
            data: {
              data: loginResponseType;
            };
          } = await queryFulfilled;

          // Dispatch the action to set the access token (to store it in the Redux store)
          dispatch(setAccessToken(data.data.accessToken));
        } catch (error) {
          // console.error(error);
        }
      },
    }),
  }),
});

export const { useLoginAsyncMutation } = authApi;