import "./MusicPlayer.css";
import classNames from "classnames";
import { useState } from "react";


const MusicPlayer = (): React.ReactElement => {

    const [playerOpen, setPlayerOpen] = useState(false);
    const [playAudio, setPlayAudio] = useState(false);
    const [audio, setAudio] = useState(new Audio('dark-and-violent.mp3'))



    const handleClick = (): void => {
        playerOpen ? setPlayerOpen(false) : setPlayerOpen(true);
    }

    const handlePlayClick = (): void => {
        setPlayAudio(true);
        audio.play();
    }

    const handlePauseClick = (): void => {
        audio.pause();
        setPlayAudio(false);
    }

    return (
        <div onClick={handleClick} className={classNames("player-holder", playerOpen && "player-open")}>
            {!playerOpen && <div className={"player-closed-ui"}>
                <img className="album-cover-img" src="album-cover-1.jpg" alt="album cover" />
                {!playAudio && <svg onClick={handlePlayClick} className="play-button-svg" width="20px" height="20px" viewBox="0 0 20 20">
                    <path className="play-button-path" d="M15 10.001c0 .299-.305.514-.305.514l-8.561 5.303C5.51 16.227 5 15.924 5 15.149V4.852c0-.777.51-1.078 1.135-.67l8.561 5.305c-.001 0 .304.215.304.514z" />
                </svg>}
                {playAudio && <svg onClick={handlePauseClick} className="pause-button-svg" width="20px" height="20px" viewBox="0 0 28 28">
                    <path className="pause-button-path" stroke-width="2" d="M3,21 L9,21 L9,3 L3,3 L3,21 Z M4,19 L8,19 L8,5 L4,5 L4,19 Z M5,17 L7,17 L7,7 L5,7 L5,17 Z M15,21 L21,21 L21,3 L15,3 L15,21 Z M16,19 L20,19 L20,5 L16,5 L16,19 Z M17,17 L19,17 L19,7 L17,7 L17,17 Z" />
                </svg>}
                <svg className={classNames("skip-button-svg", "right")} width="16px" height="16px" viewBox="0 0 16 16">
                    <path className={classNames("skip-button-path", "right")} d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                </svg>
                <svg className={classNames("skip-button-svg", "left")} width="16px" height="16px" viewBox="0 0 16 16">
                    <path className={classNames("skip-button-path", "left")} d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                </svg>
            </div>}
            {playerOpen &&
                <div className="player-open-ui">
                    <h1 className="song-name-text">Dark & Violent - Nostalgic 64</h1>
                    <img className="album-cover-img open" src="album-cover-1.jpg" alt="album cover" />
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
                        <svg className={classNames("skip-button-svg", "right")} width="20px" height="20px" viewBox="0 0 16 16">
                            <path className={classNames("skip-button-path", "right")} d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                        </svg>
                        <svg className={classNames("skip-button-svg", "left")} width="20px" height="20px" viewBox="0 0 16 16">
                            <path className={classNames("skip-button-path", "left")} d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z" />
                        </svg>
                    </div>
                    <h2 className="about-artist-title">About the Artist</h2>
                    <p className="about-artist-text">Denzel Curry is an American rapper and songwriter from Carol City, Florida. He is known for his energetic and charismatic performances, and his music often tackles themes of violence, mental health, and societal issues. Curry rose to prominence with the release of his album "Imperial" in 2016, and has since released several more critically acclaimed projects, including "TA13OO" and "Zuu". He is considered one of the leading voices in modern rap music and continues to grow in popularity.</p>
                    <div className="next-up-div">
                        <span className="next-up-title">Next Up:</span>
                        <div className="next-up-text-holder">
                            <span className="next-up-text">Tyler The Creator - Smuckers - Cherry Bomb</span>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default MusicPlayer;