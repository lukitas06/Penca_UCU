'use client'

import React from 'react'
import { useState } from 'react'
import { set } from 'zod';

export default function Header() {

    // window.onscroll = function () { scrollFunction() };

    const [classname, setClassname] = useState('col col-12')

    const scrollFunction = () => {

        setClassname('col col-12 sticky')
    }

    return (
        <div className={classname} id='header-container'>
            <button className='btn btn-primary' onClick={goBack}>Go back</button>
        </div>
    )
}

const goBack = () => {
    window.history.back()
}

