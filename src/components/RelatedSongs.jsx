
import SongBar from './SongBar'
import {logo} from "../assets";
const RelatedSongs = ({ data, isPlaying, activeSong, handlePlay, handlePause,artistId }) => {
   return (
        <div className="flex flex-col">
            <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
            <div className="mt-6 w-full flex flex-col">
                {
                    data?.map((song, i) => (
                        <SongBar
                            key={`${song.key}-${artistId}-${i}`}
                            song={song}
                            i={i}
                            artistId={artistId}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            handlePauseClick={handlePause}
                            handlePlayClick={handlePlay}
                        />
                    ))
                }
            </div>
        </div>
    )
};

export default RelatedSongs;
