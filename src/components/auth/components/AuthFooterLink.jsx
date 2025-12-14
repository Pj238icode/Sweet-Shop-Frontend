import React from "react";

export default function AuthFooterLink({ text, linkText, onClick }) {
  return (
    <p className="text-center text-gray-600 text-sm">
      {text}{" "}
      <span
        onClick={onClick}
        className="text-purple-600 cursor-pointer font-semibold"
      >
        {linkText}
      </span>
    </p>
  );
}
