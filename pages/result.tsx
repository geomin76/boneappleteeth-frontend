import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
const fetcher = (query: RequestDocument) => request('/api/graphql', query)

const Result: NextPage = () => {

    const { data, error } = useSWR(
      `{
        Movie(title: "Inception") {
          releaseDate
          actors {
            name
          }
        }
      }`,
      fetcher
    )

    return (
      <>
        <div className={styles.container}>
          <main className={styles.main}>
          <h1>First Post</h1>
          <h2>
            <Link href="/">
              <a>Back to home</a>
            </Link>
            </h2>
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
      </>
    )
  }

export default Result