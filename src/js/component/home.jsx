import React, { useEffect, useRef, useState } from "react";
import Player from "./player";
//create your first component
const Home = () => {

	const [songs, setSongs] = useState([])
	const [currentSong, setCurrentSong] = useState()
	const [playSong, setPlaySong] = useState(false)
	const audioElem = useRef()
	const [shuffle, setShuffle] = useState(false)


	useEffect(() => {
		getData()
	}, []);

	useEffect(() => {
		playSong? audioElem.current.play() : audioElem.current.pause();
	}, [playSong] )

	const getData = async () => {
		try {
			const resp = await fetch('https://playground.4geeks.com/sound/songs')
			const data = await resp.json()
			setSongs(await data)
			console.log(data)
		} catch (error) {
			console.error("error", error)

		}
	}

	const handleSelectedSong = (el) => {
		setCurrentSong(el)
		setPlaySong(true)
	}

	const getIndex = () => {
		const aux = songs.songs.filter((el) => el.id === currentSong.id)
		return songs.songs.indexOf(aux[0])
	}
	const next = () => {
		shuffle? random() :
		songs.songs.length === getIndex()+1
		?
		setCurrentSong(songs.songs[0])
		:
		setCurrentSong(songs.songs[getIndex()+ 1])
		setPlaySong(true)

	}
	const prev = () => {
		0 === getIndex() ?
		setCurrentSong(songs.songs[songs.songs.length -1])
		:
		setCurrentSong(songs.songs[getIndex()- 1])
		setPlaySong(true)

	}
	const random = () => {
		setCurrentSong(songs.songs[Math.floor(Math.random()*songs.songs.length)])
		setPlaySong(true)
	}
	const onPlaying = () => {
        const duration = audioElem.current.duration;
        const current = audioElem.current.currentTime;
        setCurrentSong({
            ...currentSong, progress: (current / duration) * 100,
            length: duration,
            current: current
        })
    }
	return (
		<div>
			<div className="container text-center bg-dark text-white">
				<ul>
					{songs.songs?.map((el, i) => <li key={i} onClick={() => handleSelectedSong(songs.songs[i])}>{el.name}</li>)}
				</ul>
			</div>
			<div className="container text-center bg-dark text-white">
				<audio
					hidden
					src={currentSong && "https://playground.4geeks.com" + currentSong.url}
					ref={audioElem}
					autoPlay
					onPlaying={onPlaying}
					onEnded={next}
					onTimeUpdate={onPlaying}
				/>
				<Player
					currentSong={currentSong}
					playSong={playSong}
					setPlaySong={setPlaySong}
					audioElem={audioElem}
					setSongs={setSongs}
					next={next}
					prev={prev}
					shuffle={shuffle}
					setShuffle={setShuffle}
					random={random}
				/>
			</div>
		</div>
	);
};

export default Home
