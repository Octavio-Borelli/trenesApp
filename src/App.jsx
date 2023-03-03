import './App.css';
import Proveedor from './context/Proveedor';
import Rutas from './routes';

function App() {
  return (
    <>
      <Proveedor >
        <Rutas />
      </Proveedor >
    </>
  );
}

export default App;
