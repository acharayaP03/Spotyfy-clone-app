import  { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {useGetSongDetailsQuery, useGetRelatedSongsQuery} from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid, id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player)

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    // fetch song details with query builder form shazam core
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
    // fetch related songs when user clicks on any artists.
    const { data, isFetching: isFetchingRelatedSongs, error } = useGetRelatedSongsQuery({ songid })

    if(isFetchingSongDetails || isFetchingRelatedSongs ) return <Loader title="Searching song details"/>

    if (error ) return <Error />
    return(
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} songData={songData}/>
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
                {/*Pull up song details and display it here*/}
                <div className="mt-5">
                    {
                        songData?.sections?.at(1).type === 'LYRICS' ?
                            songData?.sections?.at(1).text.map((line, i) => (<p key={i} className="text-gray-400 text-base my-1">{ line }</p>)) :
                            <p className="text-gray-400 text-base my-1">Sorry, Couldn't find any lyrics related to yor song.</p>
                    }
                </div>
            </div>

        {/*    Related Songs component */}
            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                artistId={artistId}
                activeSong={activeSong}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
            />

        </div>
    )
}

export default SongDetails;
