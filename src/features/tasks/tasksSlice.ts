import { Action, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { IPerson } from '../people/peopleSlice';
import { v4 } from 'uuid';
import { act } from 'react-dom/test-utils';

export interface TasksState {
    tasks:ITask[],
    draggedPerson:IPerson | null
    draggedTask:ITask | null
}

export interface ITask{
    taskId:string;
    taskName:string;
    description:string;
    people:IPerson[]
    status?: "created" | "in-progress" | "finalized"
}

const initialState: TasksState = {
    tasks:[],
    draggedPerson:null,
    draggedTask:null
};

export const counterSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state,action) => {
        state.tasks.push({...action.payload, taskId:v4(), people:[], status: "created"})
    },
    removeTask: (state,action) => {
        //action.payload === taskId
        let index = state.tasks.map(task => task.taskId).indexOf(action.payload)
        state.tasks.splice(index,1)
    },
    loadUserToTemporary: (state,action) => {
        state.draggedPerson = action.payload
    },
    loadTaskToTemporary: (state,action) => {
        //action.payload === "changed state"
        state.draggedTask = action.payload
    },
    addPersonToCreatedTask:(state,action) => {
        let index = state.tasks.map(task => task.taskId).indexOf(action.payload.taskId)
        let checkIndexOfUser = state.tasks[index].people.map(person => person.personId).indexOf(state.draggedPerson!.personId) === -1
        if(checkIndexOfUser){
            state.tasks[index].people = [...state.tasks[index].people, state.draggedPerson!]
            state.draggedPerson = null;
        }
    },
    removePersonFromTask:(state,action) => {
        let taskIndex = state.tasks.map(task => task.taskId).indexOf(action.payload.taskId)
        let personIndex = state.tasks[taskIndex].people.map(person => person.personId).indexOf(action.payload.personId)
        state.tasks[taskIndex].people.splice(personIndex,1)
        state.draggedPerson = null;
    },
    changeTaskStatus:(state,action) => {
        state.tasks[state.tasks.map(task => task.taskId).indexOf(action.payload.taskId)].status = action.payload.status
        state.draggedTask = null
    },
    
  },
});

export const { addTask, removeTask, loadUserToTemporary, loadTaskToTemporary, addPersonToCreatedTask,changeTaskStatus, removePersonFromTask  } = counterSlice.actions;

export default counterSlice.reducer;
