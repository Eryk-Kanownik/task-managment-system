import { Action, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {v4} from "uuid"


export interface PeopleState {
    people:IPerson[]
}

export interface IPerson{
    personId:string,
    profileImage:string;
    personName:string
}

const initialState: PeopleState = {
    people:[]
};

export const peopleSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addPerson: (state,action) => {
        state.people.push({ personId:v4(),profileImage:"https://picsum.photos/300/300",personName:action.payload})
    },
    movePeopleBack:(state,action) => {
      state.people.push(...action.payload)
    },
    deletePerson:(state, action) => {
      state.people.splice(state.people.map(person => person.personId).indexOf(action.payload),1)
    }
  },
});

export const { addPerson, deletePerson, movePeopleBack } = peopleSlice.actions;

export default peopleSlice.reducer;
