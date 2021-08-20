import type { NextPage } from 'next'
import Query from './query'
import Script from 'next/script'
import { useJsApiLoader } from '@react-google-maps/api'
import { useEffect } from 'react'
import Head from 'next/head'

const Home: NextPage = () => {
  var url = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}&libraries=places`

  return (
    <>
      <Script src={url} strategy="beforeInteractive"/>
      <Query/>
    </>
  )
}

export default Home
