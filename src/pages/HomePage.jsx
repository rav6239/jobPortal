import React from 'react'
import Hero from '../components/Hero'
import JobListings from '../components/JobListings'
import HomeCard from '../components/HomeCard'
import ViewAll from '../components/ViewAll'

const HomePage = () => {
  return (
    <>
    <Hero/>
    <HomeCard/>
    <JobListings isHome= {false}/>
    <ViewAll/>
    </>
  )
}

export default HomePage