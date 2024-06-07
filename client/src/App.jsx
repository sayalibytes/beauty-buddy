import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Home from "./components/Home/Home";

function App() {
  const [skinType, setSkinType] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/questionnaire" element={<Questionnaire setSkinType={setSkinType} />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/home" element={<Home skinType={skinType}/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
