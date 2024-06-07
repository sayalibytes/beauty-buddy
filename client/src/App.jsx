import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Questionnaire from "./components/Questionnaire/Questionnaire";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
