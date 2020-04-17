import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import './styles.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]); //neste caso começa com um array vazio para ser válido pois refere-se aos dados do back-end  

    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    /*
      A função useEffect(); recebe 2 parãmetros:
         1° - qual função será executada.
         2° - quando esta função será executada. se o array estiver vazio só executa a função 1 vez, caso contrário toda vez que as informações de dentro do array forem alteradas a função será executada. */  
    useEffect(() => {
        api.get('/profile', {
            headers: { 
                Authorization: ongId,
            }
        }).then( response => {
            setIncidents(response.data); //alterando o estado da aplicação com os dados recebido do back-end
        })
    }, [ongId]); //mesmo que o ongId não vá sofrer alteração depois de logado, adicionamos apenas por garantia no React

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/ ${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            //atualizando a página para q o caso excluído desapareça, ou seja, filtrando todos menos o excluído
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao deletar o caso, tente novamente!');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        
                        {/* - No onClick abaixo está sendo passado uma função para evitar de todos os casos sejam deletados assim que o componete for mostrado em tela.
                            - Pasando da forma abaixo, ou seja com () =>, o componente recebe a função e não o retorno de execução dela */}
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}