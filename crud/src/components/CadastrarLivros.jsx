import { useContext, useEffect, useState } from "react";
import propTypes from 'prop-types';
import { MeuContexto } from "../App";

function CadastrarLivros() {
  CadastrarLivros.propTypes = { url: propTypes.any }
  const { livros, valorCompartilhado, setValorCompartilhado } = useContext(MeuContexto);
  const [livroCorrente, setLivroCorrente] = useState(undefined);
  let metodo = "";

  const descobrirIdListaLivros = () => {
    livros.forEach(livro => {
      if (livro.id == livroCorrente.id) {
        metodo = "PUT";
      }
    });
  }
  
  useEffect(() => {
    setLivroCorrente(
      valorCompartilhado
    );
  }, [valorCompartilhado])

  const handleSubmit = async (e) => {
    e.preventDefault();

    descobrirIdListaLivros();
    
    fetch(`http://localhost:3000/livros/${livroCorrente.id}`, {
      method: metodo ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(livroCorrente),
    })

    setValorCompartilhado({
      id: '',
      isbn: '',
      titulo: '',
      autor: '',
    })
    window.location.reload();
    window.location = "/";
  }
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Cadastrar Livro</h1>
        <p>
          <label htmlFor="isbn">
            ISBN: Formato - (
            <span style={{ color: "red" }}> 978-85-7522-xxx-x </span>)
          </label>
          <input 
            type="text"
            autoFocus 
            value={valorCompartilhado.isbn}
            id="isbn" required 
            pattern= "^978-85-7522-[0-9]{3}-[0-9]{1}$" 
            onChange={(e) => setValorCompartilhado({
              ...valorCompartilhado,
              isbn: e.target.value,
            })}
          />
        </p>
        <p>
          <label htmlFor="titulo">Título</label>
          <input 
            type="text" 
            value={valorCompartilhado.titulo}
            id="titulo" required 
            onChange={(e) => setValorCompartilhado({
              ...valorCompartilhado,
              titulo: e.target.value,
            })}
          />
        </p>
        <p>
          <label htmlFor="autor">Autor</label>
          <input 
            type="text" 
            value={valorCompartilhado.autor}
            id="autor" required 
            onChange={(e) => setValorCompartilhado({
              ...valorCompartilhado,
              autor: e.target.value,
            })}
          />
        </p>
        <p>
          <button type="submit" className="botao cadastrar">
            Cadastrar
          </button>
        </p>
      </form>

    </div>
  )
}

export default CadastrarLivros