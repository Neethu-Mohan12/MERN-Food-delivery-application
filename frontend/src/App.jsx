import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <ToastContainer />
      
      <main className="py-3 mt-14">
        <Outlet />
      </main>
      {/* <Footer/> */}
    </>
  );
};

export default App;