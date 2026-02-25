import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import "./Section.css";
import {
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";

const DEMO_AUDIO_SOURCES = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
];

const getSongAudioUrl = (songId = "") => {
  const hash = songId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return DEMO_AUDIO_SOURCES[hash % DEMO_AUDIO_SOURCES.length];
};

const Section = ({ title, api, isSongsSection }) => {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [faqs, setFaqs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(api);
      setAlbums(res.data);
    };

    fetchData();
  }, [api]);

  useEffect(() => {
    if (!isSongsSection) return;

    const fetchSongsData = async () => {
      const [genresRes, faqRes] = await Promise.all([
        axios.get("https://qtify-backend.labs.crio.do/genres"),
        axios.get("https://qtify-backend.labs.crio.do/faq")
      ]);
      setGenres(genresRes.data.data);
      setFaqs(faqRes.data.data ?? faqRes.data);
    };

    fetchSongsData();
  }, [isSongsSection]);

  const filteredSongs =
    selectedGenre === "all"
      ? albums
      : albums.filter((song) => song.genre.key === selectedGenre);

  const displayData = isSongsSection ? filteredSongs : albums;

  useEffect(() => {
    if (!isSongsSection || displayData.length === 0) return;

    const currentSongExists = displayData.some((song) => song.id === currentSong?.id);
    if (!currentSongExists) {
      setCurrentSong(displayData[0]);
      setCurrentTime(0);
      setDuration(Math.ceil((displayData[0].durationInMs || 0) / 1000));
      setIsPlaying(false);
    }
  }, [currentSong?.id, displayData, isSongsSection]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentSong) {
      audio.pause();
      return;
    }

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying]);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    setCurrentTime(0);
    setDuration(Math.ceil((song.durationInMs || 0) / 1000));
    setIsPlaying(true);
  };

  const handleSeek = (_, value) => {
    const audio = audioRef.current;
    const nextTime = Array.isArray(value) ? value[0] : value;
    if (!audio) return;

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const formatTime = (totalSeconds) => {
    const safeSeconds = Number.isFinite(totalSeconds) ? Math.floor(totalSeconds) : 0;
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const artistName = useMemo(() => {
    if (!currentSong?.artists?.length) return "Album name";
    return currentSong.artists.join(", ");
  }, [currentSong]);

  return (
    <div className="section">
      <div className="sectionHeader">
        <h2>{title}</h2>
        {!isSongsSection && (
          <button onClick={() => setShowAll(!showAll)} type="button">
            {showAll ? "Collapse" : "Show All"}
          </button>
        )}
      </div>

      {isSongsSection && (
        <Tabs
          value={selectedGenre}
          onChange={(_, val) => setSelectedGenre(val)}
          className="songsTabs"
        >
          <Tab label="All" value="all" />
          {genres.map((genre) => (
            <Tab key={genre.key} label={genre.label} value={genre.key} />
          ))}
        </Tabs>
      )}

      {isSongsSection || !showAll ? (
        <Carousel
          data={displayData}
          renderComponent={(item) => (
            <Card
              image={item.image}
              title={item.title}
              follows={item.follows}
              likes={item.likes}
              onClick={() => isSongsSection && handleSongSelect(item)}
            />
          )}
        />
      ) : (
        <div className="cardGrid">
          {albums.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              title={item.title}
              follows={item.follows}
            />
          ))}
        </div>
      )}

      {isSongsSection && (
        <>
          <div className="faqSection">
            <h2 className="faqTitle">FAQs</h2>
            <div className="faqList">
              {faqs.map((faq) => (
                <Accordion key={faq.id || faq.question} className="faqAccordion">
                  <AccordionSummary
                    expandIcon={<KeyboardArrowDownIcon className="faqExpandIcon" />}
                  >
                    {faq.question}
                  </AccordionSummary>
                  <AccordionDetails>{faq.answer}</AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>

          <div className="songPlayer">
            <audio
              ref={audioRef}
              src={currentSong ? getSongAudioUrl(currentSong.id) : ""}
              onTimeUpdate={(event) => setCurrentTime(event.target.currentTime)}
              onLoadedMetadata={(event) => {
                const audioDuration = event.target.duration;
                if (Number.isFinite(audioDuration) && audioDuration > 0) {
                  setDuration(audioDuration);
                }
              }}
              onEnded={() => setIsPlaying(false)}
            />

            <div className="playerTrackInfo">
              <img
                src={currentSong?.image || displayData[0]?.image}
                alt={currentSong?.title || "Song"}
                className="playerCover"
              />
              <div className="playerMeta">
                <p className="playerSongName">{currentSong?.title || "Song name"}</p>
                <p className="playerAlbumName">{artistName}</p>
              </div>
            </div>

            <div className="playerControls">
              <button
                className="playerIconBtn"
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
              >
                {isPlaying ? (
                  <PauseCircleRoundedIcon className="playerPlayPause" />
                ) : (
                  <PlayCircleRoundedIcon className="playerPlayPause" />
                )}
              </button>

              <div className="playerTimeline">
                <span>{formatTime(currentTime)}</span>
                <Slider
                  value={Math.min(currentTime, duration || 0)}
                  max={duration || 1}
                  onChange={handleSeek}
                  className="playerSlider"
                />
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Section;
