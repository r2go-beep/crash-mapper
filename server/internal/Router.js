const express = require('express')

function getRouter( repository ) {
    const router = express.Router()

    /**
      * @api {get} api/AllCrashLocations       Get all trips based on a given state
      * @apiName AllCrashLocations
      * @apiParam none                                     
      * @apiSuccess {data}                        relevant info about crashes returned 
    */
    router.get("/AllCrashLocations", async function (req, res, next) {
        console.log("Getting All Crash Locations...")
        try {
            const data = await repository.getAllCrashLocations()
            res.json(data)
        } catch (err) {
            const errMessage = "Error while retrieving crash info: " + req.params.state + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

    /**
      * @api {get} api/CrashInfo/:report_number      Get all info based off of report_number
      * @apiName CrashInfo
      * @apiParam report_number                   report number of the crash 
      * @apiSuccess {data}                        relevant info about crash returned 
    */
    router.get("/CrashInfo/:report_number", async function (req, res, next) {
        console.log("Getting Crash From Report Number...")
        try {
            const report_number = req.params.report_number
            if (report_number) {
                const crash_event_data = await repository.getCrashInfo(report_number)
                const crash_vehicle_driver_data = await repository.getDriverVehicleInCrash(report_number)

                res.json({
                    "crash_event_data": crash_event_data[0],
                    "crash_vehicle_driver_data": crash_vehicle_driver_data
                })
            }
            else {
                res.status(400);
                res.send("Check report_number")
            }
        } catch (err) {
            const errMessage = "Error while retrieving crash info: " + req.params.report_number + err.message
            res.status(404)
            res.send(errMessage)
            next(err);
        }
    })

        /**
      * @api {get} api/CrashStatistics      Get crash statistics
      * @apiName CrashStatistics
      * @apiParam none                   
      * @apiSuccess {data}                        relevant info about crash statistics
    */
        router.get("/CrashStatistics", async function (req, res, next) {
            console.log("Getting Crash Statistics...")
            try {
                const num_crashes = await repository.getNumCrashes()
                const num_vehicles = await repository.getNumVehicles()
                const last_crash_time = await repository.getLastCrashDate()
                const first_crash_time = await repository.getFirstCrashDate()
                const severity_distribution = await repository.getCrashSeverityDistribution()
                const age_distribution = await repository.getAgeDistribution()
                const sex_distribution = await repository.getSexDistribution()
                res.json({
                    "num_crashes": num_crashes,
                    "num_vehicles": num_vehicles, 
                    "last_crash_time": last_crash_time, 
                    "first_crash_time": first_crash_time,
                    "severity_distribution": severity_distribution, 
                    "age_distribution": age_distribution, 
                    "sex_distribution": sex_distribution
                })
            } catch (err) {
                const errMessage = "Error while retrieving crash statistics: " + req.params.report_number + err.message
                res.status(404)
                res.send(errMessage)
                next(err);
            }
        })

    return router;
}

module.exports = { getRouter }