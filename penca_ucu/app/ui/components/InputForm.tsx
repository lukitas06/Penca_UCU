'use client'
import { useState } from "react";

export default function InputForm({classname,id,type,name,label}: {classname: string, id: string, type: string, name: string, label: string}) {

    const [value, setValue] = useState('');

    const modifiedClassname = `${classname} ${`input-wrapper ${ value ? 'focused' : ''}`}`;
    
    const handleChange = (event:any) => {
        setValue(event.target.value);
      };

    return (
        <div className={classname}>
            <input className={`input-wrapper ${value ? 'focused' : ''}`} type={type} name={name} id={id} onChange={handleChange}/>
            <label htmlFor={id}>{label}</label>
        </div>
    )
}