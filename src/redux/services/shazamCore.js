
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SHAZAM_CORE_RAPID_API_URL,
    prepareHeaders: (headers) => {
      // headers.set('X-RapidAPI-Key', `${import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY}`);
      // headers.set('X-RapidAPI-Key', '');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/v1/charts/world' }),
    getSongDetails: builder.query({ query: ({ songid }) => `/v1/tracks/details?track_id=${songid}`}),
    getRelatedSongs: builder.query({ query: ({ songid }) => `/v1/tracks/related?track_id=${songid}`}),
    getArtistDetails: builder.query({query: (artistId) => `/v2/artists/details?artist_id=${artistId}`})
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
    useGetArtistDetailsQuery
} = shazamCoreApi;
