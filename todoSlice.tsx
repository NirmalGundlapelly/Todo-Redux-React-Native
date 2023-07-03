import {PayloadAction, createSlice, current} from '@reduxjs/toolkit';
import {Alert, Keyboard} from 'react-native';

interface Todo{
   id: number
   text: string
}

// basic example slice copied from the docs
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todoList: [],
    task: '',
    tempId: null,
  },
  reducers: {
    handleInputChange: (state, action) => {
      state.task = action.payload;
    },

    handleAddTodo: (state:{todoList:Todo[], task:string}) => {
      const {todoList, task} = state;
      if (task !== '') {
        let newTodo = {
          id: todoList.length + 1,
          text: task,
        };
        state.todoList = [...todoList, newTodo];
        state.task = '';
        Keyboard.dismiss();
      }
    },

    hanldeUpdate: (state) => {
      state.todoList.map((each:Todo) => {
        if (each.id === state.tempId){
            //
            return (
              (each.text = state.task)
            )
        }
      })
      state.tempId = null,
      state.task = ''
    },

    handleEdit: (state, action) => {
      state.task= action.payload.text
      state.tempId = action.payload.id
    },

    handleDelete: (state:{todoList:Todo[], task:string, tempId:null}, action:PayloadAction<number>) => {
      const {todoList} = state;
            let fileteredItems = todoList.filter(
              eachTodo => eachTodo.id != action.payload,
            );
            state.todoList = fileteredItems
            state.task = ''
            state.tempId = null
      // Alert.alert('Delete Todo', 'Are you sure you want to delete?', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => null,
      //     style: 'cancel',
      //   },
      //   {
      //     text: 'YES',
      //     onPress: () => {
      //       const {todoList} = state;
      //       let fileteredItems = todoList.filter(
      //         eachTodo => eachTodo.id != action.payload,
      //       );
      //       state.todoList = fileteredItems;
      //     },
      //   },
      // ]);
    },
  },
});


const {actions, reducer} = todoSlice;


export const {handleAddTodo, handleInputChange, handleDelete, handleEdit, hanldeUpdate} =
  actions;

export default reducer;
