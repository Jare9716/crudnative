import 'react-native-gesture-handler';
import React from 'react';
import {} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from './Views/Inicio';
import NuevoCliente from './Views/NuevoCliente';
import DetallesCliente from './Views/DetallesCliente';


import { DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Stack = createStackNavigator()


//Definir el tema de nuestro diseño
const theme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Inicio'
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle:{
                fontWeight:'bold'
              },
              headerTitleAlign: 'center',
            }}
            
          >

            <Stack.Screen
              name='Inicio'
              component={Inicio}
            />

            <Stack.Screen
              name='NuevoCliente'
              component={NuevoCliente}
              options ={{
                title: 'Nuevo Cliente'
              }}
            />

            <Stack.Screen
              name='DetallesCliente'
              component={DetallesCliente}
              options ={{
                title: 'Detalles Cliente'
              }}
              
            />

          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

export default App;
