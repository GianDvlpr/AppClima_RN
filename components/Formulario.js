import React, { Fragment, useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Animated, Alert } from 'react-native'
import { Picker } from '@react-native-community/picker'

const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {

    const { pais, ciudad } = busqueda

    const [animacionBoton] = useState(new Animated.Value(1))

    const consultarClima = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta()
            return
        }

        //Consultar la API
        setConsultar(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y pais para la busqueda',
            [{ text: 'Entendido' }]
        )
    }


    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            toValue: .75,
            friction: 2,
            tension: 30,
            useNativeDriver: true
        }).start()
    }

    const animacionSalida = () => {
        Animated.spring(animacionBoton, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionBoton }]
    }

    return (

        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        placeholder='Ciudad'
                        placeholderTextColor='#666'
                        onChangeText={ciudad => setBusqueda({ ...busqueda, ciudad })}
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={pais}
                        itemStyle={{ height: 120, backgroundColor: '#fff' }}
                        onValueChange={pais => setBusqueda({ ...busqueda, pais })}
                    >
                        <Picker.Item label='-- Selecciona un País --' value='' />
                        <Picker.Item label='Estados Unidos' value='US' />
                        <Picker.Item label='Perú' value='PE' />
                        <Picker.Item label='Chile' value='CL' />
                        <Picker.Item label='Argentina' value='AR' />
                        <Picker.Item label='Colombia' value='CO' />
                        <Picker.Item label='México' value='MX' />
                        <Picker.Item label='España' value='ES' />
                        <Picker.Item label='Costa Rica' value='CR' />
                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={() => animacionEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() => consultarClima()}
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>

    )
}

export default Formulario

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 18,
        textAlign: 'center'
    }
})
