import 'animate.css';
import styles from '../ready/PinCode.module.css';

type Props = {
  word: string;
};

export default function WordCard({ word }: Props) {
  return (
    <div
      style={{
        background:
          'linear-gradient(180deg,rgba(255, 255, 255, 0.6) 0%,rgba(255, 255, 255, 0.3) 100%)',
      }}
      className="shadow-[20px_20px_100px_rgba(0,0,0,0.02)] backdrop-blur-[75px] rounded-[15px] w-350 p-5 animate__animated animate__bounceIn"
    >
      <div className={styles.pulsate}>
        <h1 className="text-[#44474B] text-2xl font-medium text-center truncate">{word}</h1>
      </div>
    </div>
  );
}
