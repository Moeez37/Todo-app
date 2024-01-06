'use client'
import Image from "next/image";
import TodoList from "../todoList";
import axios from "axios"
import TodoForm from "../todoForm";
import { useEffect, useState } from "react";

const DUMMY_TODOS = [
]

const Home = () => {

    const [todos, setTodos] = useState(DUMMY_TODOS)

    const newTodoHandler =(todo) => {
        let data = JSON.stringify({
            "date": new Date(),
            "title": todo.title,
            "status": false,
          }); 
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3001/todo/new',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
          
        axios.request(config)
          .then((response) => {
            todo["id"]=response.data.id;
            todo.setTodo('');
           setTodos((preState) => [...preState, todo])
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect(() => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3001/todo',
                headers: { }
              };
              
             axios.request(config)
              .then((response) => {
                const todos = response.data.todos;
                setTodos(todos);
              })
              .catch((error) => {
                console.log(error);
              });
    }, [])

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="mt-8 mb-4 rounded-full bg-gray-300 p-2 inline-flex items-center justify-center">
                    <div className="rounded-full overflow-hidden bg-white">
                        <Image
                            height={96}
                            width={96}
                            src="/profile.jpg"
                            alt="Your Image Alt Text"
                            className="w-36 h-36 object-cover rounded-full "
                            layout='fixed'
                        />
                    </div>
                </div>
            </div>
            <TodoForm newTodoHandler={newTodoHandler} />
            <TodoList todos={todos} setTodos={setTodos} />
        </>
    );
}

export default Home;