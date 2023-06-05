import { getBarColor } from "./helpers";
import styles from "./Bar.module.css"

type BarProps = {
    freePlaces: number
}

const Bar = ({ freePlaces }: BarProps) => {
    const spheres: JSX.Element[] = [];
    for (let i = 0; i < freePlaces; i++) {
        spheres.push(
            <div
                key={i}
                className={styles.sphere}
                style={{ backgroundColor: getBarColor(freePlaces) }}
            >
                P
            </div>
        );
    }
    return <div className={styles.bar}>{spheres}</div>;
};

export default Bar;  