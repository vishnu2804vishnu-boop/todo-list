import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { Button, TextInput, List, Checkbox, FAB, Title } from 'react-native-paper';

export default function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  
  const addTodo = () => {
    if (text.trim() !== '') {
      setTodos([...todos, { 
        text, 
        id: Date.now(), 
        completed: false 
      }]);
      setText('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const renderTodo = ({ item }) => (
    <List.Item
      title={item.text}
      titleStyle={item.completed ? styles.completedText : {}}
      left={() => (
        <Checkbox
          status={item.completed ? 'checked' : 'unchecked'}
          onPress={() => toggleTodo(item.id)}
        />
      )}
      right={() => (
        <List.Icon 
          icon="delete" 
          color="#e74c3c" 
          onPress={() => deleteTodo(item.id)} 
        />
      )}
      style={styles.todoItem}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.title}>Todo List</Title>
      
      <View style={styles.inputContainer}>
        <TextInput
          label="Add a new task"
          value={text}
          onChangeText={setText}
          mode="outlined"
          style={styles.input}
          onSubmitEditing={addTodo}
        />
        <Button 
          mode="contained" 
          onPress={addTodo} 
          style={styles.addButton}
          disabled={!text.trim()}
        >
          Add
        </Button>
      </View>
      
      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        ListEmptyComponent={
          <List.Item
            title="No tasks yet"
            description="Add a task to get started"
            left={() => <List.Icon icon="information" />}
          />
        }
      />
      
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          if (text.trim()) addTodo();
        }}
        disabled={!text.trim()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    marginBottom: 8,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: 'white',
    marginVertical: 4,
    borderRadius: 8,
    elevation: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#3498db',
  },
});