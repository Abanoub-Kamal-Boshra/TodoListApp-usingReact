import {useState, useReducer} from 'react';
import logo from './logo.svg';

export function TodoInput({onAdd}){
  let [value, setValue]  = useState("");
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() =>{
          onAdd(value);
          setValue("");
        }}
        >
          Add todo
      </button>  
    </div>
  );
}


export function TodoList({items, onDelete}){
  return (
    <ul>
      {items.map((item) => 
        <TodoItem
          key={item.id}
          value={item}
          onDelete={()=>{
            onDelete(item);
          }}
        />
      )}
    </ul>
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};


export function TodoItem({value, onDelete}){
  return (
    <li>
      <input type="checkbox" checked={value.completed} />
      {value.label}
      <button onClick={() => onDelete()}>X</button>
    </li>
  );
}

function App() {
  const [items, setItems] = useState([
    { id:1 , label: "Items1", completed: true},
    { id:2 , label: "Items2", completed: false}
  ]);

  return (
    <div>
        <TodoInput
          onAdd={(value)=> {
            setItems([
              ...items,
              { id: Math.random(), label:value, completed: false}
            ]);
          }}
        />
        <TodoList 
          items={items}
           onDelete={(item) =>{
              setItems(items.filter((TodoItem) => TodoItem.id != item.id));
            }}
        />
    </div>
  );
}

export default App;


//////////////////////////////////////////////

// import {createElement, useState} from "react";

// export function TodoInput({onAdd}){
//     let value = "";
//     return createElement("div", {}, [
//         createElement("input", {onChange: (e)=>{
//             value = e.target.value;
//         }}),
//         createElement(
//             "button", 
//             {onClick: ()=>{
//                 onAdd(value);
//                 // input.value = "";
//             }},
//             "Add item")
//     ]);
// }

// export function TodoList({items}){
//     return createElement("ul", {},
//         items.map((item)=> 
//             createElement(
//                 TodoItem, 
//                 {value: item, 
//                     onDelete: ()=> {
//                         //
//                     }}
//             )
//         )
//     );

// }

// export function TodoItem({value, onDelete}){
//     return createElement("li", {}, [
//         value,
//         createElement("button", {onClick: onDelete(li)}, "X")
//     ]);
// }

// export function TodoApp(element){
//     const [items, setItems] = useState([])
//     return createElement("div", {}, [
//         createElement(TodoInput, 
//             {onAdd: (item)=>{
//                 setItems(items.concat([{item}]));   
//             }}
//         ),
//         createElement(TodoList, {items})
//     ]);
// }

