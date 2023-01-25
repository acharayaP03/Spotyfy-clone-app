import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/**
 * Swiper is for user swipe on images of artists section
 */
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopPlay = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector(state => state.player);
    const { data } = useGetTopChartsQuery();
    const divRef = useRef(null)

    /**
     * stop page from scrolling to the bottom.
     */
    useEffect(() =>{
        divRef.current.scrollIntoView({behavior: 'smooth'});
    })

    const handlePauseClick = () =>{
        dispatch(playPause(false))
    }

    const handlePlayPause = () =>{
        dispatch(setActiveSong({ song, data, i }))
        dispatch(playPause(true))
    }
    return (
        <div ref={divRef}>

        </div>
    )
}

export default TopPlay;
