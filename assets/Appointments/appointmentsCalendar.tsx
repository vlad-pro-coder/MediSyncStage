import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import db from '@react-native-firebase/database';

interface Appointment {
    EndTime: string;
    StartTime: string;
    Title: string;
    Description: string;
    userID: string;
}

interface AgendaItem {
    name: string;
    height: number;
    title: string;
    description: string;
}

function CalendarScreen({ route }: { route: any }) {
    const [items, setItems] = useState<{ [key: string]: AgendaItem[] }>({});
    const doctorID = route.params.userID;

    useEffect(() => {
        const fetchAppointments = async () => {
            const appointmentsRef = db().ref(`users/${doctorID}/appointments`);
            appointmentsRef.on('value', snapshot => {
                const data = snapshot.val() || {};
                const newItems: { [key: string]: AgendaItem[] } = {};

                Object.keys(data).forEach(key => {
                    const appointment: Appointment = data[key];
                    const startDate = new Date(parseInt(appointment.StartTime));
                    const endDate = new Date(parseInt(appointment.EndTime));
                    const title = appointment.Title || "No Title";  // Default if title is not provided
                    const description = appointment.Description || "No Description";  // Default if description is not provided
                    const dateKey = startDate.toISOString().split('T')[0]; // Format date to YYYY-MM-DD

                    if (!newItems[dateKey]) {
                        newItems[dateKey] = [];
                    }

                    newItems[dateKey].push({
                        name: `Appointment from ${startDate.toLocaleTimeString()} to ${endDate.toLocaleTimeString()}`,
                        height: Math.max(50, Math.floor(Math.random() * 150)),
                        title: title,
                        description: description
                    });
                });

                setItems(newItems);
            });
        };

        fetchAppointments();
    }, [doctorID]);

    const renderItem = (item: AgendaItem) => {
        return (
            <View style={[styles.item, { height: 100 }]}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemTime}>{item.name}</Text>
            </View>
        );
    };

    return (
        <Agenda
            items={items}
            selected={new Date().toISOString().split('T')[0]}
            renderItem={renderItem}
            renderEmptyDate={() => <View style={styles.emptyDate}><Text>No Appointments</Text></View>}
            rowHasChanged={(r1:any, r2: any) => r1.name !== r2.name}
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
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    itemTime: {
        fontSize: 12,
        color: '#777',
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
});

export default CalendarScreen;
