import React, { useState, useEffect } from 'react'
import { Modal, Text, SafeAreaView, StyleSheet, TextInput, View, ScrollView, Pressable, Alert } from "react-native"
import DatePicker from 'react-native-date-picker'

const Formulario = ({
  modalVisible,
  cerrarModal,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp}) => {

  const [id, setId] = useState('')
  const [paciente, setPaciente] = useState('')
  const [propietario, setpropietario] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fecha, setFecha] = useState(new Date)
  const [sintomas, setSintomas] = useState('')

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id)
      setPaciente(pacienteObj.paciente)
      setpropietario(pacienteObj.propietario)
      setEmail(pacienteObj.email)
      setTelefono(pacienteObj.telefono)
      setFecha(pacienteObj.fecha)
      setSintomas(pacienteObj.sintomas)
    }

  }, [pacienteObj])






  const handleCita = () => {
    if ([paciente, propietario, email, fecha, sintomas].includes('')) {
      Alert.alert(
        'Error',
        'Todos los campos son Obligatorios',
        [{ text: 'Cancelar' }, { text: 'Ok' }]
      )
      return
    }

    // si es registro nuevo o edicion 
    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas
    }

    if (id) {
      // editar
      nuevoPaciente.id = id;
      const pacientesActualizados = pacientes.map(pacienteState =>
      pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPacienteApp({})

    } else {
      nuevoPaciente.id = Date.now()
      setPacientes([...pacientes, nuevoPaciente])
    }

    cerrarModal()
    setId('')
    setPaciente('')
    setpropietario('')
    setEmail('')
    setTelefono('')
    setFecha(new Date())
    setSintomas('')
  }

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
    >
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text
            style={styles.titulo}
          >{pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable
            style={styles.btnCancelar}
            onPress={() => {
              cerrarModal()
              setPacienteApp({})
              setId('')
              setPaciente('')
              setpropietario('')
              setEmail('')
              setTelefono('')
              setFecha(new Date())
              setSintomas('')
            }}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>

          </Pressable>


          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre Paciente'
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>


          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Nombre Propietario'
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setpropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Email Propietario'
              placeholderTextColor={'#666'}
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Telefono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder='Telefono Propietario'
              placeholderTextColor={'#666'}
              keyboardType='number-pad'
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha de Alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                locale="es"
                onDateChange={(date) => setFecha(date)}
              />
            </View>

          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasImput]}
              placeholder='Sintomas paciente'
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>


          <Pressable
            style={styles.btnNuevaCita}
            onPress={handleCita}
          >
            <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'}  Paciente</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    color: '#fff'
  },
  tituloBold: {
    fontWeight: '900'
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10
  },
  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
    marginBottom: 10
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  sintomasImput: {
    height: 100
  },
  fechaContenedor: {
    backgroundColor: '#fff',
    borderRadius: 10
  },
  btnNuevaCita: {
    marginVertical: 40,
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    color: '#5827A4',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 16
  }
})



export default Formulario