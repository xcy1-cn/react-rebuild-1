// import Router from "./router";

// function App() {
//   return <Router />;
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import PythonAPI from "@/components/python/PythonAPI";

export default function App() {
  return (
    <Routes>
      <Route path="/address" element={<PythonAPI />} />
    </Routes>
  );
}