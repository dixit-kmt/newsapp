import Head from "next/head";
import styles from "../styles/Loading.module.css";

export function Loading(){
  return (
    <>
    <Head>
      <title>NewsApp | Loading...</title>
    </Head>
      <div className={styles.main}>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
        <div className={styles.ball}></div>
      </div>
    </>
  );
};
