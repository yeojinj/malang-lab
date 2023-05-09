type Props = {
    setPin : (str:string) => void;
    handleClickPin: () => void;
}

export default function PinForm({setPin, handleClickPin} : Props) {
// step2 - 닉네임 입력하기
 const handleChangePin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

    return (
        <section className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] flex flex-col justify-center align-middle gap-5">
            <p className="text-center text-4xl sm:text-5xl font-bold mb-5">참여하기</p>
            <input
                type="number"
                placeholder="PIN 번호"
                onChange={handleChangePin}
                className="block w-[80%] sm:w-[60%] h-12 mx-auto pl-5 rounded-[5px] text-lg"
            />
            <button className="button-black w-[80%] sm:w-[60%]" onClick={handleClickPin}>
                참여하기
            </button>
        </section>
    );
}

