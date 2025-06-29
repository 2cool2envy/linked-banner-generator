import { type JSX, type RefObject } from 'react';
import styles from './BannerView.module.css'

interface IBannerView {
    bannerRef: RefObject<HTMLDivElement>,
    bgColor:string,
    textColor:string,
    heading:string,
    subHeading: string
}

function BannerView({bannerRef, bgColor, textColor, heading, subHeading} : IBannerView): JSX.Element {

    return (<div className={styles.bannerWrapper}>
        <div
            ref={bannerRef}
            className={styles.banner}
            style={{ background: bgColor, color: textColor }}
        >
            <h1 className={styles.bannerHeading}>{heading}</h1>
            <h2 className={styles.bannerSubheading}>{subHeading}</h2>
        </div>
    </div>)
}

export default BannerView