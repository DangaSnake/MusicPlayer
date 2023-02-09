import "./MusicPlayer.css";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

enum SongKey {
    Song1 = "denzel",
    Song2 = "tyler",
    Song3 = "unknown"
}

const SONG_LIST: readonly SongKey[] = [SongKey.Song1, SongKey.Song2, SongKey.Song3];

const SONG_OBJECTS: Record<SongKey, { name: string, album: string, artist: string, image: string, about: string, audio: string }> = {
    [SongKey.Song1]: {
        "name": "Dark & Violent",
        "album": "Nostalgic 64",
        "artist": "Denzel Curry",
        "image": "album-cover-1.jpg",
        "about": "Denzel Curry is an American rapper and songwriter from Carol City, Florida. He is known for his energetic and charismatic performances, and his music often tackles themes of violence, mental health, and societal issues. Curry rose to prominence with the release of his album 'Imperial' in 2016, and has since released several more critically acclaimed projects, including 'TA13OO' and 'Zuu'. He is considered one of the leading voices in modern rap music and continues to grow in popularity.",
        "audio": "dark-and-violent.mp3"
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

    useEffect(() => {
        setAudio(new Audio(`${currentSong.audio}`));
    }, [songID]);


    const handleAudioChange = () => {
        setAudio(new Audio(`${currentSong.audio}`));
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        const element = event.target as HTMLElement;
        playerOpen ? setPlayerOpen(false) : setPlayerOpen(true);
    }

    const handlePlayClick = (event: React.MouseEvent<HTMLOrSVGElement>): void => {
        event.stopPropagation()
        setPlayAudio(true);
        audio.play();
    }

    const handlePauseClick = (event: React.MouseEvent<HTMLOrSVGElement>): void => {
        event.stopPropagation();
        audio.pause();
        setPlayAudio(false);
    }

    const handleForwardClick = (event: React.MouseEvent<HTMLOrSVGElement>):void => {
        event.stopPropagation();
        const clickedElement = event.target as HTMLElement;
        const elementClassList = clickedElement.classList;
        
        if (clickedElement.classList.contains("right")) {
            setSongID((prev) => {
                if (prev === SONG_LIST.length - 1) {
                    return (0);
                }
    
                return(prev + 1);
            })
        } else {
            setSongID((prev) => {
                if (prev === 0) {
                    return(SONG_LIST.length - 1);
                }

                return (prev - 1);
            }) 
        }
        audio.pause();
        setPlayAudio(false);
    }

    /* Ok so here we are working on getting the songs to switch 
    When you click I want us to move to the next "SongKey" and pass that so that we can get all the info from
    each object 
    */

    const currentSong = SONG_OBJECTS[SONG_LIST[songID]];
    
    

    return (
        <div onClick={handleClick} className={classNames("player-holder", playerOpen && "player-open")}>
            {!playerOpen && <div className={"player-closed-ui"}>
                <img className="album-cover-img" src={currentSong.image} alt="album cover" />
                {!playAudio && <svg onClick={handlePlayClick} className="play-button-svg" width="20px" height="20px" viewBox="0 0 20 20">
                    <path className="play-button-path" d="M15 10.001c0 .299-.305.514-.305.514l-8.561 5.303C5.51 16.227 5 15.924 5 15.149V4.852c0-.777.51-1.078 1.135-.67l8.561 5.305c-.001 0 .304.215.304.514z" />
                </svg>}
                {playAudio && <svg onClick={handlePauseClick} className="pause-button-svg" width="20px" height="20px" viewBox="0 0 28 28">
                    <path className="pause-button-path" d="M3,21 L9,21 L9,3 L3,3 L3,21 Z M4,19 L8,19 L8,5 L4,5 L4,19 Z M5,17 L7,17 L7,7 L5,7 L5,17 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z M16,19 L20,19 L20,5 L16,5 L16,19 Z M17,17 L19,17 L19,7 L17,7 L17,17 Z" />
                </svg>}
                <svg className={classNames("skip-button-svg", "right")} width="16px" height="16px" viewBox="0 0 16 16">
                    <path className={classNames("skip-button-path", "right")} d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                </svg>
                <svg className={classNames("skip-button-svg", "left")} width="16px" height="16px" viewBox="0 0 16 16">
                    <path className={classNames("skip-button-path", "left")} d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                </svg>
            </div>}
            {playerOpen &&
                <OpenUIContainer className="player-open-ui">
                    {/*Displays SONG TITLE and SONG ALBUM */}
                    <h1 className="song-name-text">{currentSong.name} - {currentSong.album}</h1>
                    <img className="album-cover-img open" src={currentSong.image} alt="album cover" />
                    <div className="play-time-div">
                        <div className="time-bar">
                            <div className="time-bar-button" />
                        </div>
                    </div>
                    <div className="svg-button-bar-open">
                        {!playAudio && <svg onClick={handlePlayClick} className="play-button-svg" width="20px" height="20px" viewBox="5 4 13 13">
                            <path className="play-button-path" d="M15 10.001c0 .299-.305.514-.305.514l-8.561 5.303C5.51 16.227 5 15.924 5 15.149V4.852c0-.777.51-1.078 1.135-.67l8.561 5.305c-.001 0 .304.215.304.514z" />
                        </svg>}
                        {playAudio && <svg onClick={handlePauseClick} className="pause-button-svg" width="20px" height="20px" viewBox="0 0 20 20">
                            <path className="pause-button-path" stroke-width="2" d="M3,21 L9,21 L9,3 L3,3 L3,21 Z M4,19 L8,19 L8,5 L4,5 L4,19 Z M5,17 L7,17 L7,7 L5,7 L5,17 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z M16,19 L20,19 L20,5 L16,5 L16,19 Z M17,17 L19,17 L19,7 L17,7 L17,17 Z" />
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
                            <span className="next-up-text">Tyler The Creator - Smuckers - Cherry Bomb</span>
                        </div>
                    </div>
                </OpenUIContainer>
            }
        </div>
    );
}

export default MusicPlayer;