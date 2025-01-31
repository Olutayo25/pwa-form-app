import { Link } from "react-router-dom";

export default function Card({ title, link }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200">
      <Link to={link} className="block text-center font-bold">{title}</Link>
    </div>
  );
}
