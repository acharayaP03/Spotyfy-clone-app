
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SONGS_BY_GENRE = 'v1/charts/genre-world'
const WORLD_CHARTS = '/v1/charts/world'
const TRACKS_DETAILS = '/v1/tracks/details'
const TRACKS_RELATED = '/v1/tracks/related'
const ARTISTS_DETAILS = '/v2/artists/details'
const GET_SONGS_BY_COUNTRY = '/v1/charts/country'
const GET_SONGS_BY_SEARCH = 'v1/search/multi?search_type=SONGS_ARTISTS&query'

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SHAZAM_CORE_RAPID_API_URL,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', `${import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY}`);
      // headers.set('X-RapidAPI-Key', '');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSongsByGenre: builder.query({ query: (genre) => `${SONGS_BY_GENRE}?genre_code=${genre}`}),
    getTopCharts: builder.query({ query: () => WORLD_CHARTS }),
    getSongDetails: builder.query({ query: ({ songid }) => `${TRACKS_DETAILS}?track_id=${songid}`}),
    getRelatedSongs: builder.query({ query: ({ songid }) => `${TRACKS_RELATED}?track_id=${songid}`}),
    getArtistDetails: builder.query({query: (artistId) => `${ARTISTS_DETAILS}?artist_id=${artistId}`}),
    getSongsByCountry: builder.query({ query: (countryCode) =>`${GET_SONGS_BY_COUNTRY}?country_code=${countryCode}` }),
    getSongsBySearch: builder.query({ query: (searchTerm) =>`${GET_SONGS_BY_SEARCH}=${searchTerm}` }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsByGenreQuery,
  useGetSongsBySearchQuery
} = shazamCoreApi;
