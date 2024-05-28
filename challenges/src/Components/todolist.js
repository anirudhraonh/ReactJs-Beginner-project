import { useState } from 'react';


export default function ToDoList(){
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