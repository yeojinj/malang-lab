
export interface Mode {
  name : string;
  image : string;
}

export default function MainPage() {
  return <div className="w-[100vw] h-[100vh] bg-cover bg-center flex justify-center align-middle" style={{ backgroundImage: "url('/imgs/bg-2.png')" }}>
    <section className="w-[60vw] h-[70vh] flex flex-col m-auto border-3 border-blue-800 bg-white">
      <h1 className="text-center">말랑연구소</h1>
      <div>

      </div>
    </section>
  </div>;
}
