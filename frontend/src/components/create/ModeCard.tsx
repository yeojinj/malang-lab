
import Lock from "../common/Lock";
import styles from '../create/Card.module.css';

type Props = {
    mode: {
        title: string;
        desc: string;
    }
}

export default function ModeCard({ mode }: Props) {
    return (
        // <div className="bg-white text-black rounded-lg flex flex-col justify-center align-middle relative">
                <div className={styles.checkbox}>
                    <label>
                        {mode.title === '팀전' && <Lock />}
                        <input type="checkbox" className={styles.checkboxInput} />
                        <span className={styles.checkboxTile}>
                            <p className="font-semibold text-lg mb-2">{mode.title}</p>
                            <p className="text-xs">{mode.desc}</p>
                        </span>
                    </label>
                </div>
        // </div>
    );
}

