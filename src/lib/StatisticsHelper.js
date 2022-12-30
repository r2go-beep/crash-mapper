export class StatisticsHelper {
    constructor( crashStatistics ) {
        this.crashStatistics = crashStatistics
    }

    /**
     * toShortDate used to shorten the date of a string to a day
     * @param {string} input_string 
     * @returns date object of the day in "mm/dd/yyyy"
     */
    toShortDate(input_string) {
        return(
            new Date(input_string).toLocaleString().split(',')[0]
        )
    }

    /**
     * columnChartScrub used to get the data ready to be used by the column chart
     * @param {array} dataArr   an array of objects with attributes label and count
     * @param {string} label    the string used to delimit what attribute in the dataArr
     * @param {string} count    the string used to delimit the count
     * @returns array of points
     */
    columnChartScrub(dataArr, label, count){
        return(
            dataArr.map(function(obj) {
                return{
                "label": obj[label],
                "y": obj[count]
                }
            })
        )
    }

    /**
     * histogramChartScrub used to get the data ready to be used by the column chart
     * @param {array} dataArr   an array of objects with attributes label and count
     * @param {string} label    the string used to delimit what attribute in the dataArr
     * @param {string} count    the string used to delimit the count
     * @param {int} min    the minimum value of the histogram
     * @param {int} max    the maximum value of the histogram
     * @param {int} inc    the increments amount
     * @returns array of points
     */
    histogramChartScrub(dataArr, label, count, min, max, inc){
        let age_distribution = []
        for (let i = min; i <= max; i += inc){
            age_distribution.push({
                "label": ""+i+"-"+(i+inc-1),
                "y": 0
            })
        }
        dataArr.forEach(element => {
            age_distribution[Math.floor(element[label]/5)]["y"] += element[count]
        })
        return(age_distribution)
    }


    /**
     * columnChartScrub used to get the data ready to be used by the pie chart
     * @param {array} dataArr   an array of objects with attributes label and count
     * @param {string} label    the string used to delimit what attribute in the dataArr
     * @param {string} count    the string used to delimit the count
     * @returns array of points
     */
    pieChartScrub(dataArr, label, count){
        return(
            dataArr.map(function(obj) {
                return{
                "label": obj[label],
                "y": obj[count]
                }
            })
        )   
    }

    /**
     * scrub   used to condition the data before being displayed
     * @returns object 
     */
    scrub() {
        return ({
            "num_crashes" : this.crashStatistics["num_crashes"]["count"],
            "num_vehicles" : this.crashStatistics["num_vehicles"]["count"],
            "first_crash_date" : this.toShortDate(this.crashStatistics["first_crash_time"]["crash_date"]),
            "last_crash_date" : this.toShortDate(this.crashStatistics["last_crash_time"]["crash_date"]),
            "crash_severity_data" : this.columnChartScrub(this.crashStatistics["severity_distribution"], "crash_severity", "count"),
            "age_data" : this.histogramChartScrub(this.crashStatistics["age_distribution"], "age", "count", 0, 80, 5),
            "sex_data" : this.pieChartScrub(this.crashStatistics["sex_distribution"].map(
                (gen) => {
                    return(gen["sex"]==="M" ? {"sex":"Male", "count":gen["count"]} : {"sex":"Female", "count":gen["count"]})
                }), "sex", "count")
        })
        
    }

}
