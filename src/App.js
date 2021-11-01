import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as styles from "./App.module.scss";
import Card from './components/Card';
import Dialog from './components/Dialog';
import Table from './components/Table';
import LoadingSpinner from './components/LoadingSpinner';
import { LEASE_TABLE_HEADERS } from './constants/tableConstants'

const App = () => {
  const [propertiesOverview, setPropertiesOverview] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)

  useEffect(() => {
    try {
      const fetchData = async () => {
        const requestConfig = { token: process.env.REACT_APP_API_TOKEN }
        const propertiesOverviewResponse = await axios.post('https://talent.ender.com/fe-challenge/properties', requestConfig)
        if (propertiesOverviewResponse.status === 200) {
          setPropertiesOverview(propertiesOverviewResponse.data)
        } else {
          console.error(`Error response from server: ${propertiesOverviewResponse.status}`)
        }
      }
      fetchData()
    } catch (error) {
      console.error(`Error sending request to server ${error}`)
    }
  }, [])

  const handlePropertyClick = async (propertyId, idx) => {
    setIsDialogOpen(true)

    try {
      const requestConfig = { token: process.env.REACT_APP_API_TOKEN }
      const leasesResponse = await axios.post(`https://talent.ender.com/fe-challenge/properties/${propertyId}/leases`, requestConfig)      
      if (leasesResponse.status === 200) {
            const propertyLeases = leasesResponse.data.map(lease => {
            const { companyName, startDate, inclusiveEndDate, status, contacts } = lease
            let primaryContact = Object.keys(contacts).find(contact => contacts[contact].tags.includes('PRIMARY'))
            if (!primaryContact) primaryContact = Object.keys(contacts).find(contact => contacts[contact].tags.includes('EMERGENCY'))
            if (!primaryContact) primaryContact = Object.keys(contacts)[0]
            return [
              companyName,
              startDate,
              inclusiveEndDate,
              status,
              primaryContact
            ]
          })
          setSelectedProperty(propertyLeases)
      } else {
        console.error(`Error response from server: ${leasesResponse.status}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedProperty(null)
  }

  return <div className={styles.app}>
    <h1>Ender Front End Challenge</h1>
    <div className={styles.contentContainer}>
      {propertiesOverview.length 
        ? propertiesOverview.map((property, idx) => (
          <Card {...property} key={property.id} onClick={() => handlePropertyClick(property.id, idx)} />
        ))
        : <LoadingSpinner />
      }
    </div>
    <Dialog onClose={() => handleDialogClose()} open={isDialogOpen}>
      <Table
        headers={LEASE_TABLE_HEADERS}
        data={selectedProperty}
        noDataMessage='There is no lease history on this property'
      />
    </Dialog>
  </div>;
}

export default App;
