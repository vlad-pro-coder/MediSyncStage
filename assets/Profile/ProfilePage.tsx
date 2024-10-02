import React, { useState, useEffect } from 'react';
import { View, Text, Image as RNImage, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Defs, ClipPath, Image, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ref, getDatabase, get, child } from 'firebase/database';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.3;

type RootStackParamList = {
  StartPage: undefined;
  PacientRegister: undefined;
  DoctorRegister: undefined;
  OrganisationRegister: undefined;
  Home: { userID: any };
  Consult: { user: any };
  ForgotPassword: undefined;
  SelectDoctor: undefined;
  ScheduleAppointment: { doctorID: any };
  CalendarScreen: undefined;
  Index: { userID: any };
  EditProfile: { userID: any };
};

type RootTabParamList = {
  Home: { userID: any };
  Doctors: undefined;
  MedicalHistory: undefined;
  Profile: { userID: any };
  EditProfile: { userID: any };
};

type Props = NativeStackScreenProps<RootTabParamList, 'Profile'>;

const SPECIALTY_DATA = [
  { label: 'Alergologie şi imunologie clinică', value: '1' },
  { label: 'Anestezie şi terapie intensivă', value: '2' },
  { label: 'Boli infecţioase', value: '3' },
  { label: 'Cardiologie', value: '4' },
  { label: 'Dermatovenerologie', value: '5' },
  { label: 'Diabet zaharat, nutriţie şi boli metabolice', value: '6' },
  { label: 'Endocrinologie', value: '7' },
  { label: 'Gastroenterologie', value: '8' },
  { label: 'Genetică medicală', value: '9' },
  { label: 'Geriatrie şi gerontologie', value: '10' },
  { label: 'Hematologie', value: '11' },
  { label: 'Medicină de familie', value: '12' },
  { label: 'Medicină de urgenţă', value: '13' },
  { label: 'Medicină internă', value: '14' },
  { label: 'Nefrologie', value: '16' },
  { label: 'Neurologie', value: '17' },
  { label: 'Oncologie', value: '18' },
  { label: 'Pediatrie', value: '19' },
  { label: 'Psihiatrie', value: '21' },
  { label: 'Radioterapie', value: '22' },
  { label: 'Reumatologie', value: '23' },
  { label: 'Chirurgie', value: '24' },
  { label: 'ORL', value: '25' },
];

function ProfilePage({ route,navigation }: Props) {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const userID = route.params.userID;
  
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const dbRef = ref(getDatabase());
      try {
        const snapshot = await get(child(dbRef, `users/${userID}`));
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log("No user data found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userID]);

  const getSpecialtyLabel = (specialtyID: string) => {
    const specialty = SPECIALTY_DATA.find(item => item.value === specialtyID);
    return specialty ? specialty.label : 'Unknown Specialty';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Svg height={HEADER_HEIGHT} width={width}>
          <Defs>
            <ClipPath id="clip">
              <Path
                d={`M0 0 H${width} V${HEADER_HEIGHT - 40} Q${width / 2} ${HEADER_HEIGHT} 0 ${HEADER_HEIGHT - 40} Z`}
              />
            </ClipPath>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="#1C2128" clipPath="url(#clip)" />
          <Image href={require('../obiecte2.png')} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" clipPath="url(#clip)" />
        </Svg>
        <View style={styles.avatarContainer}>
          <RNImage source={require('../profile-avatar.png')} style={styles.avatar} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Date personale</Text>

        <View style={styles.infoItem}>
          <Ionicons name="person-outline" size={24} color="#000" />
          <Text style={styles.infoText}>{userData?.name || 'loading...'} {userData?.surName}</Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={24} color="#000" />
          <Text style={styles.infoText}>{userData?.nrTelefon || 'N/A'}</Text>
        </View>


        {userData?.accountType === 'doctor' && (
          <View style={styles.infoItem}>
            <Ionicons name="briefcase-outline" size={24} color="#000" />
            <Text style={styles.infoText}>{getSpecialtyLabel(userData?.specializare)}</Text>
          </View>
        )}

        <Text style={styles.title}>Setări</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#000" />
          <Text style={styles.settingText}>Contactează-ne</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => { navigation.push('EditProfile', { userID: userID }) }}>
          <Ionicons name="create-outline" size={24} color="#000" />
          <Text style={styles.settingText}>Editează profilul</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -50,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  settingText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfilePage;
