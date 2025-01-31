import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const rawMaterialsList = ["Rice", "Beans", "Flour", "Sugar", "Salt", "Oil", "Spices"];

export default function SupplierMarketForm() {
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
