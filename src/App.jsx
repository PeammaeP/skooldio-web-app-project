import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartPage from "./CartPage"; // Adjust path as needed

function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/carts/:id" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
