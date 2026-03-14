import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import VoiceAssistant from "./pages/VoiceAssistant";
import InvoiceForm from "./pages/InvoiceForm";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <VoiceAssistant />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/invoice"
          element={
            <PrivateRoute>
              <InvoiceForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;