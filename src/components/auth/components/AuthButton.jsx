import React from "react";

export default function AuthButton({
  icon: Icon,
  text,
  loading = false,
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full flex items-center justify-center gap-3
      bg-gradient-to-r from-pink-500 to-purple-600
      hover:from-pink-600 hover:to-purple-700
      text-white font-semibold py-3
      shadow-md transition rounded-none
      ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon />}
          {text} 
        </>
      )}
    </button>
  );
}


function Spinner() {
  return (
    <span
      className="w-5 h-5 border-2 border-white border-t-transparent
      rounded-full animate-spin"
      aria-label="Loading"
    />
  );
}
