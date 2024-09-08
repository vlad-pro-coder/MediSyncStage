import { useEffect, useState } from "react"
import GetUserFormularsPath from "../../FilesThatGetUsersStorageData/GiveUserFormlarsPath"
import { FlatList, } from "react-native-gesture-handler"
import React from "react"
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from "react-native"
import { formularBackground, formularButtonSubmit,SelectedBorderColor } from "../../color"
import GetDataForUserChooseModal from "./GetDataForUserChooseModal"

const DateAndTimeExtractor = (label: string) => {
    const date = label.substr(6, 2) + "/" + label.substr(4, 2) + "/" + label.substr(0, 4)
    const time = label.substr(8, 2) + ":" + label.substr(10, 2)

    return { date: date, time: time }
}

const ModalSelectorWithLabels = ({prop}:any) => {
    const {email,changePath,pathRetetaStorage} = prop

    const [UserPaths, UserPathsChange] = useState<object[]>([])
    const [showModal, changeShowModal] = useState<boolean>(false)
    const [chosenPath, changeChosenPath] = useState<string>('')

    useEffect(() => {
        const fetchPaths = async () => {
            UserPathsChange(await GetUserFormularsPath(email))
        }
        fetchPaths()
    }, [])

    console.log(UserPaths)

    return <View style={{ backgroundColor: 'white', height: '100%' }}>
        <Modal
            visible={showModal}
            onRequestClose={() => { changeShowModal(false) }}
        >
            <GetDataForUserChooseModal prop={{ chosenPath: chosenPath}} />
        </Modal>
        <View style={{ height: 30 }}></View>
        <FlatList
            data={UserPaths}
            renderItem={({ index, item }: any) => {
                const { titlu, folder } = item
                const { time, date } = DateAndTimeExtractor(folder.substr(folder.lastIndexOf('/') + 1, 14))
                return <Pressable id={`${index}`} style={[styles.container,(pathRetetaStorage === folder?styles.Selected:styles.NotSelected)]} onPress={()=>{changePath(folder)}}>
                    <Text style={{ textAlign: 'center' }}>{titlu}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Data: {date}</Text>
                        <Text>Timpul: {time}</Text>
                    </View>
                        <TouchableOpacity style={styles.BTNstyle} onPress={() => {
                            changeChosenPath(folder)
                            changeShowModal(true)
                        }}>
                            <Text style={{ textAlign: 'center' }}>Afiseza</Text>
                        </TouchableOpacity>
                </Pressable>
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    Selected:{
        borderWidth:2,
        borderColor:SelectedBorderColor,
        elevation:4,
        shadowColor:SelectedBorderColor,
    },
    NotSelected:{

    },
    BTNstyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: formularButtonSubmit,
        width: 90,
        height: 50,
        borderRadius: 10,
        marginStart: 10,
    },
    container: {
        width: '80%',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: formularBackground,
        justifyContent: 'center',
        padding:10,
        alignSelf:'center',
    },
    Imgstyle: {
        height: 30,
        width: 30,
        alignSelf: 'center',
    },
    actionBTN: {
        marginEnd: 10,
        height: 40,
        width: 40,
        backgroundColor: 'lime',
        borderRadius: 10,
        justifyContent: 'center',
    },
})

export default ModalSelectorWithLabels