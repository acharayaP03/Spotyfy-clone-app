import  { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {useGetArtistDetailsQuery} from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const { id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player)

    // fetch song details with query builder form shazam core
    const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
    // fetch related songs when user clicks on any artists.


    if(isFetchingArtistDetails ) return <Loader title="Searching song details"/>

    if (error ) return <Error />

    return(
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} artistData={artistData}/>

            {/*    Related Songs component */}
            <RelatedSongs
                data={Object.values(artistData?.data[0].views["top-songs"].data)}
                isPlaying={isPlaying}
                artistId={artistId}
                activeSong={activeSong}
            />

        </div>
    )
}

export default ArtistDetails;
