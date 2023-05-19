import GuestCard from './GuestCard';
import { ReadyInfo } from '@/store/readyInfoSlice';


type Props = {
  guests: ReadyInfo[];
};

export default function GuestGrid({ guests }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[15%] gap-10">
      {guests.map(guest => (
        <li key={guest.nickname}>
          <GuestCard guest={guest} />
        </li>
      ))}
    </ul>
  );
}
