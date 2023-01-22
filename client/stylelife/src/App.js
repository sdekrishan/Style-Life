import PaymentPage from "./Add To Cart/PaymentPage/PaymentPage";
import "./App.css";

import Homepageroutes from "./Homepage/Routes/homepageroutes";
import Navbar from "./Navbar/Navbar";
import AllRoutes from "./pages/AllRoutes";


function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Homepageroutes /> */}
      {/* Navigation bar here */}
       <AllRoutes />
    </div>
  );
}

export default App;
