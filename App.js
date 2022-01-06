import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './Hooks/useAuth';
import StackNavigator from './StackNavigator';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); // ignore all log messages 
export default function App() {
  return (
   <NavigationContainer>
     {/* H.O.C - Higher order Component  */}
     <AuthProvider>
       {/* passing down the authentication to childs */}
     <StackNavigator />
     </AuthProvider>

   </NavigationContainer>
  );
}


