import {createElement, useState} from "react";

export function TodoInput({onAdd}){
    let value = "";
    return createElement("div", {}, [
        createElement("input", {onChange: (e)=>{
            value = e.target.value;
        }}),
        createElement(
            "button", 
            {onClick: ()=>{
                onAdd(value);
                // input.value = "";
            }},
            "Add item")
    ]);
}

export function TodoList({items}){
    return createElement("ul", {},
        items.map((item)=> 
            createElement(
                TodoItem, 
                {value: item, 
                    onDelete: (li)=> {
                        //
                    }}
            )
        )
    );

}

export function TodoItem({value, onDelete}){
    return createElement("li", {}, [
        value,
        createElement("button", {onClick: ()=> onDelete()}, "X")
    ]);
}

export function TodoApp(){
    const [items, setItems] = useState([])
    return createElement("div", {}, [
        createElement(TodoInput, 
            {onAdd: (item)=>{
                setItems(items.concat([item]));   
            }}
        ),
        createElement(TodoList, {items})
    ]);
}

