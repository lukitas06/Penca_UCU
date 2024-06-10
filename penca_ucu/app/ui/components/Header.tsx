'use client'

import React from 'react'

export default function Header() {
    return (
        <div id='header-container'>
            <button className='btn btn-primary' onClick={goBack}>Go back</button>
        </div>
    )
}

const goBack = () => {
    window.history.back()
}