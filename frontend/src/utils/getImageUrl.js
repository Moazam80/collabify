export function getImageUrl(path) {
  if (!path) return "";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  return `${API_URL}${path}`;
}