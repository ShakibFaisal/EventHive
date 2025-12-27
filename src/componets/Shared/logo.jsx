import React from "react";

const Logo = ({ size = "md", className = "" }) => {
  const sizes = {
    sm: { text: "text-xl", icon: "w-7 h-7" },
    md: { text: "text-2xl", icon: "w-9 h-9" },
    lg: { text: "text-3xl", icon: "w-11 h-11" },
    xl: { text: "text-4xl", icon: "w-14 h-14" },
  };

  const currentSize = sizes[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Fluid Wave Icon */}
      <div className="w-7">
        <img
          src="https://i.postimg.cc/hv2Wbqk7/d1814a585348753277d4ea9452de2e01-removebg-preview.png"
          alt="logo"
        />
      </div>

      {/* Text with gradient */}
      <span
        className={`font-bold tracking-tight ${currentSize.text} bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent`}
      >
        EventHive
      </span>
    </div>
  );
};

export default Logo;
