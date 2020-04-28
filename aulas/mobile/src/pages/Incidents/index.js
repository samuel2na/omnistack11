import React, { useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const navigation = useNavigation();

    function navigationToDetail(){
        navigation.navigate('Detail'); //'Detail' -> é o mesmo nome da rota definido em routes.js 
    }

    async function loadIncidests(){
        
    }
    
    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um caso um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={[1, 2, 3]}
                style={styles.incidentList}
                keyExtractor={incident => String(incident)} /* passar o ID o incident */
                showsVerticalScrollIndicator={false} /* exibe ou não a barra de scroll */
                renderItem={()=> (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>APAD</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>RS 120,00</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={navigationToDetail} /* função de navegação para tela de Detail */ 
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