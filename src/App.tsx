import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { bgColors, textColors } from './assets/colorCodes';
import html2canvas from 'html2canvas';


interface IStyles {
  [key: string]: React.CSSProperties;
}

const styles: IStyles = {
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'stretch',
  },
  box: {
    flex: 1,
    padding: '2%',
    boxSizing: 'border-box',
  },
  colorCircle: {
    width: '37px',
    height: '37px',
    display: 'inline-block',
    border: '2px solid black',
    margin: '0.2% 2%',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  headingCenter: {
    textAlign: 'center',
    margin: '2% auto',
  },
};

// Define the shape of a color object
interface Color {
  name: string;
  code: string;
}

// Define the prop types for the ColorPicker component
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
        className={selectedColor === color.name ? 'selected' : ''}
        style={{ ...styles.colorCircle, background: color.code }}
        onClick={() => onColorSelect(color.code)}
        aria-label={`Select ${color.name}`}
      ></div>
    ))}
  </>
);

const App: React.FC = () => {
  const [heading, setHeading] = useState<string>('Senior product manager');
  const [subHeading, setSubHeading] = useState<string>('8+ years of experience in audit, taxation, and financial strategy');
  const [bgColor, setBGColor] = useState<string>('#1E90FF');
  const [textColor, setTextColor] = useState<string>('#fff');
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('bgColor update', bgColor)
  }, [bgColor])

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
      <h3 style={styles.headingCenter}>LinkedIn Banner Generator</h3>
      <div style={styles.container}>
        <div style={styles.box}>
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
        <div style={styles.box}>
          <ColorPicker
            title="Choose background color:"
            colors={bgColors}
            selectedColor={bgColor}
            onColorSelect={setBGColor}
          />
          <ColorPicker
            title="Choose text color:"
            colors={textColors}
            selectedColor={textColor}
            onColorSelect={setTextColor}
          />
        </div>
      </div>

      <div className="button-container">
        <button onClick={downloadBanner} style={{ marginTop: '2rem' }}>
          Download Banner
        </button></div>


      <div style={styles.box}>


        <div style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'start', padding: '2rem' }}>
          <div
            ref={bannerRef}
            style={{
              width: '1400px',
              height: '350px',
              backgroundColor: bgColor,
              color: textColor,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <h1 style={{ margin: 0, textAlign: 'right', padding: '2%', paddingBottom: '0.5%' }}>{heading}</h1>
            <h2 style={{ marginTop: '0.5rem', textAlign: 'right', padding: '0.1% 2%' }}>{subHeading}</h2>
          </div>
        </div>

      </div>




    </div>
  );
};

export default App;
