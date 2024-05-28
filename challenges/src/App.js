import { useState } from 'react';

function ToDoList(){
 console.log('Entered todolist component');
    // States
    const [tasks, setTasks] = useState([]);

    // Handlers
    function addTask(event) {
      event.preventDefault();
      const task = document.getElementById('task').value;
      setTasks([...tasks, { task: task, status: 'Uninitiated' }]);
      document.getElementById('task').value = ''; // Clear the input field after adding the task
    }
  
    function handleColor(status) {
      let color = 'text-white';
      if (status === 'Uninitiated') {
        color = 'text-red-300';
      } else if (status === 'Done') {
        color = 'text-green-600';
      } else {
        color = 'text-blue-600';
      }
      return color;
    }
  
    function toggleStatus(index) {
      const newTasks = tasks.map((task, i) => {
        if (i === index) {
          let newStatus;
          if (task.status === 'Uninitiated') {
            newStatus = 'In Progress';
          } else if (task.status === 'In Progress') {
            newStatus = 'Done';
          } else {
            newStatus = 'Uninitiated';
          }
          return { ...task, status: newStatus };
        }
        return task;
      });
      setTasks(newTasks);
    }
  
    function deleteTask(index){
      setTasks(tasks.filter((_,i) => i!==index));     
    }

//render
  return(
    <div className='font-mono shadow-2xl p-4 mt-36 w-1/2 mx-auto '>
    <center>
      <h1 className='text-2xl'>To-Do List</h1>
      <form id='myform'>
        <input
          type='text'
          id='task'
          className='p-2 m-2 ring-black ring-2'
          name='task'
          placeholder='Enter task...'
        />
        <button
          id='btn'
          onClick={addTask}
          className='p-2 m-2 bg-green-200 hover:bg-green-600'
        >
          ADD
        </button>
      </form>

      <div className='bg-gray-300 text-black rounded-sm w-2/3 my-6 mx-10  shadow-2xl'>
        TASK | STATUS
        <hr />
        {tasks.map((task_obj, index) => {
          console.log('task:', task_obj, index);

          return (
            <div key={index}>
              <p>
                {task_obj.task}
                <button
                  className='rounded-sm p-2 m-2 bg-gray-800 hover:opacity-50'
                  onClick={() => toggleStatus(index)}
                >
                  <strong className={handleColor(task_obj.status)}>{task_obj.status}</strong>
                </button>
                <button className='rounded-sm p-2 m-2 bg-gray-800 text-white hover:opacity-50' onClick={()=>deleteTask(index)}>Delete</button>
              </p>
            </div>
          );
        })}
      </div>
    </center>
  </div>
);
  
}
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


//Tic Tac Toe

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  //handlers
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  //render
  return (
    <div className='bg-white shadow-2xl m-auto mt-20 w-1/4 justify-normal'>
     <h1 className='font-mono p-2 m-1'> Welcome to Tic Tac Toe</h1>
    <div className="game p-2">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
    </div>
  );
}

//tic tac toe components
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//js function for tic tac toe
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}