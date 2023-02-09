import * as React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Alert,Modal, Pressable } from 'react-native';
import { Header, Icon, Input } from '@rneui/base';
import { TaskContext } from './Contextprovider';
import { useEffect,useState } from 'react';





export default function HomeScreen({navigation}) {
    
    
const [modalVisible, setModalVisible] = useState(false);
const [modalVisible2, setModalVisible2] = useState(false);
const {tasks} = React.useContext(TaskContext);
const [taskType, setTaskType] = useState('');
const {removeTask} = React.useContext(TaskContext);
const {addTask} = React.useContext(TaskContext);
const [taskName, setTaskName] = useState('');
const [taskid, setTaskid] = useState('');
const [taskDescription, setTaskDescription] = useState('');
const [Personaltasks, setPersonaltasks] = useState(0);
const [Worktasks, setWorktasks] = useState(0);
const [Listtasks, setListtasks] = useState(0);
const [Ideastasks, setIdeastasks] = useState(0);
useEffect(() => {

  if(tasks!=null){
    console.log('useeffect2')
    console.log(tasks.filter((task) => task.type === "personal").length);
    let personal = 0;
    let work = 0;
    let list = 0;
    let ideas = 0;
    tasks.map((task) => {
      if (task.type === "personal") {
        personal = personal + 1;
      }
      if (task.type === "work") {
        work = work + 1;
      }
      if (task.type === "list") {
        list = list + 1;
      }
      if (task.type === "ideas") {
        ideas = ideas + 1;
      }
    })
    setPersonaltasks(personal);
    setWorktasks(work);
    setListtasks(list);
    setIdeastasks(ideas);
  }
  
  }, [tasks]);

  function handletasks() {

    let typea = taskType.trim().toLowerCase();

    if (typea != "personal" && typea != "work" && typea != "list" && typea != "ideas") {
      Alert.alert("Type must be one of the following: personal,work,list,ideas");
    }
    else {

      addTask(taskName, taskDescription, typea);
    }
  }

  function handletasks2() {

    const tasktodel= tasks.filter((task) => task.id === taskid);
    if(tasktodel!=null){
    removeTask(taskid);
    }
}


    return (
      
      <View style={styles.container}>
  <Header
          title="My Tasks App"
          leftComponent={
            <TouchableOpacity onPress={()=> setModalVisible(true)}>
              
              
              <Icon name='pluscircle' type='antdesign'/>

            </TouchableOpacity>

            
            }
          centerComponent={{ text: 'My Tasks App', style: { color: '#fff' } }}
          rightComponent={
            <TouchableOpacity onPress={()=> setModalVisible2(true)}>
              
              
              <Icon name='delete' type='antdesign'/>

            </TouchableOpacity>

            
            }
        />
      
        
        <View style={{flex:0.8}}>
        <View style={{marginTop:50}}>
        <View style={styles.rowsa}>
        <TouchableOpacity onPress={() => navigation.navigate('Personal')}>
        <Text style={styles.textrows} > Personal: {Personaltasks} </Text> 
        </TouchableOpacity>
        </View>
        <View style={styles.rowsa}>
        <TouchableOpacity onPress={() => navigation.navigate('Work')}>
        <Text style={styles.textrows}> Work: {Worktasks} </Text> 
        </TouchableOpacity>
        </View>
        <View style={styles.rowsa}>
        <TouchableOpacity onPress={() => navigation.navigate('Ideas')}>
        <Text style={styles.textrows}> Ideas: {Ideastasks} </Text> 
        </TouchableOpacity>
        </View>
        <View style={styles.rowsa}>
        <TouchableOpacity onPress={() => navigation.navigate('List')}>
        <Text style={styles.textrows}> List : {Listtasks} </Text> 
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter new Task</Text>
            <Input key={"taskname"} onChangeText={(text) => setTaskName(text)}> Enter task name</Input>
            <Input key={"taskdescription"} onChangeText={(text) => setTaskDescription(text)}> Enter task description </Input>
            <Input key={"tasktype"} onChangeText={(text) => setTaskType(text)}> Enter task type </Input>
            
        
              <Pressable
              style={[styles.button]}
              onPress={() => handletasks()}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>


            <Pressable
              style={[styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    
    </View>

    <View style={styles.centeredView}>
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible2}
  onRequestClose={() => {
    setModalVisible(!modalVisible2);
  }}>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Delete Task</Text>
      <Input key={"taskname"} onChangeText={(text) => setTaskid(text)}> Enter task Id</Input>  
        <Pressable
        style={[styles.button]}
        onPress={() => handletasks2()}>
        <Text style={styles.textStyle}>Submit</Text>
      </Pressable>


      <Pressable
        style={[styles.buttonClose]}
        onPress={() => setModalVisible2(!modalVisible2)}>
        <Text style={styles.textStyle}>Hide Modal</Text>
      </Pressable>

    </View>
  </View>
</Modal>

</View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ddf0e8',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    rowsa: {
      backgroundColor : "#2089dc",
      textAlign : "center",
      marginBottom : 90,
      width:300,
      
    } ,
  
    textrows: {
      color: "#fff",
      fontSize: 30,
      textAlign: "center",
    } ,
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      flex:1,
      width:"100%",
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      marginBottom:30,
      elevation: 2,
      backgroundColor: '#2196F3',

    },
  
    buttonClose: {
      backgroundColor: '#2196F3',
      borderRadius: 20,
      padding: 10,
      marginTop:170,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    dropdown: {
      alignSelf: 'center',
    },
    dropdownList: {
      alignItems: 'center',
    }
  });