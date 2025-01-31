import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function Home() {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-center">
        <img src="/logo.png" alt="Business Logo" className="h-20" />
      </div>
      <h2 className="text-xl font-bold text-center">Welcome</h2>
      <div className="grid grid-cols-1 gap-4">
        <Card title="Supplier/Market Purchase Record" link="/form1" />
        <Card title="Raw Materials Requisited" link="/form2" />
        <Card title="Products Sold to Restaurant" link="/form3" />
        <Card title="Wastage/Damage Report" link="/form4" />
        <Card title="Material Usage" link="/form5" />
        <Card title="View & Edit Submissions" link="/submissions" />
      </div>
    </div>
  );
}
