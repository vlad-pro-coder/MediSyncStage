import React, { useState, useEffect, useId } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { getDatabase, ref, get, update, child } from "firebase/database"; // Firebase Realtime Database functions
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

const data = [
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
  { label: 'Oncologie ', value: '18' },
  { label: 'Pediatrie', value: '19' },
  { label: 'Psihiatrie', value: '21' },
  { label: 'Radioterapie', value: '22' },
  { label: 'Reumatologie', value: '23' },
  { label: 'Chirurgie', value: '24' },
  { label: 'ORL', value: '25' },
];

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
  CalendarScreen: { userID: any };
  Index: { userID: any };
  EditProfile: {userID: any};
};


type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

function EditProfileScreen({ route, navigation }: Props) {

  const nav = useNavigation<NativeStackNavigationProp<any>>()
  const [name, setName] = useState<string>('Numele dvs');
  const [email, setEmail] = useState<string>('email@gmail.com');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [code, setCode] = useState<string>('codul de parafa');
  const userID = route.params.userID;

  // Function to load data from Firebase
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const uid = userID; // Replace with actual UID logic
        const dbRef = ref(getDatabase());
        const snapshot = await get(child(dbRef, `users/${uid}`));

        if (snapshot.exists()) {
          const userData = snapshot.val();
          setName(userData.name || 'Numele dvs');
          setEmail(userData.email || 'email@gmail.com');
          setImageUri(userData.profileImageUri || null);
          setCode(userData.code || 'codul de parafa');
          setValue(userData.specializare || null);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };
    fetchProfileData();
  }, []);

  // Function to save profile data to Firebase
  const handleSave = async () => {
    try {
      const uid = userID; // Replace with actual UID
      const dbRef = ref(getDatabase(), `users/${uid}`);

      await update(dbRef, {
        name: name,
        email: email,
        profileImageUri: imageUri,
        code: code,
        specializare: value,
      });

      Alert.alert('Profile saved successfully!');
    } catch (error) {
      console.error('Failed to save profile data:', error);
      Alert.alert('Error', 'Failed to save profile data.');
    }
    navigation.pop();
  };

  // Image picker logic


  const handleDropdownChange = (item: { value: string }) => {
    setValue(item.value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { }}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profilePicture} />
        ) : (
          <Text style={styles.placeholderText}>Pick an image</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={(text) => setCode(text)}
        placeholder="Code"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        keyboardType="email-address"
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Selecteaza specializarea"
        searchPlaceholder="Cauta..."
        value={value}
        onChange={handleDropdownChange}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />

      <Button title="Save Profile" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EditProfileScreen;
