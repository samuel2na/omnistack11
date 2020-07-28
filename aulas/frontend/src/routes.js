import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident'

//as rotas também são componentes
export default function Routes(){
    return (
        //BrowserRouter - basicamente está envolvendo todas as demais rotas
        <BrowserRouter>
            {/* Switch - faz com que as rotas sejam executadas 1 de cada vez */}
            <Switch>
                {/* Router - é a primeira rota a ser executada, por isso no path só tem uma barra 
                           - a proprieda 'exact' garante que o caminho tem que ser exatamente ao path,
                             pois o react-router-dom não verifica se o caminho é igual ao path, mas sim se o início é igual.*/}
                <Route path="/" exact component={Logon} />
                <Route path="/Register" component={Register} />
                <Route path="/Profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}
