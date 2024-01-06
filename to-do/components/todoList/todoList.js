import React, { useState } from 'react';
import axios from "axios";
import Image from 'next/image';
import axiosRetry from 'axios-retry';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
axiosRetry(axios, { retries: 3 });

const TodoList = ({ todos, setTodos }) => {

  const [detailedTodo, setDetailedTodo] = useState({});

  const doneTodoHandler = (id, status) => {
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: API_URL+"/todo/"+id,
      headers: {},
      data:{status:status},
    };
    
    axios.request(config)
    .then((response) => {
      setDetailedTodo({});
      setTodos((preState) => {
      return preState.map((todo) => {
        let updatedTodo = todo;
        if (todo?._id === id) {
          updatedTodo = ({ ...todo, status: status}) // place as it is as its already chnage
        }
        return updatedTodo;
      })
    })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const deleteTodoHandler = async(id) => {
    const response = await axios.delete(API_URL+"/todo/"+id);
    if(response.status == 200)
    {
      setDetailedTodo({});
      setTodos((preState) => preState.filter((todo) => todo?._id !== id))
    }
    else if([400,500].includes(response.status)) {
      alert("System facing technical issue please try later")
    }
    
  }

  const DetailsComponent = () => {
    return (
      <div className='bg-white p-4'>
        <p>
          {detailedTodo?.status
            ? <>
              <span className='text-bold'>Completed: </span>
              <span>{"Completed"}</span>
            </>
            : <><span className='text-bold'>Completed: </span>
            <span>{"Not Completed"}</span></>
          }
        </p>
        <p>
          <span>Created At: </span>
          <span>
          {detailedTodo?.date
            ? new Date(detailedTodo.date).toLocaleString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })
            : "Custom Date when detailedTodo.date is falsy"}
        </span>
        </p>
        <button
          onClick={() => deleteTodoHandler(detailedTodo._id)}
          className='mx-auto mt-3 w-full bg-[#fb9d9d] py-2 px-0 rounded text-red-500'
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="border rounded-md bg-[#d4caca]">
      {
        todos?.length > 0
          ? <ul>
            {todos?.map((todo) => (
              <>
                <li key={todo._id} className="flex items-center justify-between py-2 mx-6">
                  <div className="flex items-center space-x-2">
                    <Image
                      alt='Check Icon'
                      src={todo?.status && Boolean(todo?.status) ? '/check-icon.svg':'/uncomplete-icon.svg'  }
                      width={20}
                      height={20}
                      onClick={() => doneTodoHandler(todo._id, ! (todo?.status))} // whatever status is on click it shoud be change
                      className='cursor-pointer'
                    />
                    <p className="text-base">{todo?.title}</p>
                  </div>
                  <div className="cursor-pointer" onClick={() => setDetailedTodo(todo)}>
                    <Image
                      src={'/dot-icon.svg'}
                      alt="Dot Icon"
                      width={24}
                      height={24}
                    />
                  </div>
                </li>

                {
                  todo._id === detailedTodo._id
                    ? <DetailsComponent />
                    : null
                }
              </>
            ))}

          </ul>
          : <div className='h-[200px] flex justify-center items-center'>
            <p>No task today</p>
          </div>
      }
    </div>
  );
};

export default TodoList;
