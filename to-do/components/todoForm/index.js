import Image from "next/image";
import { useState } from "react";

const TodoForm = ({
    newTodoHandler
}) => {

    const [todo, setTodo] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        newTodoHandler({ title: todo ,setTodo:setTodo})
        
    }

    return (
        <form onSubmit={submitHandler} className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto mt-20">
            <div className="flex items-center border-b py-2">
                <input
                    className="flex-grow appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Add new task"
                    aria-label="Full name"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button className="flex-shrink-0 bg-[#bdb393] text-sm py-1 px-2 rounded" type="submit">
                    <Image
                        alt='Plus Icon'
                        src={'/plus-icon.svg'}
                        width={24}
                        height={24}
                    />
                </button>
            </div>
        </form>
    );
};

export default TodoForm;

