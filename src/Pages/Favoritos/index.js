
import { useEffect, useState } from 'react'; 
//useEffect para buscar todos os itens salvos na lista quando o componente for montado
//useState para colocar os itens salvos para manipular dentro do estado

import './favoritos.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from "lucide-react";

function Favoritos(){
    const [filmes, setFilmes] = useState([]);

useEffect(() => {

    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || [])

}, [])

    function excluirFilme(id){
        // alert("Excluir Clicado" + id)
        //filter retorna todos os itens que passam na condição
        let filtroFilmes = filmes.filter( (item) => {
            return (item.id !== id);
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))//stringfy para converter para string para salvar, pois não pode salvar um array
        toast.success("Filme removido com sucesso!");

    }

    return(
        <div className='meus-filmes'>
            <h1>Lista de Favoritos</h1>

            {filmes.length === 0 && <span> Você não possui nenhum filme salvo! </span>}

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <Link to={'/'} className='btn-voltar'>
            <ArrowLeft size={40} /></Link>
        </div>
    )

    

}



export default Favoritos;