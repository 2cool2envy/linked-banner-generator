import React, { createContext, useContext, useState } from 'react';

interface BannerContextType {
  bgColor: string;
  textColor: string;
  heading: string;
  subHeading: string;
  setBgColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setHeading: (text: string) => void;
  setSubHeading: (text: string) => void;
  updateBgColor: (text: string) => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider = ({ children }: { children: React.ReactNode }) => {
  const [bgColor, setBgColor] = useState<string>('#1E90FF');
  const [textColor, setTextColor] = useState<string>('#fff');
  const [heading, setHeading] = useState<string>('Senior product manager');
  const [subHeading, setSubHeading] = useState<string>(
    '8+ years of experience in audit, taxation, and financial strategy'
  );


  const updateBgColor = (color: string) => {
    console.log('setBgColor called with:', color);
    setBgColor(color);
  };

  return (
    <BannerContext.Provider
      value={{ bgColor, textColor, heading, subHeading, setBgColor, setTextColor, setHeading, setSubHeading,updateBgColor }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};
