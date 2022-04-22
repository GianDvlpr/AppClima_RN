import React, { useState, useEffect } from 'react'
import { StyleSheet, Keyboard, View, TouchableWithoutFeedback, Alert } from 'react-native'
import Formulario from './components/Formulario'
import Clima from './components/Clima'


const App = () => {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgcolor, setBgcolor] = useState('rgb(71,149,212)');

  const { ciudad, pais } = busqueda

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appId = '137484e0e74467343d8a9fb24c3158bc'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

        try {
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          setResultado(resultado)
          setConsultar(false)

          //Color de fondo
          const kelvin = 273.15
          const { main } = resultado
          const actual = main.temp - kelvin

          if (actual < 10) {
            setBgcolor('rgb(105,108,149)')
          } else if (actual >= 10 && actual < 25) {
            setBgcolor('rgb(71,149,212)')
          } else {
            setBgcolor('rgb(178,28,61)')
          }

        } catch (error) {
          mostrarAlerta()
        }
      }
    }
    consultarClima()
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No se encontraron resultados',
      [{ text: 'Ok' }]
    )
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima
              resultado={resultado}
            />
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
})
