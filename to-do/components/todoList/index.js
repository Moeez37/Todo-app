'use client'
import { useState } from 'react';
import TodoItemList from './todoList';
import Image from 'next/image';

const TodoList = ({
  todos,
  setTodos
}) => {
  const [showList, setShowList] = useState(false);

  const toggleList = () => {
    setShowList(prevState => !prevState);
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto mt-20">
      <div onClick={toggleList} className="cursor-pointer flex items-center justify-between bg-[#bdb393] px-2 py-3 rounded">
        <div className="flex items-center">
          <Image
            alt='List Icon'
            src={'/list-icon.svg'}
            width={24}
            height={24}
          />
          <p className="text-lg font-bold ml-2 text-white">Your Todos</p>
        </div>
        <div className="cursor-pointer">
          <Image
            alt='Chevron Icon'
            src={'/chevron-icon.svg'}
            width={16}
            height={16}
          />
        </div>
      </div>

      {showList
        ? (
          <div className="mt-4">
            <TodoItemList
              todos={todos}
              setTodos={setTodos}
            />
          </div>
        )
        : null
      }
    </div>
  );
};

export default TodoList;
