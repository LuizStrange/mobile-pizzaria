import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import Routes from './src/routes';
import { AuthProvider } from './src/Contexts/AuthContext';

export default function App() {
  return  (
      <NavigationContainer>
          <AuthProvider>
              <StatusBar backgroundColor="#1d1d2e" barStyle='light-content' translucent={false}/>
              <Routes />
          </AuthProvider>
      </NavigationContainer>
  );
}
