  import { useState, useEffect } from "react";
  import SpotifyWebApi from "spotify-web-api-node";
  import Player from "../components/Player";
  import useAuth from "../hook/useAuth";
  import Back from '../assets/images/back.svg';
  import Forward from '../assets/images/forward.svg';
import axios from "axios";

  const spotifyApi = new SpotifyWebApi({
    clientId: "f4c8187844e84e029cf3017d97de1b4b",
  });

  export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [benomTracks, setBenomTracks] = useState([]);
    const [billieEilishTracks, setBillieEilishTracks] = useState([]);
    const [theWeekndTracks, setTheWeekndTracks] = useState([]);
    const [showAllBenomTracks, setShowAllBenomTracks] = useState(false);
    const [showAllBillieEilishTracks, setShowAllBillieEilishTracks] = useState(false);
    const [showAllTheWeekndTracks, setShowAllTheWeekndTracks] = useState(false);
    const [searchTermTrack, setSearchTermTrack] = useState('');
    const [searchResultsTrack, setSearchResultsTrack] = useState([]);
    const [searchTermArtist, setSearchTermArtist] = useState('');
    const [searchResultsArtist, setSearchResultsArtist] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [searchResultsTrackLimit, setSearchResultsTrackLimit] = useState(4);
    const [showAllSearchResultsTrack, setShowAllSearchResultsTrack] = useState(false);
    const [lyrics, setLyrics] = useState("");
    

    useEffect(() => {
      if (!accessToken) return;

      spotifyApi.setAccessToken(accessToken);

      if (!searchTermTrack) {
        setSearchResultsTrack([]);
      } else {
        spotifyApi.searchTracks(searchTermTrack)
          .then(data => {
            const tracks = data.body.tracks.items.map(item => ({
              id: item.id,
              name: item.name,
              previewUrl: item.preview_url,
              albumName: item.album.name,
              albumImage: item.album.images[0].url,
              artistName: item.artists[0].name,
              uri: item.uri
            }));
            setSearchResultsTrack(tracks);
          })
          .catch(error => {
            console.error(error);
          });
      }

      if (!searchTermArtist) {
        setSearchResultsArtist([]);
      } else {
        spotifyApi.searchArtists(searchTermArtist)
          .then(data => {
            const artists = data.body.artists.items.map(item => ({
              id: item.id,
              name: item.name,
              image: item.images[0].url,
              uri: item.uri,
              popularity: item.popularity,
              followers: item.followers.total,
            }));
            setSearchResultsArtist(artists);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }, [accessToken, searchTermTrack, searchTermArtist]);

    const handleTrackClick = track => {
      setPlayingTrack(track);
    };

    const handleArtistClick = artist => {
      spotifyApi.getArtistTopTracks(artist.id)
        .then(data => {
          const tracks = data.body.tracks.map(track => ({
            id: track.id,
            name: track.name,
            previewUrl: track.preview_url,
            albumName: track.album.name,
            albumImage: track.album.images[0].url,
            artistName: track.artists[0].name,
            uri: track.uri
          }));
          setSearchResultsTrack(tracks);
        })
        .catch(error => {
          console.error(error);
        });
    };

    const renderSearchResultsTrack = () => {
      return searchResultsTrack.slice(0, searchResultsTrackLimit).map((track, index) => (
        <div  key={index} className="bg-[#1b1b1bbe] w-[200px] h-[280px] rounded-md p-[20px] cursor-pointer" onClick={() => handleTrackClick(track)}>
          <img src={track.albumImage} alt={track.albumName} className="rounded-md" width={172} height={172}/>
          <div className="flex flex-col mt-5 gap-1">
          <p className="text-white text-[18px] leading-[20px]">{track.artistName}</p>
          <p className="text-[#B3B3B3] text-[16px] leading-[20px]">{track.name}</p>
          </div>
        </div>
      ));
    };

    const renderSearchResultsArtist = () => {
      return searchResultsArtist.map((artist, index) => (
        <div className="bg-[#1b1b1bbe] w-[200px] h-[280px] rounded-md p-[20px] cursor-pointer" key={index} onClick={() => handleArtistClick(artist)}>
          <img className="rounded-md mb-[20px]" width={190} height={190} src={artist.image} alt={artist.name} />
          <p className="text-[#B3B3B3] text-[20px] leading-[20px] mb-5">{artist.name}</p>
        </div>
      ));
    };

    const handleSeeAllClickSearchResultsTrack = () => {
      setShowAllSearchResultsTrack(!showAllSearchResultsTrack);
      setSearchResultsTrackLimit(showAllSearchResultsTrack ? 4 : searchResultsTrack.length);
    };

    useEffect(() => {
      if (!accessToken) return;

      spotifyApi.setAccessToken(accessToken);

      // Benom
      spotifyApi.searchArtists('Benom')
        .then(data => {
          const artistId = data.body.artists.items[0].id;
          return spotifyApi.getArtistTopTracks(artistId, 'UZ');
        })
        .then(data => {
          const fetchedTracks = data.body.tracks.map(track => ({
            name: track.name,
            previewUrl: track.preview_url,
            albumName: track.album.name,
            albumImage: track.album.images[0].url,
            artistName: track.artists[0].name,
            uri: track.uri
          }));
          setBenomTracks(fetchedTracks.slice(0, showAllBenomTracks ? fetchedTracks.length : 4));
        })
        .catch(error => {
          console.error(error);
        });

      // Billie Eilish
      spotifyApi.searchArtists('Billie Eilish')
        .then(data => {
          const artistId = data.body.artists.items[0].id;
          return spotifyApi.getArtistTopTracks(artistId, 'US');
        })
        .then(data => {
          const fetchedTracks = data.body.tracks.map(track => ({
            name: track.name,
            previewUrl: track.preview_url,
            albumName: track.album.name,
            albumImage: track.album.images[0].url,
            artistName: track.artists[0].name,
            uri: track.uri
          }));
          setBillieEilishTracks(fetchedTracks.slice(0, showAllBillieEilishTracks ? fetchedTracks.length : 4));
        })
        .catch(error => {
          console.error(error);
        });

      //  The Weeknd's
      spotifyApi.searchArtists('The Weeknd')
        .then(data => {
          const artistId = data.body.artists.items[0].id;
          return spotifyApi.getArtistTopTracks(artistId);
        })
        .then(data => {
          const fetchedTracks = data.body.tracks.map(track => ({
            name: track.name,
            previewUrl: track.preview_url,
            albumName: track.album.name,
            albumImage: track.album.images[0].url,
            artistName: track.artists[0].name,
            uri: track.uri
          }));
          setTheWeekndTracks(fetchedTracks.slice(0, showAllTheWeekndTracks ? fetchedTracks.length : 4));
        })
        .catch(error => {
          console.error(error);
        });

        
    }, [accessToken, showAllBenomTracks, showAllBillieEilishTracks, showAllTheWeekndTracks]);

    useEffect(() => {
      if (!playingTrack) return;
  
      axios
        .get("http://localhost:3001/lyrics", {
          params: {
            track: playingTrack.name,
            artist: playingTrack.artistName,
          },
        })
        .then((res) => {
          setLyrics(res.data.lyrics);
        })
        .catch(() => {
          setLyrics("Lyrics not found");
        });
    }, [playingTrack]);

    const handleSeeAllClickBenom = () => {
      setShowAllBenomTracks(!showAllBenomTracks);
    };

    const handleSeeAllClickBillieEilish = () => {
      setShowAllBillieEilishTracks(!showAllBillieEilishTracks);
    };

    const handleSeeAllClickTheWeeknd = () => {
      setShowAllTheWeekndTracks(!showAllTheWeekndTracks);
    };


    const truncateText = (text) => {
      const words = text.split(' ');
      return words.length > 5 ? '...' : text;
    };

    

    return (
      <>
        <div className="bg p-[30px] mb-[80px]">
          <div>
            <div className="flex items-center space-x-5 mb-[40px]">
              <img src={Back} alt="back" width={35} height={35}/>
              <img src={Forward} alt="forward" width={35} height={35}/>
            </div>
            <div className="pb-[230px]">
              <h1 className="font-bold leading-[50px] text-[39px] text-white">Good afternoon</h1>
            </div>
            <div className="flex items-center justify-between mb-[50px]">
              <input
              className="p-1.5 rounded-md w-[45%] outline-none"
                type="text"
                placeholder="Search tracks..."
                value={searchTermTrack}
                onChange={(e) => setSearchTermTrack(e.target.value)}
              />
              <input
              className="p-1.5 rounded-md w-[45%] outline-none"
                type="text"
                placeholder="Search artists..."
                value={searchTermArtist}
                onChange={(e) => setSearchTermArtist(e.target.value)}
              />
            </div>
            {playingTrack && <div className="text-white text-center flex items-center justify-center w-[400px] mx-auto mb-[20px]">{lyrics}</div>}
            <div >
              {/* <div className="flex flex-wrap justify-between gap-5">
              {renderSearchResultsTrack()}
              </div>
              <div className="flex flex-wrap justify-between gap-5">
              {renderSearchResultsArtist()}
              </div> */}
              <div>
                <span className="text-[16px] leading-[20px] text-[#ADADAD] cursor-pointer" onClick={handleSeeAllClickSearchResultsTrack}>
                  {showAllSearchResultsTrack ? "SHOW LESS" : "SEE ALL"}
                </span>
              </div>
              <div className="flex display flex-wrap items-center justify-between mt-8 gap-5">
                {renderSearchResultsTrack()}
              </div>
            <div className="flex flex-wrap justify-between gap-5 mt-8">
              {renderSearchResultsArtist()}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mt-8">
                <h2 className="text-white text-[30px] leading-[30px]">Benom</h2>
                <span className="text-[16px] leading-[20px] text-[#ADADAD] cursor-pointer" onClick={handleSeeAllClickBenom}>
                  {showAllBenomTracks ? "SHOW LESS" : "SEE ALL"}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
                {benomTracks.map((track, index) => (
                  <div
                    key={index}
                    className={`bg-[#1B1B1B] w-[210px] h-[310px] rounded-md p-[20px] ${showAllBenomTracks ? 'fade-in' : 'fade-out'}`}
                    onClick={() => setPlayingTrack(track)}
                  >
                    <div className="flex items-start flex-col">
                      <img src={track.albumImage} alt={track.albumName} className="rounded-md" width={172} height={172}/>
                      <div className="flex flex-col mt-5 gap-1">
                        <p className="text-[#B3B3B3] text-[16px] leading-[20px]">{truncateText(track.artistName)}</p>
                        <h2 className="text-[20px] font-bold leading-[20px] text-white">{truncateText(track.name)}</h2>
                        <p className="text-[#B3B3B3] text-[16px] leading-[20px]">{truncateText(track.albumName)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-8">
                <h2 className="text-white text-[30px] leading-[30px]">Billie Eilish</h2>
                <span className="text-[16px] leading-[20px] text-[#ADADAD] cursor-pointer" onClick={handleSeeAllClickBillieEilish}>
                  {showAllBillieEilishTracks ? "SHOW LESS" : "SEE ALL"}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
                {billieEilishTracks.map((track, index) => (
                  <div
                    key={index}
                    className={`bg-[#1B1B1B] w-[210px] h-[310px] rounded-md p-[20px] ${showAllBillieEilishTracks ? 'fade-in' : 'fade-out'}`}
                    onClick={() => setPlayingTrack(track)}
                  >
                    <div className="flex items-start flex-col">
                      <img src={track.albumImage} alt={track.albumName} className="rounded-md" width={172} height={172}/>
                      <div className="flex flex-col mt-5 gap-1">
                        <p className="text-[#B3B3B3] text-[16px] leading-[20px]">{truncateText(track.artistName)}</p>
                        <h2 className="text-[20px] font-bold leading-[20px] text-white">{truncateText(track.name)}</h2>
                        <p className="text-[#B3B3B3] text-[16px] leading-[20px]">{truncateText(track.albumName)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-8">
                <h2 className="text-white text-[30px] leading-[30px]">The Weeknd</h2>
                <span className="text-[16px] leading-[20px] text-[#ADADAD] cursor-pointer" onClick={handleSeeAllClickTheWeeknd}>
                  {showAllTheWeekndTracks ? "SHOW LESS" : "SEE ALL"}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
                {theWeekndTracks.map((track, index) => (
                  <div
                    key={index}
                    className={`bg-[#1B1B1B] w-[210px] h-[310px] rounded-md p-[20px] ${showAllTheWeekndTracks ? 'fade-in' : 'fade-out'}`}
                    onClick={() => setPlayingTrack(track)}
                  >
                    <div className="flex items-start flex-col">
                      <img src={track.albumImage} alt={track.albumName} className="rounded-md" width={172} height={172}/>
                      <div className="flex flex-col mt-5 gap-1">
                        <p className="text-[#B3B3B3] text-[16px] leading-[20px]">{truncateText(track.artistName)}</p>
                        <h2 className="text-[20px] font-bold leading-[20px] text-white">{truncateText(track.name)}</h2>
                        <p className="text-[#B3B3B3] text-[16px] leading-[20px]">{truncateText(track.albumName)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </>
    );
  }
