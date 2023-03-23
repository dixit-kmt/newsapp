
import styles from '../styles/Home.module.css';
import React, { useState } from "react";
import { Searchbar } from '../components/searchbar';
import Head from 'next/head';

export default function Home() {
  const [name, setName] = useState("");

  const handleCall = (childData) => {
    setName(childData);
  };
  return (
    <>
    <Head>
      <title>NewsApp | Home</title>
    </Head>
      <div className="page-container">
        <div className={styles.main}>
          <h1>Find Relevant Articles and Stories Quickly and Easily.</h1>
          <Searchbar parentCall={handleCall} />
        </div>
      </div>
    </>
  );
}
