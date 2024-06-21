'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { useState } from 'react';

export default function Header() {

    // window.onscroll = function () { scrollFunction() };
    const route = usePathname();

    const [classname, setClassname] = useState('col col-12');

    // if (route !== '/pages/home/student') {
    return (
        <div className={classname} id='header-container'>
            <button className='btn btn-primary' onClick={goBack}>Go back</button>
        </div>
    );
    // }
}

const goBack = () => {
    window.history.back();
};
