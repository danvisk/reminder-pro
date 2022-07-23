import './App.css';
import { addReminder, setText, delReminder, clearAll } from './reducer.js'
import { connect } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';

function App(props) {
  const state = props.state;
  const[dueDate, setDate] = useState('');
  
  //useEffect(()=>console.log(state),[state.reminders]);

  function addReminder(e) {
    e.preventDefault();
    if(state.text !== '' && dueDate!=='') {
      props.addReminder(state.text, dueDate);

    }
  }

  function renderReminders() {
    // moment(new Date(reminder.dueDate)).fromNow()
    return (
      <ul className='list-group'>
        {state.reminders.map(reminder => {
          return (
            <li key={reminder.id} className={'list-group-item '+reminder.css}>
              <div className='list-item'>
                <div>{reminder.text}</div>
                <div><i>{moment(new Date(reminder.dueDate)).fromNow()}</i></div>
                
              </div>
              <div onClick={()=>props.delReminder(reminder.id)}
              className='list-item delete-btn'>
                &#x2715;
              </div>
            </li>
          )
        })  }    
      </ul>
    )  
  }

  const nowValue = new Date();
  nowValue.setMinutes(nowValue.getMinutes() - nowValue.getTimezoneOffset());
  const now = nowValue.toISOString().slice(0, 16);
  //const tomorrow = new Date(Date.parse(nowValue) + 24*3600000).toISOString().slice(0, 16);

  return (
    <div className='App'>
      <pre className='title'> Reminder Pro </pre>
      <div className ='form-inline'>
        <form onSubmit={addReminder} className='form-group'>
          <input className='form-control' value={state.text}
          onChange={(e)=>{props.setText(e.target.value)}} placeholder='I have to...' />
          <input className='form-control date' type='datetime-local' 
          onChange={(e)=>{setDate(e.target.value)}} min={now}/>
          <button className='add-btn btn btn-success'>
            Add Reminder
          </button>  
        </form>  
      </div>
      {renderReminders()}
      {state.reminders.length !== 0 &&
      <button className='clear-btn btn btn2 btn-outline-danger'
      onClick={props.clearAll}>Remove Reminders</button> }
      <dialog>
        <p>Maximum of 8 events allowed!</p>
        <form method="dialog">
          <button className='diag-btn btn btn-success'>OK</button>
        </form>
      </dialog>
    </div>    
  );
}

function mapStateToProps(state) {
  return { state };
}

const mapDispatchToProps = {setText, addReminder, delReminder, clearAll};

export default connect (mapStateToProps, mapDispatchToProps)(App);
