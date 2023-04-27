import GuestCard from './GuestCard';

type Props = {
  guests: {
    name: string;
    image: string;
  }[];
};

export default function GuestGrid({ guests }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[15%] gap-10 mb-10">
      {guests.map(guest => (
        <li key={guest.name}>
          <GuestCard guest={guest} />
        </li>
      ))}
    </ul>
  );
}
