import React from 'react';
import { ViewState } from '../types';

export const Logo = () => (
  <div className="flex flex-col leading-none select-none">
    <span className="text-[#0000FF] font-black text-2xl tracking-tighter">LIFEJACKET AI</span>
    <span className="text-black font-bold text-sm tracking-widest uppercase">Sponsor Scout</span>
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyle = "font-bold py-3 px-6 transition-all duration-200 active:scale-95 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
  
  const variants = {
    primary: "bg-[#FFBF00] text-black hover:bg-[#E6AC00]", // Amber CTA
    secondary: "bg-[#0000FF] text-white hover:bg-[#0000CC]", // Blue
    accent: "bg-[#FF00FF] text-white hover:bg-[#CC00CC]", // Magenta
    outline: "bg-transparent text-black hover:bg-gray-100"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 ${className}`}>
    {children}
  </div>
);

export const Navbar: React.FC<{ setView: (v: ViewState) => void }> = ({ setView }) => (
  <nav className="sticky top-0 z-50 bg-[#DCDFFD]/95 backdrop-blur border-b-2 border-black py-4 px-4 md:px-8 flex justify-between items-center">
    <div className="cursor-pointer" onClick={() => setView('LANDING')}>
      <Logo />
    </div>
    <div className="flex gap-4">
      <button onClick={() => setView('ADMIN_LOGIN')} className="text-sm font-bold text-[#0000FF] hover:underline hidden md:block">
        Admin
      </button>
      <Button variant="primary" className="py-2 px-4 text-sm" onClick={() => setView('CHECKOUT_SELECTION')}>
        Get My List
      </Button>
    </div>
  </nav>
);

export const Badge: React.FC<{ color: string, children: React.ReactNode }> = ({ color, children }) => (
  <span className={`inline-block px-3 py-1 text-xs font-bold text-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${color}`}>
    {children}
  </span>
);
