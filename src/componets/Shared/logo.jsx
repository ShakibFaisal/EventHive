import React from "react";

const Logo = ({ size = "md", className = "", isTransparent = false }) => {
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
          src="https://i.ibb.co.com/67K5Y7VG/logoipsum-392.webp"
          alt="logo"
          className={isTransparent ? "brightness-0 invert" : ""}
        />
      </div>

      {/* Text with gradient or white */}
      <span
        className={`font-bold tracking-tight ${currentSize.text} ${
          isTransparent ? "text-white" : "text-[#a3e635]"
        }`}
      >
        EventHive
      </span>
    </div>
  );
};

export default Logo;
