import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className="flex m-3 p-1 items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div className="font-semibold text-[17px]">{track.title}</div>
        <div className="text-black text-[15px] opacity-50">{track.artist}</div>
      </div>
    </div>
  )
}
