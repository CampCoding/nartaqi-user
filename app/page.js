import Image from "next/image";
import styles from "./page.module.css";
import { TopServices } from "../components/Home/TopServices";
import { HeaderHero } from "../components/Home/Hero";

export default function Home() {
  return (
<>
    <TopServices />
    <HeaderHero />
</>
   
  );
}
