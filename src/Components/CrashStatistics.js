import { useState, useEffect } from 'react';
import { getCrashStatistics } from '../APICalls';
import { BarGraph } from './BarGraph';
import { PieChart } from './PieChart';
import { StatisticsHelper } from '../lib/StatisticsHelper';

export function CrashStatistics() {
    const [data, setData] = useState("")

    useEffect(() => { // make api call once when mounted
        let mounted = true;
        getCrashStatistics().then(resp => {
            if(mounted) {
                const statsHelper = new StatisticsHelper(resp)
                setData(statsHelper.scrub()) // Scrub data to ensure its readable
            }
        })
        return () => mounted = false;
    }, [])

    return(
        <>
            <div className="Section-header">
                <header>Crash Statistics</header>
                <div className="Grid-container">
                    <div className='Grid-item-topleft'>
                        Number of Vehicles Involved: {data.num_vehicles}
                    </div>
                    <div className='Grid-item-bottomright'>
                        
                    </div>
                    <div className='Grid-item-bottomleft'>
                        Number of Reports: {data.num_crashes} <br/>
                    </div>
                    <div className='Grid-item-topright'>
                        Crash Dates: {data.first_crash_date} - {data.last_crash_date}<br/>
                    </div>
                </div>
            </div>
            <div className="Diagrams">
                <div className='Diagrams-container'>
                    <BarGraph title={"Crash Severity"} 
                    data={data.crash_severity_data} 
                    xAxisTitle={"Severity"}
                    yAxisTitle={"Count"}
                    interval={1}/>
                    
                    <BarGraph title={"Age Distribution"} 
                    data={data.age_data} xAxisTitle={"Age"}
                    yAxisTitle={"Count"}
                    interval={2}/>

                    <PieChart title={"Gender Distribution"}
                    data={data.sex_data} />
                </div>
            </div>
        </>
    )
}