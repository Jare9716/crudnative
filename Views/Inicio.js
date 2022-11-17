import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import { List, Headline, Button, FAB } from 'react-native-paper';

import globalStyles from '../styles/global';

import axios from 'axios';

const Inicio = ({navigation}) => {

    //state de la app
    const [clientes, setClientes] = useState([])
    const [consultarApi, setConsultarApi] = useState(true)
    
    useEffect(()=>{
        const obtenerClientesApi = async() =>{
            try {
                const resultado = await axios.get('http://192.168.1.6:3000/clientes')
                setClientes(resultado.data)
                setConsultarApi(false)
            } catch (error) {
                
            }

        }
        if(consultarApi){
            obtenerClientesApi()
        }
    },[consultarApi])
    return (
    
        <View style = {globalStyles.titulo}>
            
            <Button icon={'plus-circle'} onPress={()=> navigation.navigate('NuevoCliente', {setConsultarApi})} >
                Nuevo Cliente
            </Button>

            <Headline style = {globalStyles.titulo}>{clientes.length>0? 'Clientes' : 'Aún No Hay Clientes'}</Headline>

            <FlatList
                data={clientes}
                keyExtractor={ cliente => (cliente.id).toString()}
                renderItem={({item})=>(
                    <List.Item
                        title={item.nombre}
                        description={item.empresa}
                        onPress={()=> navigation.navigate('DetallesCliente',{item,setConsultarApi})}
                    />
                )}
            />
            
            <FAB
                icon={'plus'}
                style={globalStyles.fab}
                onPress={()=> navigation.navigate('NuevoCliente', {setConsultarApi})}
            />

        </View>
    
     );
  };

  export default Inicio;