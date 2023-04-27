import React from 'react';

export default function RoundSetting() {
    return (
        <div className='w-[60%] bg-white rounded-lg flex flex-col gap-5 py-10 justify-center align-middle'>
            <div className='text-black font-bold text-xl text-center'>Round 1</div>
            <input placeholder='제시어 입력' className='w-[80%] rounded-md h-12 m-auto pl-5 placeholder:text-lightgray border-lightgray border-2'/>
            <input placeholder='히든단어 입력' className='w-[80%] rounded-md h-12 m-auto pl-5 placeholder:text-lightgray border-lightgray border-2'/>
            <select className='w-[80%] rounded-md h-12 m-auto pl-5 placeholder:text-lightgray border-lightgray border-2'>
                <option value="30" selected>30초</option>
                <option value="60">60초</option>
                <option value="90">90초</option>
                <option value="120">120초</option>
            </select>
        </div>
    );
}

