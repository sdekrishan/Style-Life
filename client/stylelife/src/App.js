import "./App.css";

import Homepageroutes from "./Homepage/Routes/homepageroutes";
import Navbar from "./Navbar/Navbar";
import AdminHome from "./Pages/Admin/AdminHome";
import AllRoutes from "./Pages/AllRoutes";


function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Homepageroutes /> */}

      {/* Navigation bar here */}
      {/* <AllRoutes /> */}
      <AdminHome/>
    </div>
  );
}

export default App;
