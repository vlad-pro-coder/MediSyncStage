import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, ScrollView, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import db from "@react-native-firebase/database";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  ScheduleAppointment: { doctorID: any, userID: any };
};

interface Appointment {
  StartTime: string;
  EndTime: string;
  Pacient: string;
  Title: string;
  Description: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'ScheduleAppointment'>;

function ScheduleAppointmentScreen({ route, navigation }: Props) {
  const [doctorID, setDoctorID] = useState(route.params.doctorID);
  const [userID, setUserID] = useState(route.params.userID);
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{ startTime: Date, endTime: Date } | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (e: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const fetchAppointments = async () => {
    const selectedDate = new Date(date);
    
    // Ensure the selected date is set to the local start and end of day
    const localStartOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      0, 0, 0, 0
    );
    const localEndOfDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      23, 59, 59, 999
    );
    
    const startOfDay = localStartOfDay.getTime();
    const endOfDay = localEndOfDay.getTime();
  
    const appointmentsRef = db().ref(`users/${doctorID}/appointments`);
    const snapshot = await appointmentsRef.once('value');
    const appointmentsData = snapshot.val();

    // Cast Object.values() to Appointment[] and filter
    const filteredAppointments = (Object.values(appointmentsData || {}) as Appointment[]).filter(
      (appointment: Appointment) => {
        const appointmentStartTime = parseInt(appointment.StartTime);  // Convert StartTime to number
        const appointmentEndTime = parseInt(appointment.EndTime);  // Convert EndTime to number

        return appointmentStartTime >= startOfDay && appointmentEndTime <= endOfDay;
      }
    );

    setAppointments(filteredAppointments);
  };

  useEffect(() => {
    fetchAppointments();
  }, [date]);

  const generateTimeSlots = () => {
    const startHour = 9;
    const endHour = 17;
    const interval = 1;

    let slots: { startTime: Date, endTime: Date, available: boolean }[] = [];

    for (let i = startHour; i < endHour; i += interval) {
      const startTime = new Date(date);
      startTime.setHours(i, 0, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(i + interval, 0, 0, 0);

      // Check if this time slot is booked
      const isBooked = appointments.some(appointment => {
        const appointmentStartTime = parseInt(appointment.StartTime);
        const appointmentEndTime = parseInt(appointment.EndTime);

        return (
          (startTime.getTime() < appointmentEndTime && endTime.getTime() > appointmentStartTime)
        );
      });

      slots.push({ startTime, endTime, available: !isBooked });
    }

    return slots;
  };

  const addAppointment = async () => {
    if (!selectedSlot) {
      Alert.alert("Please select a time slot.");
      return;
    }

    try {
      const appointmentsRef = db().ref(`users/${doctorID}/appointments`);
      const newAppointment: Appointment = {
        StartTime: selectedSlot.startTime.getTime().toString(),
        EndTime: selectedSlot.endTime.getTime().toString(),
        Title: title,
        Pacient: userID,
        Description: description
      };

      await appointmentsRef.push(newAppointment);
      console.log('Appointment added successfully');
      navigation.pop();
      navigation.pop();
      Alert.alert("Programare efectuata cu succes. Va asteptam!");
    } catch (error) {
      console.error('Error adding appointment: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => setShowDatePicker(true)} title='Alege o zi' />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          onChange={onChangeDate}
        />
      )}
      <ScrollView>
        {generateTimeSlots().map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.slotButton,
              selectedSlot && slot.startTime.getTime() === selectedSlot.startTime.getTime() && styles.selectedButton,
              !slot.available && styles.disabledButton
            ]}
            onPress={() => slot.available && setSelectedSlot(slot)}
            disabled={!slot.available}
          >
            <Text style={styles.slotText}>
              {slot.startTime.getHours()}:00 - {slot.endTime.getHours()}:00
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button onPress={addAppointment} title="Make Appointment" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
  },
  slotButton: {
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedButton: {
    backgroundColor: '#0056b3',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  slotText: {
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default ScheduleAppointmentScreen;
