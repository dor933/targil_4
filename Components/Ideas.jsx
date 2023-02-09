import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ScrollView } from 'react-native';
import { Header,Icon } from '@rneui/base';
import { Card } from '@rneui/themed';
import { TaskContext } from './Contextprovider';



export default function Ideasscreen({navigation}) {
    const {tasks} = React.useContext(TaskContext);
    const [numberideas,setnumberideas] = React.useState(0);

    React.useEffect(() => { 
      
        const ideas=tasks.filter((task) => task.type === "ideas").length;
        setnumberideas(ideas);
    },[]);

    if(numberideas>0) {

    return (
      
      <View style={styles.container}>
        <View style={{flex:1,alignItems:"center"}}>
  <Header
          title="My Tasks App"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Ideas:' + numberideas, style: { color: '#fff' } }}
          rightComponent={  <TouchableOpacity onPress={()=> navigation.navigate("Home")}>

          <Icon name='home' color="#fff" />
  
              </TouchableOpacity>}
        />
      
        
        <View>
        <View style={styles.rowsa}>
        <ScrollView>
        {tasks.map((task) => {
            if (task.type === "ideas") {
            return (
                <View style={{marginTop:20,marginBottom:20}} key={task.id}>
                <Card>
                <Card.Title> Name:{task.title}</Card.Title>
            <Text style={{textAlign:"center"}}>Id:{task.id}</Text>
            <Text style={{textAlign:"center"}}>Type: {task.type} </Text>
            <Text style={{textAlign:"center"}}>Description: {task.description} </Text>
            </Card>
            </View>
            )
            }
        })}
        </ScrollView>
        </View>
        </View>
        </View>
      </View>
    ); }
    else {
        return (
            <View style={styles.container}>
  <Header
          title="My Tasks App"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'My Tasks App', style: { color: '#fff' } }}
          rightComponent={  <TouchableOpacity onPress={()=> navigation.navigate("Home")}>

          <Icon name='home' color="#fff" />
  
              </TouchableOpacity>}
        />
      
        
        <View style={{flex:0.8}}>
        <View style={{marginTop:50}}>
        <View style={styles.rowsa}>
   
   <Text style={{fontSize:30}}> There is no tasks!</Text>
        </View>
        </View>
      </View>
      </View>
        )
    }
  }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddf0e8',
        alignItems: 'center',
        justifyContent: 'center',
    }
    ,
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
    }   
    });
