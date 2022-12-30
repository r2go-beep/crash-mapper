import { useEffect, useMemo, useState } from "react"
import { GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"
import { getAllCrashLocations, getCrashInfo } from "../APICalls";
import { IncidentHelper } from "../lib/IncidentHelper";

export function MapComponent() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY 
    });

    if(!isLoaded) return <div>Loading...</div>
    return (
        <Map/>
    )
}

function Map() {
    const incident = new IncidentHelper();
    const [incidentData, setIncidentData] = useState(incident.empty())
    const [isActive, setIsActive] = useState(false)

    const center = useMemo(() => ({lat:28.25, lng: -84}), []); // centered around florida
    const [crashLocations, setCrashLocations] = useState([])

    useEffect(() => { // make api call once when mounted
        let mounted = true;
        getAllCrashLocations().then(resp => {
            if(mounted) {
                setCrashLocations(resp)
            }
        })
        return () => mounted = false;
    }, [])

    function setCrashInfo(report_number) { // set components and data
        getCrashInfo(report_number).then(resp => {
            setIncidentData(incident.scrub(resp))
        })
        setIsActive(true)
    }

    function removeCrashInfo() { // remove components and data
        setIsActive(false)
        setIncidentData(incident.empty())
    }

    function vehicleData(data){
        return(
            <p key={data.v_num}>
                <b>Vehicle #{data.v_num}:</b> {data.v_col} {data.v_age} {data.v_make} {data.v_model}<br />
                <b>Driver:</b> {data.sex} - {data.age}<br />
                <b>Maneuver:</b> {data.maneuver}<br />
                <b>Restraint System:</b> {data.restraint}
            </p>
        )
    }

    return (
        <>
            <GoogleMap 
                zoom={7} 
                center={center}
                mapContainerClassName="map-container"
                onClick={() => removeCrashInfo()}
                options={{streetViewControl: false, fullscreenControl: false,}}
            >
                {crashLocations.map(
                    (crashInst) => (
                    <MarkerF 
                        key={crashInst["report_number"]}
                        position={{lat:Number(crashInst["latitude"]), lng: Number(crashInst["longitude"])}} 
                        onClick={() => (setCrashInfo(crashInst["report_number"]))}
                    />)
                )}
            </GoogleMap>
            {isActive && <div className="crash-info-container">
                <p>
                    <b>Report Number:</b> {incidentData.report_number}<br />
                    <b>Date:</b> {incidentData.date}<br />
                    <b>County:</b> {incidentData.county}<br />
                    <b>Investigating Agency:</b> {incidentData.inveAge}<br />
                    <b>Severity:</b> {incidentData.severity}<br />
                    <b>Location:</b> {incidentData.location}<br />
                </p>
                {incidentData.vehicles.map(data => vehicleData(data))}
            </div>}
        </>

    )
}