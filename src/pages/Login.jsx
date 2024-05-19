import React from "react"

const AUTH_URL =
"https://accounts.spotify.com/authorize?client_id=f4c8187844e84e029cf3017d97de1b4b&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played"

export default function Login() {
  return (
    <div
      className="flex justify-center align-center my-[250px]"
    >
      <a className="bg-green-500 p-2 rounded-md font-semibold text-white" href={AUTH_URL}>
        Login With Spotify
      </a>
    </div>
  )
}
