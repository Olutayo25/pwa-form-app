import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SupplierMarketForm from "./pages/SupplierMarketForm";
import RawMaterialsRequisited from "./pages/RawMaterialsRequisited";
import ProductsSold from "./pages/ProductsSold";
import WastageReport from "./pages/WastageReport";
import MaterialUsage from "./pages/MaterialUsage";
import ViewSubmissions from "./pages/ViewSubmissions";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form1" element={<SupplierMarketForm />} />
        <Route path="/form2" element={<RawMaterialsRequisited />} />
        <Route path="/form3" element={<ProductsSold />} />
        <Route path="/form4" element={<WastageReport />} />
        <Route path="/form5" element={<MaterialUsage />} />
        <Route path="/submissions" element={<ViewSubmissions />} />
      </Routes>
    </Router>
  );
}
