

export default function NotFound() {
  const notfound ='https://s3.ap-northeast-2.amazonaws.com/static.malang-lab.com/static/notfound.png'
  return <div
    className="min-h-screen bg-cover bg-center flex flex-col align-middle justify-center bg-bg-4"
  >
    <div className='flex flex-col'>
      <img src={notfound} className="mx-auto w-[50%]" alt='' />
      <a href="/" className='button-black w-[200px] text-center flex align-middle hover:scale-[1.02] hover:bg-white hover:text-black'><p className='m-auto'>홈으로</p></a>
    </div>
  </div>;
}
