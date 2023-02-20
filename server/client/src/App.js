
import ClientModule from './clientComponents/ClientModule';
import ProductModule from "./productComponents/ProductModule"
import { BrowserRouter,Routes ,Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
       
       <BrowserRouter>
        <Routes>
            <Route path='/product' element={<ProductModule/>}/>
            <Route path='/client' element={<ClientModule/>}/>

        </Routes>
       </BrowserRouter>
     

    </>
  );
}

export default App;
