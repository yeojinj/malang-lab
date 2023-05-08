import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { changeHiddenAction, changeTimeAction, Setting } from '@/store/gameInfoSlice';
import malangs from '../../../public/imgs/mini-together.png';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { changekeywordAction } from '@/store/gameInfoSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type Props = {
    setting: Setting;
    handleClickDelete: (idx: number) => void;
    idx: number;
}

export default function RoundSetting({ setting, handleClickDelete, idx }: Props) {
    const settings = useSelector((state: RootState) => state.gameinfo.settings)
    const dispatch = useDispatch()

    // 라운드 keyword 입력하기
    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        dispatch(changekeywordAction({ idx, value: e.target.value }))
    }

    // 라운드 hidden 입력하기
    const handleChangeHidden = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        dispatch(changeHiddenAction({ idx, value: e.target.value }))
    }

    // 라운드 time 입력하기
    const handleChangeTime = (e: React.ChangeEvent<HTMLSelectElement>, idx: number) => {
        dispatch(changeTimeAction({ idx, value: e.target.value }))
    }

    return (
        <div className='w-[90%] md:w-[60%] mx-auto mb-3 relative bg-white rounded-lg flex flex-col gap-3 py-5 justify-center align-middle shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
            {idx > 0 && <XMarkIcon className='w-6 stroke-2 absolute top-3 right-3 cursor-pointer' onClick={() => handleClickDelete(idx)} />}
            <div className='text-black font-bold text-xl text-center mb-2'>Round {idx + 1}</div>
            <div className='relative w-[80%] mx-auto'>
                <div className='absolute -top-5 right-1'>
                    <Image src={malangs} alt="" className='w-[50px]' />
                </div>
                <input onChange={(e) => handleChangeKeyword(e, idx)} placeholder='제시어 입력' value={settings[idx].keyword} className='w-[100%] rounded-md h-12 m-auto pl-5 placeholder:text-lightgray border-lightgray border-2' />
            </div>
            <input placeholder='히든단어 입력' onChange={(e) => handleChangeHidden(e, idx)} value={settings[idx].hidden} className='w-[80%] rounded-md h-12 m-auto pl-5 placeholder:text-lightgray border-lightgray border-2' />
            <select onChange={(e) => handleChangeTime(e, idx)} value={settings[idx].time} className='w-[80%] rounded-md h-12 m-auto pl-5 mb-1 placeholder:text-lightgray border-lightgray border-2'>
                <option value="30">30초</option>
                <option value="60">60초</option>
                <option value="90">90초</option>
                <option value="120">120초</option>
            </select>
        </div>
    );
}

