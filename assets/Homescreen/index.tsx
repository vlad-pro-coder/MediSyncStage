// navigation/BottomTabNavigator.tsx
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Homescreen/home';
import DoctorsScreen from '../Appointments/SelectDoctor';
import IstoricMedical from '../IstoricMedical/PrintIstoricWithLabels';
import ProfileScreen from '../Profile/ProfilePage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ref, getDatabase, get, child } from 'firebase/database';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import AssignPacientToDoctor from '../assignPatientToDoctor/AssignPatientScreen';
import ShowPatientListScreen from '../ShowPatientList/ShowPatientListScreen';
import CalendarScreen from '../Appointments/appointmentsCalendar';
import PacientSelector from '../DiagnosticForm/PacientSelectorScreen/PacientSelector';

type RootTabParamList = {
    Home: { userID: any };
    Doctors: {userID:string};
    IstoricMedical: { email: string, userID: string },
    Profile: { userID: any };
    CalendarScreen: { userID: any };
    AssignPacientToDoctor:undefined;
};

type RootStackParamList = {
    StartPage: undefined;
    PacientRegister: undefined;
    DoctorRegister: undefined;
    OrganisationRegister: undefined;
    Home: { userID: any };
    Consult: { user: any };
    ForgotPassword: undefined;
    SelectDoctor: {userID:string};
    ScheduleAppointment: { doctorID: any };
    CalendarScreen: { userID: any };
    Index: { userID: any, email:string };
    EditProfile: { userID: any };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Index'>;

const Tab = createBottomTabNavigator<RootTabParamList>();

function Index({ route, navigation }: Props) {
    const userID = route.params.userID;
    const email = route.params.email;
    const [accountType, setAccountType] = useState<string | null>(null);

    React.useEffect(() => {
        const fetchAccountType = async () => {
            const dbRef = ref(getDatabase());
            try {
                const snapshot = await get(child(dbRef, `users/${userID}`));
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setAccountType(userData.accountType);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching account type:", error);
            }
        };

        fetchAccountType();
    }, [userID]);

    if (accountType === null) {
        // Show a loading indicator while fetching the account type
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: "#F8F5FF",
                    position: 'absolute',
                    bottom: 20,
                    marginHorizontal: 10,
                    height: 60,
                    borderRadius: 10,
                    borderTopWidth: 0,
                    paddingVertical: 5
                },
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'home-outline';
                            break;
                        case 'Consult':
                            iconName = 'clipboard-outline';
                            break;
                        case 'IstoricMedical':
                            iconName = 'book-outline';
                            break;
                        case 'Add Patient':
                            iconName = 'search-outline';
                            break;
                        case 'Show List':
                            iconName = 'person-add-outline';
                            break;
                        case 'Profile':
                            iconName = 'person-outline';
                            break;
                        default:
                            iconName = 'ellipse-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Acasa' }} initialParams={{ userID: userID }} />
            {accountType === 'doctor' ? (
                <>
                    <Tab.Screen name="Consult" component={CalendarScreen} options={{ title: 'Consultatii' }} initialParams={{userID: userID}}/>
                    <Tab.Screen name="Add Patient" component={AssignPacientToDoctor} options={{ title: 'Adauga Pacient' }} />
                    <Tab.Screen name="Show List" component={PacientSelector} options={{ title: 'Lista Pacienti' }} />
                </>) : (
                    
                <Tab.Screen name="IstoricMedical" component={IstoricMedical} options={{ title: 'Istoric medical' }} initialParams={{ email: email, userID: userID }} />

            )}
            {accountType === 'pacient' && (
                <Tab.Screen name="Doctors" component={DoctorsScreen} options={{ title: 'Doctori' }} initialParams={{ userID: userID }}/>
            )}
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} initialParams={{ userID: userID }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Index;
