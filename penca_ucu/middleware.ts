import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from './app/services/tokenService'


export async function middleware(request: NextRequest) {

    const token = cookies().get('token')
    const url = request.nextUrl.pathname;

    if (token === undefined && url !== '/pages/login') {
        return NextResponse.redirect(new URL('/pages/login', request.url))
    }
    else if (token !== undefined) {

        const tokenItself = token.value
        const payload = await verifyToken(tokenItself)

        if (payload !== false) {

            const rol = payload.rol
            const username = payload.username

            if (request.nextUrl.pathname === '/pages/login') {
                return NextResponse.redirect(new URL('/pages/home', request.url))
            }
            if (request.nextUrl.pathname === '/pages/home') {
                return NextResponse.redirect(new URL(`/pages/home/${rol}`, request.url))
            }
            if (request.nextUrl.pathname === '/pages/home/alumn') {
                if (rol === 'alumno') {
                    return NextResponse.next()
                } else {
                    return NextResponse.redirect(new URL(`/pages/home/${rol}`, request.url))
                }
            }
            if (request.nextUrl.pathname === '/pages/home/admin') {
                if (rol === 'admin') {
                    return NextResponse.next()
                } else {
                    return NextResponse.redirect(new URL(`/pages/home/${rol}`, request.url))
                }
            }

        }

        // if(request.nextUrl.pathname.startsWith( '/pages/home')) {

        //     return NextResponse.redirect(new URL('pages/home/alumno', request.url))
        // }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
    //matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}