export default function Blur() {
  return (
    <div
      style={{
        background:
          'linear-gradient(180deg,rgba(255, 255, 255, 0.5) -0.19%,rgba(255, 255, 255, 0.25) 99.81%)',
      }}
      className="w-screen h-screen shadow-[20px_20px_100px_rgba(0,0,0,0.02)] backdrop-blur-[75px] fixed z-10"
    ></div>
  );
}
