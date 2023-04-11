import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import PublicRoutes from './publicRoutes/publicRoutes';
import Navbar from "./components/Navbar"
// import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar/>
      <PublicRoutes/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
