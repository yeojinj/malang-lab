import GuestsList from '@/components/ready/GuestsList';
import PinCode from '@/components/ready/EnterCode';
import StartBtn from '@/components/ready/StartBtn';
import UserNum from '@/components/ready/UserNum';

export default function ReadyPage() {
  const isHost = false;
  return (
    <>
      {isHost ? (
        <div
          className="min-h-screen bg-cover flex flex-col align-middle"
          style={{ backgroundImage: "url('/imgs/bg-1.png')" }}
        >
          <PinCode code={990107} />
          <div className="text-center text-[#44474B]">
            <h1 className="text-[2rem] font-bold">말랑이의 연구소</h1>
            <h2 className="my-5">
              준비가 완료되면 시작하기 버튼을 눌러주세요!
            </h2>
            <div>
              <StartBtn />
              <UserNum num={6} />
            </div>
          </div>
          <GuestsList height={32}/>
        </div>
      ) : (
        <div
          className="min-h-screen bg-cover flex flex-col align-middle pt-10 bg-repeat-y"
          style={{ backgroundImage: "url('/imgs/bg-1.png')" }}
        >
          <div className="text-center text-[#44474B]">
            <h1 className="text-[2rem] font-bold">말랑이의 연구소</h1>
            <h2 className="my-5">당신의 닉네임이 있는지 확인해보세요! </h2>
            <UserNum num={6} />
            <GuestsList height={67}/>
          </div>
        </div>
      )}
    </>
  );
}
