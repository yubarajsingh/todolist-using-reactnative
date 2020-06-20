import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  StatusBar,
  StyleSheet,
  Switch,
} from "react-native";

let id = 0;
const styles = StyleSheet.create({
  TodoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
  },
  appContainer: { paddingTop: StatusBar.currentHeight },
});

const Todo = (props) => (
  <View style={styles.TodoContainer}>
    <Button styles={{ color: "red" }} onPress={props.onDelete} title="delete" />
    <Text>{props.todo.text}</Text>
    <Switch value={props.todo.checked} onValueChange={props.onToggle} />
  </View>
);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  addTodo() {
    id++;
    const text = `TODO number ${id}`;
    this.setState({
      todos: [...this.state.todos, { id: id, text: text, checked: false }],
    });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        };
      }),
    });
  }

  render() {
    return (
      <View style={styles.appContainer}>
        {console.log(StatusBar.currentHeight)}
        <Text>Todo count: {this.state.todos.length}</Text>
        <Text>
          Unchecked todo count:{" "}
          {this.state.todos.filter((todo) => !todo.checked).length}
        </Text>
        <Button onPress={() => this.addTodo()} title="ADD todo" />
        <ScrollView>
          {this.state.todos.map((todo) => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
