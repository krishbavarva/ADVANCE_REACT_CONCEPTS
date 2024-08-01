import './App.css';
import MyForm from './Components/FirstStep';
import AnalyticsForm from './Components/ForthStep';
import Navbar from './Components/Navbar';
import MultiStepForm from './Components/SecondStep2';
import AdvancedValidationForm from './Components/ThirdStep';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
      <Navbar/> 
      <Routes>
        <Route path='/' element={<MyForm/>} />
        <Route path='/multistep' element={<MultiStepForm/>} />
        <Route path='/advance' element={<AdvancedValidationForm/>} />
        <Route path='/analitics' element={<AnalyticsForm/>} />
      </Routes>
    </Router>
   
    </>
  );
}

export default App;
  