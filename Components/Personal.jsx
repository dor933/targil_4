import * as React from 'react';
import {  StyleSheet, Text, TouchableOpacity, View, ScrollView  } from 'react-native';
import { Header,Icon } from '@rneui/base';
import { TaskContext } from './Contextprovider';
import { Card } from '@rneui/themed';
     
//access to the context





export default function Personalscreen({navigation}) {

    const {tasks} = React.useContext(TaskContext);
    const [numberpersonal,setnumberpersonal] = React.useState(0);

    React.useEffect(() => { 
      
        const personal=tasks.filter((task) => task.type === "personal").length;
        setnumberpersonal(personal);
        console.log(numberpersonal)
    },[]);



   if(numberpersonal>0) {
    return (
      
      <View style={styles.container}>
        <View style={{flex:1,alignItems:"center"}}>
  <Header
          title="My Tasks App"
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: "Personal:" + numberpersonal, style: { color: '#fff' } }}
          rightComponent= {  <TouchableOpacity onPress={()=> navigation.navigate("Home")}>

          <Icon name='home' color="#fff" />
  
              </TouchableOpacity>}
        />
      
        
        <View >
        <View >
        <View style={styles.rowsa}>
            <ScrollView>
        {tasks.map((task) => {
            if (task.type === "personal") {
            return (
                <View style={{marginBottom:20,marginTop:20}} key={task.id}>
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
      </View>
    );
   }
   else{
    return(
        <View style={styles.container}>
        <Header
                title="My Tasks App"
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'My Tasks App', style: { color: '#fff' } }}
                rightComponent= {  <TouchableOpacity onPress={()=> navigation.navigate("Home")}>

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
