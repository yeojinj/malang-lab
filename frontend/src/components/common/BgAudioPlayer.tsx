import ReactAudioPlayer from "react-audio-player";

export default function BgAudioPlayer({ src }) {
    return (
        <ReactAudioPlayer
            src={src}
            autoPlay={true}
            // controls
            loop={true}
            onPlay={() => console.log('onPlay')}
            onPause={() => console.log('onPause')}
            onEnded={() => console.log('onEnded')}
            onError={(e) => console.error('onError', e)}
        />
    );
}

