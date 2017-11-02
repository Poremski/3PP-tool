var express = require('express')
var router = express.Router()

// ----------------------------------------------------------------------------
//  Methods for /licenses
// ----------------------------------------------------------------------------
router.route('/')


    .get((req, res) => {
        req.db.all("SELECT * FROM licenses", (err, rows) => {
            res.json(rows)
        })
    })

    // A parameter 'get' needs to be provided as to indicate wheter or not a specific set of rows need to be gathered otherwise
    // it is assumed that a row is to be changed
    //-------------------------------------------------------------------------
    // Below are the filters that need to be provided if a specific set of data rows are to be returned:
    // licensName
    // licenseVersion
    // dateCreated
    // lastEdited
    // licensType
    //-------------------------------------------------------------------------
    // TODO - editing a license
    //-------------------------------------------------------------------------
    .post((req, res) => {
        if (req.body.get) {
            var query = "SELECT * FROM licenses WHERE "
            var parameters = []
            
            var licensName = req.body.licensName
            var licenseVersion = req.body.licenseVersion
            var dateCreated = req.body.dateCreated
            var lastEdited = req.body.lastEdited
            var licensType = req.body.licensType

            var first = false
            if (licensName != null) {
                if(!first){
                    first = true
                    query += "licenseName = ? "
                } else{
                    query += "AND licenseName = ?"
                }
                parameters.push(licensName)
            }
            if (licenseVersion != null) {
                if(!first){
                    first = true
                    query += "licenseVersion = ? "
                } else{
                    query += "AND licenseVersion = ? "
                }
                parameters.push(licenseVersion)
            }
            if (dateCreated != null) {
                if(!first){
                    first = true
                    query += "dateCreated = ? "
                } else{
                    query += "AND dateCreated = ? "
                }
                parameters.push(dateCreated)
            }
            if (lastEdited != null) {
                if(!first){
                    first = true
                    query += "lastEdited = ? "
                } else{
                    query += "AND lastEdited = ? "
                }
                parameters.push(lastEdited)
            }
            if (licensType != null) {
                if(!first){
                    first = true
                    query += "licenseType = ? "
                } else{
                    query += "AND licenseType = ? "
                }
                parameters.push(licensType)
            }

            req.db.all(query, parameters, (err, rows) => {
                res.json(rows)
            })
        } else {
            // TODO - implement the functionality for editing a license
        }
    })

    // Add a license.
    // Input parameters must be (order does not matter):
    // licenseName, licenseVersion, dateCreated, lastEdited, URL, comment, licenseType
    .put((req, res) => {

        var licenseName = req.body.licenseName
        var licenseVersion = req.body.licenseVersion
        var dateCreated = req.body.dateCreated
        var lastEdited = req.body.lastEdited
        var URL = req.body.URL
        var comment = req.body.comment
        var licenseType = req.body.licenseType

        var query = "INSERT INTO licenses (licenseName, licenseVersion, dateCreated, lastEdited, URL, comment, licenseType) VALUES" +
            "(?, ?, ?, ?, ?, ?, ?)"
        var parameters = [licenseName, licenseVersion, dateCreated, lastEdited, URL, comment, licenseType]

        req.db.run(query, parameters, (error) => {
            if (error) {
                console.log(error.message)
                res.status(500)
                res.end()
            } else {
                res.status(201)
                res.send("success")
            }
        })
    })

    // TODO - implement
    .delete((req, res) => {
        res.status(501)
        res.send("Method not implemented")
    })

// ----------------------------------------------------------------------------
//  Methods for /licenses/:id
// ----------------------------------------------------------------------------
router.route('/:id')

    .get((req, res) => {
       
    })

    .post((req, res) => {
        res.status(405)
        res.send("Method not allowed")
    })

    .put((req, res) => {

    })

    .delete((req, res) => {
        var query = "DELETE FROM components WHERE id = ?"
        var id = req.params.id

        req.db.get(query, [id], (err, row) => {
            res.status(200)
            res.send("Component deleted")
        })
    })

module.exports = router