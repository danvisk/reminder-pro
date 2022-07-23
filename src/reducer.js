import { bake_cookie, read_cookie } from 'sfcookies';

const ADD_REMINDER = 'ADD_REMINDER';
const SET_TEXT = 'SET_TEXT';
const DEL_REMINDER = 'DEL_REMINDER';
const CLEAR_ALL = 'DELL_ALL';

export function addReminder(text, dueDate) {
  return {type: ADD_REMINDER, text, dueDate};
}

export function delReminder(id) {
  return {type:DEL_REMINDER, id}
}

export function setText(text) {
  return {type:SET_TEXT, text}
}

export function clearAll() {
  return {type:CLEAR_ALL}
}

const initialState = {
  reminders: [],
  text: ''
};

let cont = -1;
function getText(action) {
  const { text, dueDate } = action;
  cont++;
  return {
    id: cont,
    css:'item' + (1+cont%8),
    text,
    dueDate
  }
}

// Reducer function
export function reducer(state = initialState, action) {
  let reminders = null;
  state = {text:'', reminders: read_cookie('reminders')};

  switch(action.type) {

    case ADD_REMINDER:
      if(state.reminders.length<8) {
        cont = read_cookie('cont');
        reminders = [...state.reminders, getText(action)];
        bake_cookie('reminders', reminders);
        bake_cookie('cont', cont); 
        return { reminders, text: ''}; }
      else {
        console.log('else was activated');
        reminders = state.reminders;
        const dialogEl = document.querySelector('dialog');
        dialogEl.show();
        //alert('Maximum of 8 events allowed!');
        return { reminders, text: '' }; 
      }
    case DEL_REMINDER:
      reminders = state.reminders.filter(
        reminder=> reminder.id !== action.id);
      bake_cookie('reminders', reminders);
      return { reminders, text: state.text };

    case CLEAR_ALL:
      reminders = [];
      bake_cookie('reminders', reminders);
      return { reminders, text: state.text };

    case SET_TEXT:
      return { reminders: state.reminders, text: action.text}; 
    
      default:
      return state;
  }
}











