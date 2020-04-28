import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    //sempre bom iniciar o State com o mesmo tipo da informação que vamos preencher ele depois. Neste caso um array vazio.
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); //controla paginação
    const [loading, setLoading] = useState(false); //controla a busca de dados para evitar que sejam consultados repetidamente

    const navigation = useNavigation();

    function navigationToDetail(incident){
        navigation.navigate('Detail', { incident }); //'Detail' -> é o mesmo nome da rota definido em routes.js 
    }

    async function loadIncidents(){
        //validações abaixo evite busca descessária dos casos
        if(loading){ return; }
        if(total > 0 && incidents.length == total) { return ; }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page },
        });

        //abaixo o três pontos ... permite anexar vetores, neste caso os dados das pages 1, 2, 3 etc.. 
        //ou seja, está anexando o array inicial com o da próxima consulta
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);

        setPage(page + 1);
        setLoading(false);
    }
    
    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um caso um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={incidents} //array com os dados
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)} /* passar o ID o incident */
                showsVerticalScrollIndicator={false} /* exibe ou não a barra de scroll */
                onEndReached={loadIncidents} /* dispara quando chega ao final da lista */
                onEndReachedThreshold={0.2} /* quantos porcentos do final da lista o user deve estar para carregar novos casos na lista, neste caso 20%*/
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', currency:'BRL'}).format(incident.value)
                        }</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={ () => navigationToDetail(incident)} /* função de navegação para tela de Detail */ 
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}