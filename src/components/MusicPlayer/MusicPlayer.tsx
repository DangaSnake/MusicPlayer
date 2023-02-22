import "./MusicPlayer.css";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import styled from "styled-components";


enum SongKey {
    Song1 = "nujabes",
    Song2 = "tyler",
    Song3 = "doja"
}

const SONG_LIST: readonly SongKey[] = [SongKey.Song1, SongKey.Song2, SongKey.Song3];

const SONG_OBJECTS: Record<SongKey, { name: string, album: string, artist: string, image: string, about: string, audio: string }> = {
    [SongKey.Song1]: {
        "name": "Counting Stars",
        "album": "Hydeout",
        "artist": "Nujabes",
        "image": "nujabes-cover.jpg",
        "about": "Nujabes was a Japanese record producer and DJ known for his unique blend of jazz, hip-hop, and electronica. He is widely regarded as a pioneer in the development of the Japanese hip-hop scene and his music has influenced many artists both in Japan and around the world.  Despite his untimely death in 2010, his music continues to be celebrated by fans and fellow artists.",
        "audio": "countingstars.mp3"
    },

    [SongKey.Song2]: {
        "name": "Smuckers",
        "album": "Cherry Bomb",
        "artist": "Tyler The Creator",
        "image": "cherry-bomb-img.jpg",
        "about": "Tyler, the Creator is a rapper, and record producer from California. Tyler rose to fame with the release of his debut album 'Goblin' in 2011. He is the founder of the alternative hip hop collective Odd Future, and has since released several critically acclaimed albums, including 'Igor' and 'Flower Boy'. Tyler's music tackles themes of personal growth, and societal issues, and he continues to push the boundaries of traditional hip hop with his innovative sound and provoking lyrics.",
        "audio": "SMUCKERS.mp3"
    },
    [SongKey.Song3]: {
        "name": "Woman",
        "album": "Planet Her",
        "artist": "Doja Cat",
        "image": "planet-her-img.jpg",
        "about": "Doja Cat is a Los Angeles-based singer, rapper and songwriter known for her unique blend of hip-hop, pop and R&B. Her breakthrough hit 'Mooo!' went viral in 2018 and she has since released multiple critically acclaimed albums, including 'Amala' and 'Hot Pink.' With her quirky, unapologetic style, she's quickly become one of the most exciting artists in contemporary pop music.",
        "audio": "Woman.mp3"
    }

}

const OpenUIContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`

const MusicPlayer = (): React.ReactElement => {
    const [playerOpen, setPlayerOpen] = useState(false);
    const [playAudio, setPlayAudio] = useState(false);
    const [songID, setSongID] = useState(0);
    const [audio, setAudio] = useState(new Audio('dark-and-violent.mp3'))
    const [hideToolTip, setHideToolTip] = useState(false);

    const [currentAudioTime, setCurrentAudioTime] = useState(0);

    const [currentTimePercentage, setCurrentTimePercentage] = useState(0);

    const [seekBarValue, setSeekBarValue] = useState(0);

    // Updates "seekBarValue" each time currentTimePercentage updates
    useEffect(() => {
        if (isNaN(currentTimePercentage)) {
            console.log("ERROR currentTimePercentage is NaN, setting to 0");
            setSeekBarValue(0);
        } else {
            setSeekBarValue(Number(currentTimePercentage));
        }

    }, [currentTimePercentage])

    // This checks that out "seekBarValue" is not "NaN" which it keeps getting set to somehow. When it is "NaN" we reset it to "0"
    useEffect(() => {
        if (isNaN(seekBarValue)) {
            console.log("ERROR: seekBarValue is not a number! Resetting to 0, value:", String(seekBarValue));
            setSeekBarValue(0);
        }
    }, [seekBarValue])


    /*Updates the audio object when "songID" state prop is updated */
    useEffect(() => {
        setAudio(new Audio(`${currentSong.audio}`));
    }, [songID]);


    // Here we calculate what percentage of the song duration our "currentAudioTime" is
    // Then we use that percentage to update "CurrentTimePercentage"
    // Which ultimately is fed to the styling of the old seek-bar button DIV
    // Therefore updating the position of that element based on the percentage we had played in the song
    useEffect(() => {
        let percentageTime = Number((currentAudioTime / audio.duration).toFixed(3));
        setCurrentTimePercentage(percentageTime);
    }, [currentAudioTime])

    // Updates our currentAudioTime state prop
    // It adds an event listener to our audio object and waits for an update to the time, whenever we get that we update our
    // currentAudioTime state prop thus tracking the time in the state
    useEffect(() => {
        const updateTime = () => {
            setCurrentAudioTime(audio.currentTime);
        };

        audio.addEventListener("timeupdate", updateTime);
        return () => {
            audio.removeEventListener("timeupdate", updateTime);
        };
    }, [audio]);


    //END OF USE EFFECTS

    //START OF METHODS/FUNCTIONS

    // Handles the closing and opening of the UI click
    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        setHideToolTip(true);
        event.stopPropagation();
        console.log("PRITNING TARGET:", event.currentTarget);
        if (!playerOpen && event.currentTarget.className.match("player-closed-ui")) {
            setPlayerOpen(true);
        } else if (playerOpen && event.currentTarget.className.match("exit-button-div"))
            setPlayerOpen(false);
    }

    // Handles a click of the play button
    const handlePlayClick = (event: React.MouseEvent<HTMLOrSVGElement>): void => {
        event.stopPropagation()
        setPlayAudio(true);
        audio.play();
    }

    // Handles a click of the pause button
    const handlePauseClick = (event: React.MouseEvent<HTMLOrSVGElement>): void => {
        event.stopPropagation();
        audio.pause();
        setPlayAudio(false);
    }

    // Handles both the forward song click and back a song click
    const handleForwardClick = (event: React.MouseEvent<HTMLOrSVGElement>): void => {
        event.stopPropagation();
        setCurrentTimePercentage(0);
        const clickedElement = event.target as HTMLElement;

        if (clickedElement.classList.contains("right")) {
            setSongID((prev) => {
                if (prev === SONG_LIST.length - 1) {
                    return (0);
                }

                return (prev + 1);
            })
        } else {
            setSongID((prev) => {
                if (prev === 0) {
                    return (SONG_LIST.length - 1);
                }

                return (prev - 1);
            })
        }
        audio.pause();
        setPlayAudio(false);
    }

    // Call on changes for our "range input" or "seek bar"
    // Sets the "SeekBarValue" state prop based on the current value of our "seek bar" input element
    const updateSeekBarState = (event: React.FormEvent<HTMLInputElement>) => {


        setSeekBarValue(Number(event.currentTarget.value));
    }

    const handleSeekBarClick = (event: React.MouseEvent<HTMLInputElement>) => {
        // console.log("Setting audio time to: ", event.target.value * audio.duration);

        audio.pause();
        audio.currentTime = Number(event.currentTarget.value) * audio.duration;
        setPlayAudio(true);
        audio.play();
        // console.log("Got SEEKBAR CLICK", event.target.value * audio.duration);
    }

    // Pauses the audio when dragging seek bar so we dont get jittering
    const handleSeekDrag = () => {
        setPlayAudio(false);
        audio.pause();
    }


    // This sets our "currentSong" to which ever "songID" we have
    // it uses the song id to grab the a value out of "song_list"
    // We then use that value to pick a its corresponding object in "SONG_OBJECTS
    // So we are setting "currentSong" to the actual object of whatever song is picked
    const currentSong = SONG_OBJECTS[SONG_LIST[songID]];

    // Sets up next song object
    // So we can display its information in the "next song:" section
    let nextSong: { name: string, artist: string, album: string };
    if (songID < SONG_LIST.length - 1) {
        nextSong = SONG_OBJECTS[SONG_LIST[songID + 1]]
    } else {
        nextSong = SONG_OBJECTS[SONG_LIST[0]];
    }


    return (
        <div className="parent-holder-div">
            <h1 className={classNames("expand-tip", hideToolTip && "hidden")}>Click Player to Expand!</h1>
            <div className={classNames("player-holder", playerOpen && "player-open")}>
                {!playerOpen && <div onClick={handleClick} className={"player-closed-ui"}>
                    <img className="album-cover-img" src={currentSong.image} alt="album cover" />
                    {!playAudio && <svg onClick={handlePlayClick} className="play-button-svg" width="20px" height="20px" viewBox="0 0 20 20">
                        <path className="play-button-path" d="M15 10.001c0 .299-.305.514-.305.514l-8.561 5.303C5.51 16.227 5 15.924 5 15.149V4.852c0-.777.51-1.078 1.135-.67l8.561 5.305c-.001 0 .304.215.304.514z" />
                    </svg>}
                    {playAudio && <svg onClick={handlePauseClick} className="pause-button-svg" width="20px" height="20px" viewBox="0 0 28 28">
                        <path className="pause-button-path" d="M3,21 L9,21 L9,3 L3,3 L3,21 Z M4,19 L8,19 L8,5 L4,5 L4,19 Z M5,17 L7,17 L7,7 L5,7 L5,17 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z M16,19 L20,19 L20,5 L16,5 L16,19 Z M17,17 L19,17 L19,7 L17,7 L17,17 Z" />
                    </svg>}
                    <svg onClick={handleForwardClick} className={classNames("skip-button-svg", "right")} width="16px" height="16px" viewBox="0 0 16 16">
                        <path className={classNames("skip-button-path", "right")} d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                    </svg>
                    <svg onClick={handleForwardClick} className={classNames("skip-button-svg", "left")} width="16px" height="16px" viewBox="0 0 16 16">
                        <path className={classNames("skip-button-path", "left")} d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                    </svg>
                </div>}
                {playerOpen &&
                    <OpenUIContainer className="player-open-ui">
                        {/*Displays SONG TITLE and SONG ALBUM */}
                        <h1 className="song-name-text">{currentSong.name} - {currentSong.album}</h1>
                        <span className="artist-name-text">{currentSong.artist}</span>
                        <img className="album-cover-img open" src={currentSong.image} alt="album cover" />
                        <div className="exit-button-div" onClick={handleClick}>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" className="exit-button-svg">
                                <path fillRule="evenodd" className="exit-button-path" clipRule="evenodd" d="M4.22676 4.22676C4.5291 3.92441 5.01929 3.92441 5.32163 4.22676L12 10.9051L18.6784 4.22676C18.9807 3.92441 19.4709 3.92441 19.7732 4.22676C20.0756 4.5291 20.0756 5.01929 19.7732 5.32163L13.0949 12L19.7732 18.6784C20.0756 18.9807 20.0756 19.4709 19.7732 19.7732C19.4709 20.0756 18.9807 20.0756 18.6784 19.7732L12 13.0949L5.32163 19.7732C5.01929 20.0756 4.5291 20.0756 4.22676 19.7732C3.92441 19.4709 3.92441 18.9807 4.22676 18.6784L10.9051 12L4.22676 5.32163C3.92441 5.01929 3.92441 4.5291 4.22676 4.22676Z" />
                            </svg>
                        </div>
                        <div className="play-time-div">
                            <input className="seek-bar-input" id="volume" onChange={updateSeekBarState} onMouseDown={handleSeekDrag} onClick={handleSeekBarClick} value={seekBarValue} type="range" max="1" min="0" step="0.001" />
                        </div>
                        {/* Hiding play bar til we get seek working */}
                        <div className="svg-button-bar-open">
                            {!playAudio && <svg onClick={handlePlayClick} className="play-button-svg" width="20px" height="20px" viewBox="5 4 13 13">
                                <path className="play-button-path" d="M15 10.001c0 .299-.305.514-.305.514l-8.561 5.303C5.51 16.227 5 15.924 5 15.149V4.852c0-.777.51-1.078 1.135-.67l8.561 5.305c-.001 0 .304.215.304.514z" />
                            </svg>}
                            {playAudio && <svg onClick={handlePauseClick} className="pause-button-svg" width="20px" height="20px" viewBox="5 4 20 20">
                                <path className="pause-button-path" d="M3,21 L9,21 L9,3 L3,3 L3,21 Z M4,19 L8,19 L8,5 L4,5 L4,19 Z M5,17 L7,17 L7,7 L5,7 L5,17 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z M16,19 L20,19 L20,5 L16,5 L16,19 Z M17,17 L19,17 L19,7 L17,7 L17,17 Z" />
                            </svg>}
                            <svg onClick={handleForwardClick} className={classNames("skip-button-svg", "right")} width="20px" height="20px" viewBox="0 0 16 16">
                                <path className={classNames("skip-button-path", "right")} d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                            </svg>
                            <svg onClick={handleForwardClick} className={classNames("skip-button-svg", "left")} width="20px" height="20px" viewBox="0 0 16 16">
                                <path className={classNames("skip-button-path", "left")} d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                            </svg>
                        </div>
                        <h2 className="about-artist-title">About the Artist</h2>
                        <p className="about-artist-text">{currentSong.about}</p>
                        <div className="next-up-div">
                            <span className="next-up-title">Next Up:</span>
                            <div className="next-up-text-holder">
                                <span className="next-up-text">{nextSong.artist} - {nextSong.name} - {nextSong.album}</span>
                            </div>
                        </div>
                    </OpenUIContainer>
                }
            </div>
        </div>
    );
}

export default MusicPlayer;