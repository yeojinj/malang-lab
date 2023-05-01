import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Round } from '@/store/roundSlice';

type Props = {
    roundinfo: Round;
    handleClickDelete: (idx:number) => void;
    idx: number;
}

export default function RoundSetting({ roundinfo, handleClickDelete, idx }: Props) {

    return (
        <div className='w-[60%] mx-auto mb-3 relative bg-white rounded-lg flex flex-col gap-3 py-5 justify-center align-middle shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
            <XMarkIcon className='w-6 stroke-2 absolute top-3 right-3 cursor-pointer' onClick={() => handleClickDelete(idx)} />
            <div className='text-black font-bold text-xl text-center mb-2'>Round {idx+1}</div>
            <input placeholder={roundinfo.topic === '' ? '제시어 입력' : `${roundinfo.topic}`} className='w-[80%] rounded-md h-12 m-auto pl-5 placeholder:text-lightgray border-lightgray border-2' />
            <input placeholder={roundinfo.hidden === '' ? '히든단어 입력' : `${roundinfo.hidden}`} className='w-[80%] rounded-md h-12 m-auto pl-5 placeholder:text-lightgray border-lightgray border-2' />
            <select defaultValue={roundinfo.seconds === 0 ? "30" : `${roundinfo.seconds}`} className='w-[80%] rounded-md h-12 m-auto pl-5 mb-1 placeholder:text-lightgray border-lightgray border-2'>
                <option value="30">30초</option>
                <option value="60">60초</option>
                <option value="90">90초</option>
                <option value="120">120초</option>
            </select>
        </div>
    );
}

