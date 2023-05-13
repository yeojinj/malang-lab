import { LockClosedIcon } from '@heroicons/react/24/solid';

export default function Lock() {
  return (
    <div
      className="pointer-events-none w-full h-full rounded-lg shadow-[20px_20px_100px_rgba(0,0,0,0.02)] absolute top-0 left-0 z-1"
      style={{ background: 'rgba(255, 255, 255, 0.8)' }}
    >
      <LockClosedIcon className="w-6 absolute top-2 left-2 text-[#8A8A8A]" />
    </div>
  );
}
