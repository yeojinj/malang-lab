type Props = {
    setNickname: (str:string) => void;
    handleClickNickname: () => void
}

export default function NicknameForm({setNickname, handleClickNickname} : Props) {

    const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
      };

    return (
        <section className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] flex flex-col justify-center align-middle gap-5">
            <p className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
                닉네임 설정하기
            </p>
            <input
                type="text"
                placeholder="닉네임 입력"
                onChange={handleChangeNickname}
                className="block w-[80%] sm:w-[60%] h-12 mx-auto pl-5 rounded-[5px] text-lg"
            />
            <button
                className="button-black w-[80%] sm:w-[60%]]"
                onClick={handleClickNickname}
            >
                완료
            </button>
        </section>
    );
}

