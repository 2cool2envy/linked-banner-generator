// App.tsx
import React, { useRef, useState } from 'react';
import styles from './App.module.css';
import { bgColors, textColors } from './assets/colorCodes';
import html2canvas from 'html2canvas';
import CommonModal from './CommonModal';
import BannerView from './BannerView/BannerView';
import { useBanner } from './BannerContext';
import AdvancedEditing from './AdvancedEditing/AdvancedEditing';

interface Color {
  name: string;
  code: string;
}

interface ColorPickerProps {
  title: string;
  colors: Color[];
  selectedColor: string;
  onColorSelect: (colorName: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  title,
  colors,
  selectedColor,
  onColorSelect,
}) => (
  <>
    <p>{title}</p>
    {colors.map((color) => (
      <div
        key={color.name}
        className={`${styles.colorCircle} ${selectedColor === color.name ? styles.selected : ''}`}
        style={{ background: color.code }}
        onClick={() => onColorSelect(color.code)}
        aria-label={`Select ${color.name}`}
      ></div>
    ))}
  </>
);

const App: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement | any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    bgColor,
    textColor,
    heading,
    subHeading,
    setBgColor,
    setTextColor,
    setHeading,
    setSubHeading,
  } = useBanner();

  const downloadBanner = async () => {
    if (bannerRef.current) {
      const canvas = await html2canvas(bannerRef.current);
      const link = document.createElement('a');
      link.download = 'linkedin-banner.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="pure-form">
      <h3 className={styles.headingCenter}>LinkedIn Banner Generator</h3>
      <div className={styles.container}>
        <div className={styles.box}>
          <h4>Heading</h4>
          <input
            type="text"
            placeholder="Senior Analyst"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <h4>Sub-Heading</h4>
          <input
            type="text"
            value={subHeading}
            placeholder="Future and Options | Cash Inflow"
            onChange={(e) => setSubHeading(e.target.value)}
          />
        </div>
        <div className={styles.box}>
          <ColorPicker
            title="Choose background color:"
            colors={bgColors}
            selectedColor={bgColor}
            onColorSelect={setBgColor}
          />
          <ColorPicker
            title="Choose text color:"
            colors={textColors}
            selectedColor={textColor}
            onColorSelect={setTextColor}
          />
        </div>
      </div>

      <CommonModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <AdvancedEditing />
        <button onClick={() => setModalOpen(false)}>Close</button>
      </CommonModal>

      <div className={styles.buttonContainer}>
        <button onClick={downloadBanner} className={styles.button}>
          Download Banner
        </button>
        <button onClick={() => setModalOpen(true)} className={styles.button}>
          More awesome background colors
        </button>
      </div>

      <div className={styles.box}>
        <BannerView bannerRef={bannerRef} bgColor={bgColor} textColor={textColor}
          heading={heading} subHeading={subHeading}
        />
        {/* <div className={styles.bannerWrapper}>
          <div
            ref={bannerRef}
            className={styles.banner}
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <h1 className={styles.bannerHeading}>{heading}</h1>
            <h2 className={styles.bannerSubheading}>{subHeading}</h2>
          </div>
        </div> */}
      </div>
    </div>

  );
};

export default App;
