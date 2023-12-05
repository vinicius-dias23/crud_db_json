import propTypes from 'prop-types'
import { useContext } from 'react';
import { MeuContexto } from '../App';
import { useNavigate  } from 'react-router-dom';

function TabelaLivros({livros}) {
    const navigate = useNavigate();
    TabelaLivros.propTypes = {livros: propTypes.any}
    const { valorCompartilhado, setValorCompartilhado } = useContext(MeuContexto);
    
  return (
    <div className="livros">
        <h1>Tabela de Livros</h1>
        <table className="tabela">
            <thead>
                <tr>
                    <th width="17%">ISBN</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th width="7%"></th>
                    <th width="9%"></th>
                </tr>
            </thead>
            <tbody>
                {livros.map((livro) => (
                    <tr key={livro.id}> 
                        <td> {livro.isbn} </td>
                        <td> {livro.titulo} </td>
                        <td> {livro.autor} </td>
                        <td>
                            <button
                                className="botaoEditar"
                                onClick={() => {
                                    navigate('/Cadastrar');
                                    setValorCompartilhado({
                                        id: livro.id,
                                        isbn: livro.isbn,
                                        titulo: livro.titulo,
                                        autor: livro.autor,
                                    });
                                }}>
                                Editar
                            </button>
                        </td>
                        <td>
                            <button className="botaoRemover" onClick={() => {
                                fetch(`http://localhost:3000/livros/${livro.id}`, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(valorCompartilhado),
                                });
                                window.location.reload();
                            }}>Remover</button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
    </div>        
  )
}

export default TabelaLivros;