import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error,Loader, SongCard } from '../components';
import {logo} from "../assets";

import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

/**
 * Realtime ip location api will be used to identify the top tracks thats happening in that country.
 *
 * @url geo.ipify.com
 * @returns {JSX.Element}
 * @constructor
 */
const CountryTracks = () => {
    const [country, setCountry ] = useState('');
    const [loading, setLoading ] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player)

    const { data, isFetching, error } = useGetSongsByCountryQuery(country)


    if(isFetching && loading ) return <Loader title="Loading songs around you...."/>

    if(error && country) return <Error />

    /**
     * Get location from here
     */

    useEffect(() =>{

        axios.get(`${import.meta.env.VITE_GEO_API_URL}`,{
            params: { apiKey: import.meta.env.VITE_GEO_API_KEY}
        }).then( result => console.log(result?.data?.location?.country))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))

    }, [country])
    return (
        <div className="text-white">
            Around You..
        </div>
    )
};

export default CountryTracks;
