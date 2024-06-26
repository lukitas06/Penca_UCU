'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';


export default function Header({ rol }: { rol: string }) {

    const router = useRouter();

    const [classname, setClassname] = useState('col col-12');

    const goBack = (rol: string) => {
        router.push(`/pages/home/${rol}`);
    };
    switch (rol) {
        case 'admin':
            return (
                <div className={classname} id='header-container'>

                    <button className='btn btn-primary' onClick={() => goBack('admin')}><i className="bi bi-arrow-left"></i></button>
                    <Link href="?modal=true">
                        <button type="button" className="bg-blue-500 text-white p-2">Crear Encuentro</button>
                    </Link>
                </div>
            );
        case 'student':
            return (
                <div className={classname} id='header-container'>
                    <button className='btn btn-primary' onClick={() => goBack('student')}><i className="bi bi-arrow-left"></i></button>
                </div>
            );
    }

    // }
}



const makeMatch = () => {

}
