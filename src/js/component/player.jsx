import React, { useRef } from "react";
import Home from "./home";


const Player = ({ currentSong, playSong, setPlaySong, next, prev, shuffle, setShuffle, loop, setLoop, audioElem, random, setCurrentSong }) => {
    const timeStamp = useRef()
    const PlayPause = () => {
        if (!playSong && !currentSong) {
            random()
        } else {

            setPlaySong(!playSong)
        }
    }
    const setTime = (e) => {
        const width = timeStamp.current.clientWidth;
        const offSet = e.nativeEvent.offsetX;
        const progress = (offSet / width) * 100
        audioElem.current.currentTime = (progress / 100) * currentSong.length
    }
    
    return (
        <div>
            <div>
                <h2>{currentSong && currentSong.name}</h2>
            </div >
            <div className="navigation" onClick={setTime} ref={timeStamp}>
                {currentSong ?
                    <div className="seeker" style={{ width: `${currentSong.progress}%` }}>
                    </div>
                    :
                    ""
                }
            </div>
            <div className="d-flex justify-content-center">
                <div className="mx-2">
                    <span onClick={() => setShuffle(!shuffle)}>
                        <i class="fa-solid fa-shuffle"></i>
                    </span>
                </div>
                <div className="mx-2">
                    <span onClick={prev}>
                        <i class="fa-solid fa-backward-step"></i>
                    </span>
                </div>
                <div className="mx-2">
                    <span onClick={PlayPause}>
                        <i class={`${playSong ? "fa-solid fa-pause" : "fa-solid fa-play"}`} />
                    </span>
                </div>
                <div className="mx-2">
                    <span onClick={next}>
                        <i class="fa-solid fa-forward-step"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Player