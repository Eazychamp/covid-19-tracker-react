import React, { Fragment, useEffect, useState } from 'react'
import CovidChart from './CovidChart'
import CovidMap from './CovidMap'
import CovidTable from './CovidTable'
import axios from 'axios'
import {BASE_URL} from '../constants/ApiConstants'
import './tracker.css'



const CovidTracker = props => {
    const [covidData, setCovidData] = useState([])
    const [ hovered, setHovered ] = useState({})
    const [ total, setTotal ] = useState({})
    const finalData = covidData && covidData.statewise && covidData.statewise.slice(1).map(res =>({ ...res, id: res.statecode, state: res.state, value: res.active, confirmed: res.confirmed, deaths: res.deaths }))


    useEffect(() => {
        getCovidData()
    }, []);

    const getCovidData = () => {
        axios.get(BASE_URL)
            .then(response => {
                setCovidData(response.data)
                setTotal(response.data.statewise[0])
            }
                
                )
            .catch(error => console.log(console.error))
    }

    const [tooltipContent, setTooltipContent] = useState('');
    const onHovered = (data) => {
        
        let finalData = covidData && covidData.statewise && covidData.statewise.filter(res => covidData.statecode === data.id)
        setHovered(data.type ? finalData : data)
        return () => {
                  setTooltipContent(`${data.properties.name}`);
                };
    }
    const onHoveredOut = () => {
        setHovered({...total})
    }


    return (
        <div className='main_conatainer'>
            <div className='contianer_left'>
                <h3>INDIA COVID-19 Tracker</h3>
                <p>Let's all play to make our Earth Covid-19 free soon, Stay Safe and do TheLocate.</p>
                <div className='container_chart'>
                    <CovidChart 
                        covidData={covidData}
                        hoveredData={hovered}
                    />
                </div>
                <div className='container_table'>
                    <CovidTable 
                        covidData={covidData}
                        onHovered={onHovered}
                        onHoveredOut={onHoveredOut}
                    />
                </div>
            </div>
            
            <div className='contianer_right'>
            <h3>INDIA MAP</h3>
                <p>HOVER OVER A STATE FOR MORE DETAILS</p>
                <div className='container_map'>
                    <div className='covid_numbers'>
                        <div className='number_box confirmed'>
                            <span>CONFIRMED</span>
                            <span>{hovered.confirmed}</span>
                        </div>
                        <div className='number_box active'>
                            <span>ACTIVE</span>
                            <span>{hovered.active}</span>
                        </div>
                        <div className='number_box recovered'>
                            <span>RECOVERED</span>
                            <span>{hovered.recovered}</span>
                        </div>
                        <div className='number_box deaths'>
                            <span>DECEASED</span>
                            <span>{hovered.deaths}</span>
                        </div>
                    </div>
                    <CovidMap 
                        covidData={ covidData && covidData.statewise && covidData.statewise.length > 0 ?  covidData : []}
                        finalData={finalData}
                        onHovered={onHovered}
                        onHoveredOut={onHoveredOut}
                        tooltipContent={tooltipContent}
                    />
                    
                </div>
            </div>
        </div>
    )
}

export default CovidTracker