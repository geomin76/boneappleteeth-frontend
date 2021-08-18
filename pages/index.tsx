import type { NextPage } from 'next'
import Query from './query'
import Script from 'next/script'

const Home: NextPage = () => {

  var url = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}&libraries=&v=weekly`

  return (
    <>
      <Script src={url}/>
      <Query />
    </>
  )
}

export default Home
