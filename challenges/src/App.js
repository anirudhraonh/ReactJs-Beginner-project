import { useState } from 'react';
import Game from './Components/tictactoe'
import ToDoList from './Components/todolist'
  

export default function App() {
  const [content,setContent] = useState(<h1 className='text-2xl my-4'><center>Welcome to homepage</center></h1>);
  //handlers
  function handleContent(id){
    console.log('Content handler entered');
    
    if (id==='1'){setContent(<ToDoList/>);}
    else if (id==='2'){setContent(<Game/>);}
    
  }


  // Render
  return (
    <div className='m-2'>
      <nav >
        <ul className='shadow-2xl p-2 m-2 flex gap-5 '>
          <li id='1' className='hover:bg-black hover:text-white rounded-xl p-2 m-2 ring-1 ring-black' onClick={(event)=>handleContent(event.target.id)}>To-Do List</li>
          <li id='2' className='hover:bg-black hover:text-white hover:duration-300 rounded-xl p-2 m-2 ring-1 ring-black' onClick={(event)=>handleContent(event.target.id)}>Tic Tac Toe</li>
        </ul>
      </nav>

      {content}
    </div>
  );

}