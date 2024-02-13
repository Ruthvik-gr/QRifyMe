import { useState } from 'react'
import { Home } from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HealthCare } from './components/HealthCare';
import { Automobiles } from './components/Automobiles';
import { StudentDetails } from './components/StudentDetails';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
          <Route path="healthcare" element={<HealthCare />} />
          <Route path="automobiles" element={<Automobiles />} />
          <Route path="studentdetails" element={<StudentDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
