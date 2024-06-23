'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';


export default function Header({ rol }: { rol: string }) {

    // window.onscroll = function () { scrollFunction() };
    const route = usePathname();

    const [classname, setClassname] = useState('col col-12');

    // if (route !== '/pages/home/student') {
    switch (rol) {
        case 'admin':
            return (
                <div className={classname} id='header-container'>

                    <button className='btn btn-primary' onClick={goBack}><i className="bi bi-arrow-left"></i></button>
                    <Link href="?modal=true">
                        <button type="button" className="bg-blue-500 text-white p-2">Crear Encuentro</button>
                    </Link>
                </div>
            );
        case 'student':
            return (
                <div className={classname} id='header-container'>
                    <button className='btn btn-primary' onClick={goBack}><i className="bi bi-arrow-left"></i></button>
                </div>
            );
    }

    // }
}

const goBack = () => {
    window.history.back();
};

const makeMatch = () => {

}
