'use client'

import styles from '../create/Card.module.css';
import Lock from '../common/Lock';
import { CheckIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'


type Props = {
    game: {
        id: string;
        title1: string;
        title2: string;
        desc: string[];
    },
    selectedGame: string;
    handleClickGame: (id: string) => void;
}

export default function GameCard({ game, handleClickGame, selectedGame }: Props) {
    return (
        <div className={`relative bg-white text-black rounded-md p-5 hover:bg-black hover:text-white 
        ${selectedGame === game.id ? 'bg-black text-white' : ''} 
        ${game.id === 'NOTYET' ? 'pointer-events-none' : ''}`}
            onClick={() => handleClickGame(game.id)}>
            {game.id === 'NOTYET' && <Lock />}
            <CheckCircleIcon className={`w-6 text-white absolute top-2 left-2 ${selectedGame === game.id ? '' : 'hidden'}`} />
            <span className='my-2'>
                <div className="w-[80%] m-auto my-7">
                    <p className="text-xs">{game.title2}</p>
                    <p className="font-semibold text-lg mb-2">{game.title1}</p>
                    <div className='mt-12'>
                        {game.desc.map((item) => (
                            <div key={item} className="flex gap-1 my-2">
                                <CheckIcon className='w-4' />
                                <p className="text-xs font-semibold">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </span>
        </div>
    );
}

