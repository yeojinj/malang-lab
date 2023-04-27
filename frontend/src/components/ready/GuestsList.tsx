'use client';

import GuestGrid from './GuestGrid';

const guests = [
  {
    name: '냠냠이',
    image: '/imgs/character.png',
  },
  {
    name: '문어지지마',
    image: '/imgs/character.png',
  },
  {
    name: '지냠이',
    image: '/imgs/character.png',
  },
  {
    name: '디쥬니',
    image: '/imgs/character.png',
  },
];

export default function GuestsList() {
  return (
    <section className="my-5">
      <GuestGrid guests={guests} />
    </section>
  );
}
