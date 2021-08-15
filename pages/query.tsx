import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Button } from '@material-ui/core';

const Query: NextPage = () => {

  /**
   * location (ask for current, or address, town) // other fields are disabled until this field
   * after location, yelp categories appear, select as many (or optional)
   * price option field
   * 
   * Then go to next page with fields, query and pick data. 
   * User can select another restaurant by random button
   */

   return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                Let&apos;s get you a <a>place to eat</a>
                </h1>
                <div className={styles.queryButton}>
                <Link href="/result" passHref>
                    <Button variant="contained" color="primary">
                    Let&apos;s begin
                    </Button>
                </Link>
                </div>

        {/* 
                <div className={styles.grid}>

                </div> */}
            </main>

            <footer className={styles.footer}>
                <a
                href="https://github.com/geomin76/boneappleteeth"
                target="_blank"
                rel="noopener noreferrer"
                >
                <span className={styles.logo}>
                    <Image src="/github.svg" alt="Github Logo" width={40} height={40} />
                </span>
                </a>
            </footer>
        </div>
    )
  }

export default Query