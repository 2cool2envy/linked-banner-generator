import { type JSX } from 'react';
import styles from "./AdvancedEditing.module.css";
import { advancedBgColors } from '../assets/colorCodes';
import { useBanner } from '../BannerContext';


function AdvancedEditing(): JSX.Element {

    const { updateBgColor } = useBanner();

    return (
        <>
            <h3> More awesome background colors</h3>
            <div className={styles.grid}>
                {Object.entries(advancedBgColors).map(([name, gradient]) => (
                    <div onClick={() => updateBgColor(gradient)} key={name} className={styles.tile} style={{ background: gradient }}>
                        <span className={styles.label}>{name}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default AdvancedEditing