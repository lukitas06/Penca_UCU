'use client';

import { useRouter } from 'next/navigation';

export default function logoutButton() {

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/pages/login');
    };

    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
}