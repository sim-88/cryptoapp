import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST
}
const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({

            query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history`, {
                referenceCurrencyUuid: 'yhjMzLPhuIDl', // USD
                timePeriod: timeperiod,  // Use timeperiod as query parameter
            }),
        }),
        
    })
});

export const { useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery } = cryptoApi;

