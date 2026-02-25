import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Search.module.css";

function Search() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchSearchData = async () => {
      const [topAlbums, newAlbums, songs] = await Promise.all([
        axios.get("https://qtify-backend.labs.crio.do/albums/top"),
        axios.get("https://qtify-backend.labs.crio.do/albums/new"),
        axios.get("https://qtify-backend.labs.crio.do/songs")
      ]);

      const albumOptions = [...topAlbums.data, ...newAlbums.data].map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: "Album",
        image: item.image
      }));

      const songOptions = songs.data.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.artists?.join(", ") || "Song",
        image: item.image
      }));

      setItems([...songOptions, ...albumOptions]);
    };

    fetchSearchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return items
      .filter((item) => item.title.toLowerCase().includes(trimmed))
      .slice(0, 8);
  }, [items, query]);

  const handleSelect = (item) => {
    setQuery(item.title);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <input
        className={styles.search}
        placeholder="Search an album of your choice"
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
      />
      <button className={styles.icon} type="button">
        <SearchIcon />
      </button>

      {isOpen && filteredItems.length > 0 && (
        <div className={styles.dropdown}>
          {filteredItems.map((item) => (
            <button
              key={item.id}
              className={styles.dropdownItem}
              type="button"
              onClick={() => handleSelect(item)}
            >
              <img src={item.image} alt={item.title} className={styles.thumb} />
              <div className={styles.meta}>
                <p>{item.title}</p>
                <span>{item.subtitle}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
