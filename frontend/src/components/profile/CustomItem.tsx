import Image from 'next/image';
import { character, sticker } from '@/data/customdata';
import { useState } from 'react';

export default function CustomItem({ onClick }) {
  // 아이템 탭 이동
  const [activeTab, setActiveTab] = useState('캐릭터');
  const handleTab = tabId => {
    setActiveTab(tabId);
  };

  return (
    <section>
      <div className="w-full mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {['캐릭터', '스티커'].map(tabId => (
            <li key={tabId} className="w-1/2">
              <button
                className={`w-full inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === tabId
                    ? 'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                onClick={() => handleTab(tabId)}
              >
                {tabId}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-h-80">
        {[
          { id: '캐릭터', data: character },
          { id: '스티커', data: sticker },
        ].map(tab => {
          if (tab.id === activeTab)
            return (
              <div
                key={tab.id}
                className="overflow-auto max-h-60 scrollbar-hide grid grid-cols-2 gap-2"
              >
                {tab.data.map((img, idx) => {
                  return (
                    <div
                      key={idx}
                      className=" h-20 w-full flex justify-center items-center p-2 mb-2 bg-white rounded-lg"
                    >
                      <button onClick={e => onClick(img)}>
                        <Image
                          src={`https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/profile/${img}.png`}
                          alt={img}
                          width={75}
                          height={75}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            );
        })}
      </div>
    </section>
  );
}
