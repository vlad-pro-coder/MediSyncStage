import 'react-native-gesture-handler';
import React from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './assets/Homescreen/home';
import FormularOrReteta from './assets/DiagnosticForm/FormularOrReteta'
import ForgotPassword from './assets/Auth Group/ForgotPassword';
import AssignPatientScreen from './assets/assignPatientToDoctor/AssignPatientScreen'


import { initializeApp } from 'firebase/app';
import SelectDoctorScreen from './assets/Appointments/SelectDoctor';
import StartPage from './assets/Auth Group/StartPage';
import PacientRegister from './assets/Auth Group/Pacient/PacientAuth';
import DoctorRegister from './assets/Auth Group/Doctor/DoctorAuth';
import OrganisationRegister from './assets/Auth Group/Organizatie/OrganizationAuth';
import ScheduleAppointmentScreen from './assets/Appointments/ScheduleAppointment';
import CalendarScreen from './assets/Appointments/appointmentsCalendar';
import FrameForQRcodeGeneration from './assets/QRcodeGenANDscan/FrameForQRcodeGeneration';
import ChatBotScreen from './assets/ChatBot/chatBotScreen';
import FrameForQRcodeScanner from './assets/QRcodeGenANDscan/FrameForQRcodeScanning';
import PrintIstoricWithLabels from './assets/IstoricMedical/PrintIstoricWithLabels';
import DisplayPhotosToChoose from './assets/testcameraroll/DisplayPhotosToChoose';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-lU28AN7mwiMgB5K9A7kYx9Fv9nFOX9c",
  projectId: "medisync-4ec40",
  storageBucket: "medisync-4ec40.appspot.com",
  appId: "1:723071844192:android:be8841da967fd3b8df2805",
  databaseURL: "https://medisync-4ec40-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

type RootStackParamList = {
  IstoricMedicalQRcode: { email: string, userID: string },
  IstoricMedical: { email: string,userID: string },
  AssignPatientScreen:undefined;
  FormularOrReteta:undefined;
  StartPage: undefined;
  PacientRegister: undefined;
  DoctorRegister: undefined;
  OrganisationRegister: undefined;
  Home: { userID: any };
  Consult: { user: any };
  ForgotPassword: undefined;
  SelectDoctor: {userID: string};
  ScheduleAppointment: { doctorID: any, userID: any };
  CalendarScreen: undefined;
  ChatBotScreen: undefined;
  IstoricMedicalQRscanner: undefined;
  DisplayPhotosToChoose:undefined,
};

const RootStack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='StartPage' component={StartPage} />
        <RootStack.Screen name="PacientRegister" component={PacientRegister} />
        <RootStack.Screen name="DoctorRegister" component={DoctorRegister} />
        <RootStack.Screen name="OrganisationRegister" component={OrganisationRegister} />
        <RootStack.Screen name="Home" component={HomeScreen} initialParams={{ userID: null }} />
        <RootStack.Screen name="IstoricMedical" component={PrintIstoricWithLabels} initialParams={{  email: '', userID: ''  }}/>
        <RootStack.Screen name="IstoricMedicalQRcode" component={FrameForQRcodeGeneration} initialParams={{  email: '', userID: '' }}/>
        <RootStack.Screen name="FormularOrReteta" component={FormularOrReteta} />
        <RootStack.Screen name="AssignPatientScreen" component={AssignPatientScreen} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <RootStack.Screen name="SelectDoctor" component={SelectDoctorScreen} />
        <RootStack.Screen name="ScheduleAppointment" component={ScheduleAppointmentScreen} />
        <RootStack.Screen name="CalendarScreen" component={CalendarScreen} />
        <RootStack.Screen name="ChatBotScreen" component={ChatBotScreen} />
        <RootStack.Screen name="IstoricMedicalQRscanner" component={FrameForQRcodeScanner}/>
        <RootStack.Screen name="DisplayPhotosToChoose" component={DisplayPhotosToChoose}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
export {app};