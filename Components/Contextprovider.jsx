import React, { useState, createContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


// write use context here
export const TaskContext = createContext();

export default function TaskProvider(props)  {
    const [tasks, setTasks] = useState(null);
    const [idglobal, setIdglobal] = useState(0);

    useEffect(() => { 


        getTasks();

        

    }, []);

    const getTasks = async () => {
        try {
            const jsonvalue = await AsyncStorage.getItem('tasks');
            if (jsonvalue != null) {               
                const mytasksright=JSON.parse(jsonvalue);
                console.log(mytasksright);
                setTasks(mytasksright);
                setTasks(JSON.parse(jsonvalue));
                await AsyncStorage.getItem('counter').then((value) => {
                    if (value != null) {
                        setIdglobal(JSON.parse(value));
                        console.log('idglobal is: ' + idglobal);
                    }
                });
            }
            else{
                console.log('jsonvalue is null this is first time');
                await AsyncStorage.setItem('counter', JSON.stringify(0));
                await AsyncStorage.getItem('counter').then((value) => {
                    if (value != null) {
                        setIdglobal(JSON.parse(value));
                        console.log('idglobal is: ' + idglobal);
                    }
                });

            }
        } catch (e) {
            console.log(e);
        }
    }
    

    
    const addTask = async (title,description,type) => {

        try{
            console.log('im entered to add task function')
            if(tasks != null) {
                

                await AsyncStorage.getItem('tasks').then((value) => { 
                    if (value != null) {
                        const mytasks=JSON.parse(value);
                        console.log('my tasks length is: ' + mytasks.length);
                        setTasks([...mytasks, { title, id: idglobal, description, type }]);
                        AsyncStorage.setItem('tasks', JSON.stringify([...mytasks, { title, id: idglobal, description, type }]));
                        Alert.alert("Task was added!")
                    }
                });

            }
            
            else{
                const tasks=[];
                setTasks([...tasks, { title, id: idglobal, description, type }]);
                await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
                Alert.alert("Task was added!")

            }

            await AsyncStorage.getItem('counter').then((value) => {
                if (value != null) {
                    const myidglob = JSON.parse(value);
                    setIdglobal(myidglob + 1);
                    AsyncStorage.setItem('counter', JSON.stringify(myidglob + 1));
                    console.log('idglobal is: ' + idglobal);
                }
            });
       
        }
        catch(e) {
            console.log(e);
            }
        }


    const removeTask = async (id) => {
        await AsyncStorage.getItem('tasks').then((value) => { 
            if (value != null) {
                const mytasks=JSON.parse(value);
                let tasktoremovw=mytasks.filter(task => task.id == id);
                if(tasktoremovw.length > 0){
                setTasks(tasks.filter(task => task.id != id));
                AsyncStorage.setItem('tasks', JSON.stringify(mytasks.filter(task => task.id != id)));
                Alert.alert("Task was Removed!")
                }
                else{
                    Alert.alert("Task was not found!")
                }
            }
        });
    }


    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, setTasks }}>
            {props.children}
        </TaskContext.Provider>
    );
}