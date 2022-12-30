class DBHelper {
    constructor(mysql, config) {
        this.config = config
        this.mysql = mysql
        this.connection = null
    }

    /** createConnection used to create a connection to the MySQL database
     * 
     * @returns a connection to the MySql database
     */
    async createConnection() {
        return  await this.mysql.createConnection({
            host: this.config["host"], 
            user: this.config["user"], 
            password: this.config["password"], 
            database: this.config["database"]
        })
    }

    /** query used to query the database. Opens and closes the connection each query
     * 
     * @param {*} sql the sql query you would like to preform 
     * @param {*} params the parameters you would like to be replaced in the sql query
     * @returns the result from the sql databse
     */
    async query(sql, params) {
        const connection = await this.createConnection()
        return (connection.execute(sql, params).then(resp => {
            connection.end()
            return resp
        }))
    }

}

module.exports = {
    DBHelper
}