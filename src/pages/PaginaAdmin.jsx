import React from "react";
export default function PaginaAdmin() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de administración</h1>
      <p className="text-gray-700">Solo los usuarios con rol <strong>"admin y Creador"</strong> pueden ver esta página.</p>
    </div>
  );
}