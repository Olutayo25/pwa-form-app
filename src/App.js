import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dexie from "dexie";

// Initialize IndexedDB
const db = new Dexie("FormDatabase");
db.version(1).stores({ responses: "++id, formType, data" });

const rawMaterialsList = ["Rice", "Beans", "Flour", "Sugar", "Salt", "Oil", "Spices"];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormApp />} />
        <Route path="/form1" element={<SupplierMarketForm />} />
      </Routes>
    </Router>
  );
}

function FormApp() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", syncData);
    window.addEventListener("offline", () => setIsOnline(false));
    return () => {
      window.removeEventListener("online", syncData);
      window.removeEventListener("offline", () => setIsOnline(false));
    };
  }, []);

  async function syncData() {
    setIsOnline(true);
    const unsyncedData = await db.responses.toArray();
    for (let entry of unsyncedData) {
      await sendToGoogleSheets(entry);
      await db.responses.delete(entry.id);
    }
  }

  async function sendToGoogleSheets(data) {
    console.log("Sending to Google Sheets:", data);
  }

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
      </div>
      <p className={isOnline ? "text-green-500" : "text-red-500"}>{isOnline ? "Online" : "Offline"}</p>
    </div>
  );
}

function Card({ title, link }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200">
      <Link to={link} className="block text-center font-bold">{title}</Link>
    </div>
  );
}

function SupplierMarketForm() {
  const [formData, setFormData] = useState([{ date: "", rawMaterial: "", quantity: "", unit: "kg", amount: "", invoiceNumber: "" }]);

  const handleChange = (index, e) => {
    const updatedData = [...formData];
    updatedData[index][e.target.name] = e.target.value;
    setFormData(updatedData);
  };

  const addMoreMaterials = () => {
    setFormData([...formData, { date: "", rawMaterial: "", quantity: "", unit: "kg", amount: "", invoiceNumber: "" }]);
  };

  const removeMaterial = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Supplier/Market Purchase Record</h2>
      <form className="space-y-4">
        {formData.map((entry, index) => (
          <div key={index} className="space-y-2 border-b pb-4">
            <Input name="date" type="date" value={entry.date} onChange={(e) => handleChange(index, e)} required />
            <Select name="rawMaterial" value={entry.rawMaterial} onChange={(e) => handleChange(index, e)}>
              <option value="">Select Raw Material</option>
              {rawMaterialsList.map((material, idx) => (
                <option key={idx} value={material}>{material}</option>
              ))}
            </Select>
            <div className="flex space-x-2">
              <Input name="quantity" type="number" placeholder="Quantity" value={entry.quantity} onChange={(e) => handleChange(index, e)} required />
              <Select name="unit" value={entry.unit} onChange={(e) => handleChange(index, e)}>
                <option value="kg">kg</option>
                <option value="pcs">pcs</option>
                <option value="ltrs">ltrs</option>
              </Select>
            </div>
            <Input name="amount" type="number" placeholder="Amount" value={entry.amount} onChange={(e) => handleChange(index, e)} required />
            <Input name="invoiceNumber" placeholder="Invoice Number (Optional)" value={entry.invoiceNumber} onChange={(e) => handleChange(index, e)} />
            <Button type="button" onClick={() => removeMaterial(index)} className="bg-red-500 text-white">Delete</Button>
          </div>
        ))}
        <Button type="button" onClick={addMoreMaterials}>Add More</Button>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
