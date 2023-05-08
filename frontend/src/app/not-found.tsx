import Image from 'next/image';
import notfound from '../../public/imgs/notfound.png'

export default function NotFound() {
  return <div
    className="min-h-screen bg-cover bg-center flex flex-col align-middle justify-center"
    style={{ backgroundImage: "url('/imgs/bg-4.png')" }}
  >
    <div className='flex flex-col'>
      <Image src={notfound} className="mx-auto w-[60%]" alt='' />
      <a href="/" className='button-black w-[200px] text-center flex align-middle hover:scale-[1.02] hover:bg-white hover:text-black'><p className='m-auto'>홈으로</p></a>
    </div>
  </div>;
}
