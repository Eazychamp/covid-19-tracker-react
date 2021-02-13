import React, { Fragment } from 'react'

const CovidTable = props => {
    
    const { covidData = [], onHovered=null, onHoveredOut=null } = props

    return (
        <Fragment>
            <table width="100%" className='covid_table'>
                <tr>
                    <td>STATE/UT</td>
                    <td>CONFIRMED</td>
                    <td>ACTIVE</td>
                    <td>RECOVERED</td>
                    <td>DECEASED</td>
                </tr>
                
                    { covidData && covidData.statewise && covidData.statewise.slice(1).map((res, key) =>{
                        return(
                            <tr className='covid_table_row' key={key}
                            onMouseEnter={() => onHovered(res)}
                            onMouseLeave={onHoveredOut}

                            >
                                <td width='30%' >{res.state}</td>
                                <td>{res.confirmed}</td>
                                <td>{res.active}</td>
                                <td>{res.recovered}</td>
                                <td>{res.deaths}</td>
                            </tr>
                        )
                    }) }
                
            </table>
        </Fragment>
    )
}

export default CovidTable