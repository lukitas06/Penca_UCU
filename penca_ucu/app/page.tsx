'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'
import { useEffect,useState } from "react";
import LoginRegisterCard from "./ui/components/LoginRegisterCard";

export default function Home() {
  const [logged, setLogged] = useState("");
  const router = useRouter();

  useEffect(() => {
    let value = localStorage.getItem("logged") || "";
    console.log("logged: ", value);
    setLogged(value);
    if (logged == "") {
      router.push("/pages/login");
    }
    else{
      console.log("");
    }
  }, []);
}
