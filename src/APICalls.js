import axios from 'axios'

const URL = "http://localhost:9000"

export const getAllCrashLocations = () => {
    console.info("Getting all Crash Locations...")
    return axios.get(URL + "/api/AllCrashLocations").then((res)=>{
        return (res.data && Object.keys(res.data)) ? res.data : false; 
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const getCrashInfo = (report_number) => {
    console.info("Getting Crash Info about Report "+ report_number +"...")
    return axios.get(URL + "/api/CrashInfo/"+report_number).then((res)=>{
        return (res.data && Object.keys(res.data)) ? res.data : false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

export const getCrashStatistics = () => {
    console.info("Getting crash statistics ...")
    return axios.get(URL + "/api/CrashStatistics/").then((res)=>{
        return (res.data && Object.keys(res.data)) ? res.data : false;
    }).catch(err => {
        console.log(err);
        return false;
    })
}