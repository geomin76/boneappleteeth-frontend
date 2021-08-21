import { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
// const fetcher = (query: RequestDocument) => request('/api/graphql', query)

export async function getServerSideProps(context: { query: { lat: any; lng: any } }) {
  console.log(context.query) 

  return {
      props: { 
         lat: context.query.lat,
         lng: context.query.lng
      }
  }
}

const Result: NextPage = (props) => {

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (props.lat && props.lng) {
      fetchData();
    }
  }, [])

  useEffect(() => {
    if (data.length > 0 && selected === null) {
      console.log("first and should be only")
      const randomElement = Math.floor(Math.random() * data.length)
      setSelected(randomElement);
    }
  }, [data])

  const fetchData = () => {
    const url = `http://localhost:5000/restaurants?lat=${props.lat}&lng=${props.lng}`
    fetch(url)
    .then(response => response.json())
    .then(incomingData => {
      setData(incomingData.data.search.business);
    })
  }

  const settingData = async (temp: any) => {
    setData(temp);
  }

  const settingSelected = async (val: number) => {
    setSelected(val);
  }

  const randomSelect = async (index: number) => {
    const temp = data;
    temp.splice(index, 1);
    settingData(temp);
    if (data.length === 0) {
      fetchData();
      return;
    }
    const randomElement = Math.floor(Math.random() * data.length)
    settingSelected(randomElement);
  }

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
        <h1>First Post</h1>
        <h2>{selected !== null && data[selected].name}</h2>
        { selected !== null && 
          <Button variant="contained" color="primary" onClick={() => {
            randomSelect(selected);
          }}>
            Another random restaurant
          </Button>
        } 
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