import './App.css'
import { useState, createContext, useEffect } from 'react'
import {Route, Routes, BrowserRouter } from "react-router-dom";
import TabelaLivros from './components/TabelaLivros'
import Menu from './components/Menu'
import CadastrarLivros from './components/CadastrarLivros'
import NotFound from './components/NotFound'

export const MeuContexto = createContext();

const url = "http://localhost:3000/livros";
function App() { 
  const [livros, setLivros] = useState([]);
  const [valorCompartilhado, setValorCompartilhado] = useState({
    id: '',
    isbn: '',
    titulo: '',
    autor: ''
  });

  useEffect(() => {
    async function getData() {
      const res = await fetch(url)
      const data = await res.json()
      setLivros(data);
    }
    getData();


  }, [valorCompartilhado])
  
    return (
      <BrowserRouter>
      <MeuContexto.Provider value={{ valorCompartilhado, setValorCompartilhado, livros, setLivros }}>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<TabelaLivros livros={livros}/>} />
          <Route path="/Cadastrar" element={<CadastrarLivros url={url} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </MeuContexto.Provider>
    </BrowserRouter>
   
    );
  
}

export default App
