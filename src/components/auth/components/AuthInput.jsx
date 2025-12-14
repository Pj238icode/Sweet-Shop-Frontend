import React from "react";

export default function AuthInput({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="block text-gray-600 mb-1">{label}</label>
      <div className="flex items-center border px-3">
        {Icon && <Icon className="text-gray-400 mr-2" />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          placeholder={placeholder}
          className="w-full py-3 outline-none"
        />
      </div>
    </div>
  );
}
