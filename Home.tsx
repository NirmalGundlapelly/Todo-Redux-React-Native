import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import STRINGS from './config';
import {
  handleAddTodo,
  handleInputChange,
  handleDelete,
  handleEdit,
  hanldeUpdate
} from '../../../redux/todoSlice';
import {RootState} from '../../../redux/store';
import HomeController from './HomeController';
import { Todo } from './HomeController';


class Home extends HomeController {

  renderTodoList = (item: Todo) => {
    return (<>
      <StatusBar  translucent backgroundColor={STRINGS.GREEN}/>
      <View style={styles.todoItem}>
        <Text style={{color: STRINGS.WHITE}}>{item.text}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.props.handleEdit(item)}
            style={{
              backgroundColor: STRINGS.LITE_BLUE,
              paddingHorizontal: 10,
              borderRadius: 5,
              marginRight: 5,
            }}>
            <Text style={{color: STRINGS.WHITE, marginTop: 4, height:25}}>
              {STRINGS.EDIT}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.handleDelete(item.id)}
            style={{
              backgroundColor: STRINGS.RED,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
            <Text style={{color: STRINGS.WHITE, marginTop: 4, height: 25}}>
              {STRINGS.DELETE}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </>
    );
  };

  render() {
    const {todoList} = this.props;
    return (
      <SafeAreaView>
        <StatusBar backgroundColor={STRINGS.GREEN} />
        <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <Text style={styles.todoHeading}>{STRINGS.TODO_APP}</Text>
          </View>
          <View style={styles.todoContainer}>
            <TextInput
              value={this.props.task}
              onChangeText={text => this.props.handleInputChange(text)}
              placeholder={STRINGS.ADD_A_NEW_TASK}
              style={styles.input}
            />
            {this.props.tempId == null ? (
              <TouchableOpacity
                onPress={() => this.props.handleAddTodo()}
                style={styles.addButton}>
                <Text style={styles.nextButtonText}>{STRINGS.ADD}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this.props.hanldeUpdate()}
                style={{...styles.addButton, backgroundColor: this.props.tempId != null? STRINGS.GREEN: STRINGS.BLACK}}>
                <Text style={styles.nextButtonText}>{STRINGS.UPDATE}</Text>
              </TouchableOpacity>
            )}

            <View style={styles.bodyContainer}>
              {!todoList.length ? (
                <View style={styles.writeTextContainer}>
                  <Text style={styles.writeSomeText}>
                    {STRINGS.WRITE_SOME_THING}
                  </Text>
                </View>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={todoList}
                  renderItem={({item}) => this.renderTodoList(item)}
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  task: state.todos.task,
  todoList: state.todos.todoList,
  tempId: state.todos.tempId
});

export default connect(mapStateToProps, {
  handleAddTodo,
  handleInputChange,
  handleDelete,
  handleEdit,
  hanldeUpdate,
})(Home);          

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: STRINGS.GREEN,
    height: 70,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  todoHeading: {
    color: '#dbd8ce',
    fontWeight: '600',
    fontSize: 30,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#019401',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  addButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
    height: 40,
  },

  nextButtonText: {color: 'white', textAlign: 'center'},
  todoContainer: {
    padding: 10,
  },
  input: {
    borderColor: '#b3b6ba',
    borderWidth: 1,
    padding: 10,
    margin: 20,
    borderRadius: 10,
    height: 40,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    elevation: 10,
    height: 50,
    backgroundColor: '#b5b1b1',
    margin: 10,
    borderRadius: 10,
  },
  bodyContainer: {height: Dimensions.get('window').height / 1.47},
  writeSomeText: {
    color: '#9c918f',
    fontWeight: '700',
    fontSize: 25,
  },
  writeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
