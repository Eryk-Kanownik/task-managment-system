import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import peopleReducer from '../features/people/peopleSlice';
import tasksReducer from '../features/tasks/tasksSlice';
export const store = configureStore({
  reducer: {
    people:peopleReducer,
    tasks:tasksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

