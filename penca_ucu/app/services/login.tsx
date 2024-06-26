'use server';

export default function loginService() {
    return {
        async GET() {
            return { message: 'GET /login' };
        },
        async POST() {
            return { message: 'POST /login' };
        }
    };
}