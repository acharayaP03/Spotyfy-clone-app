import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error,Loader, SongCard } from '../components';

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


    /**
     * Get location from here
     */

    useEffect(() =>{

        axios.get(`${import.meta.env.VITE_GEO_API_URL}`,{
            params: { apiKey: import.meta.env.VITE_GEO_API_KEY}
        }).then( result => setCountry(result?.data?.location?.country))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))

    }, [country])

    const { data, isFetching, error } = useGetSongsByCountryQuery(country)

    if(isFetching && loading ) return <Loader title="Loading songs around you...."/>

    if(error && country) return <Error />


    return (
        <div className="flex flex-col">
           <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around you</h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {
                    data ?
                        data?.map((song, i) =>
                            (
                                <SongCard
                                    key={song.key}
                                    song={song}
                                    isPlaying={isPlaying}
                                    activeSong={activeSong}
                                    data={data}
                                    i={i}
                                />
                            )
                        ) :
                        <h2>Sorry couldn't fetch songs ...</h2>
                }
            </div>
        </div>
    )
};

export default CountryTracks;
