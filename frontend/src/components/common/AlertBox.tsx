type Props = {
  text: string;
};

export default function AlertBox({ text }: Props) {
  return (
    <div className="bg-white shadow-[7px_7px_10px_rgba(0,0,0,0.25)] rounded-[15px] absolute w-[50vw] h-[20vh]">
      <h1 className="font-bold text-[#44474B] text-[3rem] text-center">{text}</h1>
    </div>
  );
}
