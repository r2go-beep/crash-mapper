class Repository {
    constructor(database) {
        this._database = database
    }
 
    async getAllCrashLocations() {
        const sql = 'SELECT report_number, longitude, latitude FROM `CRASH_EVENT`;'
        const params = []
        return(this._database.query(sql, params)
            .then((response) => {
                return response[0]
            })
        )
    }

    async getCrashInfo(report_number) {
        const sql = 'SELECT * FROM `CRASH_EVENT` WHERE report_number=?;'
        const params = [report_number]
        return(this._database.query(sql, params)
            .then((response) => {
                return response[0]
            })
        )
    }

    async getVehiclesInCrash(report_number) {
        const sql = 'SELECT * FROM `VEHICLE` WHERE report_number=?;'
        const params = [report_number]
        return(this._database.query(sql, params)
            .then((response) => {
                return response[0]
            })
        )
    }

    async getDriverInCrash(report_number, vehicleNum) {
        const sql = 'SELECT * FROM `DRIVER` WHERE report_number=? AND vehicle_number=?;'
        const params = [report_number, vehicleNum]
        return(this._database.query(sql, params)
            .then((response) => {
                return response[0]
            })
        )
    }

    async getDriverVehicleInCrash(report_number) {
        const sql = `
        SELECT * 
        FROM VEHICLE, DRIVER 
        WHERE VEHICLE.vehicle_number = DRIVER.vehicle_number
        AND VEHICLE.report_number = DRIVER.report_number
        AND VEHICLE.report_number = ?;
        `
        const params = [report_number]
        return(this._database.query(sql, params)
            .then((response) => {
                return response[0]
            })
        )
    }

    async getNumCrashes() {
        const sql = 'SELECT COUNT(*) as "count" FROM `CRASH_EVENT`;'
        const params = []
        return(this._database.query(sql, params)
            .then((response) => {
                return response[0][0]
            })
        )
    }

    async getNumVehicles() {
        const sql = 'SELECT COUNT(*) as "count" FROM `VEHICLE`;'
        const params = []
        return(this._database.query(sql, params)
            .then((response) => {
                return response[0][0]
            })
        )
    }

    async getLastCrashDate() {
        const sql = `
        SELECT crash_date, MAX(crash_time) as 'time' FROM crash_event
        WHERE crash_date = (SELECT MAX(crash_date) FROM crash_event)
        GROUP BY crash_date;
        `
        const params = []
        return(this._database.query(sql, params)
            .then((response) => {
                const data = response[0][0]
                return data
            })
        )
    }

    async getFirstCrashDate() {
        const sql = `
        SELECT crash_date, MIN(crash_time) as 'time' FROM crash_event
        WHERE crash_date = (SELECT MIN(crash_date) FROM crash_event)
        GROUP BY crash_date;
        `
        const params = []
        return(this._database.query(sql, params)
            .then((response) => {
                const data = response[0][0]
                return data
            })
        )
    }

    async getCrashSeverityDistribution() {
        const sql = `
        SELECT crash_severity, count(crash_severity) as 'count' FROM crash_event
        GROUP BY crash_severity;
        `
        const params = []
        return(this._database.query(sql, params)
            .then((response) => {
                return response[0]
            })
        )
    }

    async getAgeDistribution() {
        const sql = `
        SELECT age, count(age) as 'count' FROM Driver
        GROUP BY age
        ORDER BY age ASC;
        `
        const params = []
        return(this._database.query(sql, params)
            .then((response) => {
                return response[0]
            })
        )
    }

    async getSexDistribution() {
        const sql = `
        SELECT sex, count(sex) as 'count' FROM Driver
        GROUP BY sex;
        `
        const params = []
        return(this._database.query(sql, params)
            .then((response) => {
                return response[0]
            })
        )
    }

}

module.exports = {
    Repository
}