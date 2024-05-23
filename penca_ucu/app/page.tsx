'use client';
import { useRouter } from 'next/navigation'
import { useEffect,useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userStorage =  localStorage.getItem('user');
    setUser(userStorage);
  }, [])

  //Dirigir al login si no esta logueado.
  useEffect(() => {
    if (user == null) {
      router.push("/pages/login");
    }
    //Dirigir a la landing page si esta logueado.
    else{
      router.push("/pages/home");
    }
  })
}

