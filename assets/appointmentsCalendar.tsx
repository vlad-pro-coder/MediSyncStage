import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import db from '@react-native-firebase/database';

interface Appointment {
    StartTime: string;
    EndTime: string;
}

interface AgendaItem {
    name: string;
    height: number;
}

function CalendarScreen({ route }: { route: any }) {
    const [items, setItems] = useState<{ [key: string]: AgendaItem[] }>({});
    const doctorID = route.params.doctorID;

    useEffect(() => {
        const fetchAppointments = async () => {
            const appointmentsRef = db().ref(`users/${doctorID}/appointments`);
            appointmentsRef.on('value', snapshot => {
                const data = snapshot.val() || {};
                const newItems: { [key: string]: AgendaItem[] } = {};

                Object.keys(data).forEach(key => {
                    const appointment: Appointment = data[key];
                    const startDate = new Date(appointment.StartTime);
                    const endDate = new Date(appointment.EndTime);
                    const dateKey = startDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD

                    if (!newItems[dateKey]) {
                        newItems[dateKey] = [];
                    }

                    newItems[dateKey].push({
                        name: `Appointment from ${startDate.toLocaleTimeString()} to ${endDate.toLocaleTimeString()}`,
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                    });
                });

                setItems(newItems);
            });
        };

        fetchAppointments();
    }, [doctorID]);

    const renderItem = (item: AgendaItem) => {
        return (
            <View style={[styles.item, { height: item.height }]}>
                <Text>{item.name}</Text>
            </View>
        );
    };

    return (
        <Agenda
            items={items}
            selected={new Date().toISOString().split('T')[0]}
            renderItem={renderItem}
            renderEmptyDate={() => <View style={styles.emptyDate}><Text>No Appointments</Text></View>}
            rowHasChanged={(r1: any, r2: any) => r1.name !== r2.name}
            showClosingKnob={true}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
});

export default CalendarScreen;
