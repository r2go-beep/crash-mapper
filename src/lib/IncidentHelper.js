export class IncidentHelper {
    /*
     * toDateTime used to display date and time
     * @param {string} input_string 
     * @returns date object of the day in "mm/dd/yyyy @hh:mm:ss"
     */
    toDateTime(input_string, time) {
        return(
            new Date(input_string).toLocaleString().split(',')[0]+" @"+time
        )
    }

    /**
     * scrub   used to display a placeholder info
     * @returns object placeholder to be used in display
     */
    empty(){
        return ({
            "report_number" : "",
            "county" : "",
            "date" : "",
            "inveAge" : "",
            "severity" : "",
            "location" : "",
            "vehicles" : []
        })

    }

    /**
     * scrub   used to condition the data before being displayed
     * @returns object scrubbed to be used in display
     */
    scrub(incidentData) {
        return ({
            "report_number" : incidentData["crash_event_data"]["report_number"],
            "county" : incidentData["crash_event_data"]["county"],
            "date" : this.toDateTime(incidentData["crash_event_data"]["crash_date"], incidentData["crash_event_data"]["crash_time"]),
            "inveAge" : incidentData["crash_event_data"]["investigating_agency"],
            "severity" : incidentData["crash_event_data"]["crash_severity"],
            "location" : incidentData["crash_event_data"]["on_street"],
            "vehicles" : incidentData["crash_vehicle_driver_data"].map(
                (veh_data) => ({
                    "v_num" : veh_data["vehicle_number"],
                    "v_col" : veh_data["color"],
                    "v_age" : veh_data["year_int"],
                    "v_make" : veh_data["make"],
                    "v_model" : veh_data["model"],
                    "sex" : veh_data["sex"],
                    "age" : veh_data["age"],
                    "maneuver" : veh_data["maneuver"],
                    "restraint" : veh_data["restraint_systems"]
                })
            )
        })
        
    }

}
