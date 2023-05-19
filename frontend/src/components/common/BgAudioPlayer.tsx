'use client'

import React, { useRef, useState } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";

export default function BgAudioPlayer({ src }) {
    const [play, setPlay] = useState<boolean>(true);
    const playerRef = useRef<HTMLAudioElement>(null);

    const handleToggleAudio = () => {
        if (play) {
            playerRef.current?.pause();
            setPlay(false)
        } else {
            playerRef.current?.play()
            setPlay(true)
        }
    }

    return (
        <div className="fixed bottom-3 right-3 z-10">
            <audio ref={playerRef} loop autoPlay src={src} />
            {!play ? <SpeakerXMarkIcon className="w-12 white" onClick={handleToggleAudio}/> : <SpeakerWaveIcon className="w-12 white " onClick={handleToggleAudio}/> }
        </div>
    );
}

