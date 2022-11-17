import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {

    const {setConsultarApi} = route.params

    //campos del formulario
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [alerta, setAlerta] = useState(false)

    //Detectar si se esta editando o no 
    useEffect(()=>{
        if(route.params.cliente){
            const {nombre,telefono,empresa,correo} = route.params.cliente

            setNombre(nombre)
            setTelefono(telefono)
            setEmpresa(empresa)
            setCorreo(correo)
        }
    },[])

    //Almacena el cliente en la base de datos 
    const GuardarCliente = async () => {
        //Validar
        if(nombre === '' || telefono === '' || correo === '' || empresa === ''){
            setAlerta(true)
            return
        }

        //Generar Cliente
        const cliente = {nombre, telefono, empresa, correo}
           

        //Editando o creando nuevo cliente 
        if(route.params.cliente){

            const {id} = route.params.cliente
            cliente.id = id
            const url = `http://192.168.1.6:3000/clientes/${id}`

            try {
                await axios.put(url, cliente)
            } catch (error) {
                
            }
        }
        else{
            //Guardar cliente en la API para android se debe usar el localhost como la siguiente IP
            const URLanroid = 'http://192.168.1.6:3000/clientes';
            const URLios = 'http://localhost/clientes'
            try {
                if (Platform.OS === 'ios'){
                    await axios.post(`${URLios}`, cliente)
                }
                else{
                    await axios.post(`${URLanroid}`, cliente)
                }
                
            } catch (error) {
            
            }
            
        }

        //Redireccionar
        navigation.navigate('Inicio')
        //Limpiar el form (Opcional)
        setNombre('')
        setTelefono('')
        setCorreo('')
        setEmpresa('')

        //Cambiar consultarApi para traer nuevo vleinte
        setConsultarApi(true)
    }   

    return (
    
        <View style={globalStyles.contenedor}>
            <Headline style = {globalStyles.titulo}>NuevoCLiente</Headline>

            <TextInput
                label={'Nombre'}
                placeholder = 'Ej. Juan'
                onChangeText={(texto)=> setNombre(texto)}
                value = {nombre}
                style = {styles.input}
            />

            <TextInput
                label={'Télefono'}
                placeholder = 'Ej. 123456789'
                onChangeText={(texto)=> setTelefono(texto)}
                value = {telefono}
                style = {styles.input}
                keyboardType = 'phone-pad'
            />

            <TextInput
                label={'Correo'}
                placeholder = 'Ej. Juan@gmail.com'
                onChangeText={(texto)=> setCorreo(texto)}
                value = {correo}
                style = {styles.input}
                keyboardType = 'email-address'
            />

            <TextInput
                label={'Empresa'}
                placeholder = 'Ej. Avidbots'
                onChangeText={(texto)=> setEmpresa(texto)}
                value = {empresa}
                style = {styles.input}
            />

            <Button icon={'pencil-circle'} mode= 'contained' onPress={() => GuardarCliente()}>
                Guardar Cliente
            </Button>

            <Portal>
                <Dialog
                    visible ={alerta}
                    onDismiss={() => setAlerta(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son obligatorios</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>setAlerta(false)}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    
    );
};
  
const styles = StyleSheet.create({
    input:{
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})

export default NuevoCliente;