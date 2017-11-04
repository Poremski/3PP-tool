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

    .post((req, res) => {
        res.status(405)
        res.send("Method not allowed")
    })

    // Add a license.
    // Input parameters must be (order does not matter):
    // licenseName, licenseVersion, dateCreated, lastEdited, URL, comment, licenseType
    .put((req, res) => {
        var licenseName = req.body.licenseName
        var licenseVersion = req.body.licenseVersion
        if (licenseName != null && licenseVersion != null) {
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
                    res.send(error.message)
                } else {
                    res.status(201)
                    res.send("success")
                }
            })
        } else {
            res.status(500)
            res.send("ERROR: licenseName or licenseVersion wasn't provided.")
        }
    })


    .delete((req, res) => {
        res.status(405)
        res.send("Method not allowed")
    })

// ----------------------------------------------------------------------------
//  Methods for /licenses/:id
// ----------------------------------------------------------------------------
router.route('/:id')

    //In order to get a specific license or a specific group of licenses based on search parameters then
    //this method must be called with an identifier constructed as following:
    //Example search identifier: "licenseName=Test License1&licenseType=License type1"
    //Between each parameter proveded there must be a '&' other than that, the order of provided
    //parameters makes no difference. 
    //-------------------------------
    //To enable partial word searches simply provide another parameter called 'smartSearch'
    // Example: 'smartSearch&licenseName=Test&licenseType=type'
    //-------------------------------
    .get((req, res) => {

        var query = "SELECT * FROM licenses WHERE "
        var parameters = []
        var values = []
        var valuesText = []

        var inputString = req.params.id.split("&")

        //Check if smartSearch
        var smartSearch = false
        for(var i = 0; i < inputString.length; i++){
            if(inputString[i] == 'smartSearch') smartSearch = true
        }

        //Get search parameters from input 
        for (var i = 0; i < inputString.length; i++) {
            if(inputString[i] != 'smartSearch'){
                var tempHolder = inputString[i].split("=")
                valuesText.push(tempHolder[0])
                if(smartSearch) values.push('%' + tempHolder[1] + '%')
                else values.push(tempHolder[1])
            }
        }

        //Construct remaining SQL query based on search parameters
        var first = false
        for (var i = 0; i < valuesText.length; i++) {
            if (values[i] != null) {
                if (!first) {
                    first = true
                    if(smartSearch) query += "" + valuesText[i] + " LIKE ? "
                    else query += "" + valuesText[i] + " = ? "
                } else {
                    if(smartSearch) query += "AND " + valuesText[i] + " LIKE ? "
                    else query += "AND " + valuesText[i] + " = ? "
                }
                parameters.push(values[i])
            }
        }

        req.db.all(query, parameters, (err, rows) => {
            if (err) {
                //If there's an error then provide the error message and the different attributes that could have caused it. 
                res.send("ERROR! error message:" + err.message + " Input: " + inputString + ", query: " + query + ", values: " + values + ", valuesText: " + valuesText)
            } else
                res.json(rows)
        })
    })

    .post((req, res) => {
        res.status(405)
        res.send("Method not allowed")
    })

    //In order to add a new license then
    //this method must be called with an identifier constructed as following:
    //(licenseName and licensVersion must be provided, everything else is optional)
    //Example license identifier: "licenseName=license&licenseVersion=1.0
    //Between each parameter proveded there must be a '&' but, other than that, the order of provided
    //parameters makes no difference. 
    .put((req, res) => {
        var query = "INSERT INTO licenses ( "
        var parameters = []
        var values = []
        var valuesText = []

        var inputString = req.params.id.split("&")
        //Get input parameters from the input 
        for (var i = 0; i < inputString.length; i++) {
            var tempHolder = inputString[i].split("=")
            valuesText.push(tempHolder[0])
            values.push(tempHolder[1])
        }

        var correctInputName = false
        var correctInputVersion = false
        //Make sure that there is licenseName and licenseVersion provided
        for (var i = 0; i < valuesText.length; i++) {
            if (valuesText[i] == 'licenseName') {
                correctInputName = true
            } else if (valuesText[i] == 'licenseVersion') {
                correctInputVersion = true
            }
        }

        if (correctInputName && correctInputVersion) {
            //Construct remaining SQL query based on input parameters
            for (var j = 0; j < 2; j++) {
                for (var i = 0; i < valuesText.length; i++) {
                    if (values[i] != null) {
                        if (i == (valuesText.length - 1)) {
                            if (j == 0) {
                                query += "" + valuesText[i] + " "
                                parameters.push(values[i])
                            } else query += "? "
                        } else {
                            if (j == 0) {
                                query += "" + valuesText[i] + ", "
                                parameters.push(values[i])
                            } else query += "?, "
                        }
                    }
                }
                if (j == 0) {
                    query += ") VALUES ("
                } else query += ")"
            }

            req.db.run(query, parameters, (error) => {
                if (error) {
                    console.log(error.message)
                    res.status(500)
                    res.send(error.message)
                }
            })


            var licenseID
            //Get the id of the newly created license
            query = "SELECT id FROM licenses WHERE licenseName = ? AND licenseVersion = ? "
            parameters = [null, null]
            for( var i = 0; i < valuesText.length; i++){
                if(valuesText[i] == 'licenseName') parameters[0] = values[i]
                else if(valuesText[i] == 'licenseVersion') parameters[1] = values[i]
            }
            req.db.get(query, parameters, (err, row) => {
                if (err) {
                    //If there's an error then provide the error message and the different attributes that could have caused it. 
                    res.send("ERROR! error message:" + err.message + " Input: " + inputString + ", query: " + query + ", values: " + values + ", valuesText: " + valuesText)
                } else
                    licenseID = row
            })

            //Log the creation of the license
            parameters = [licenseID, new Date().toDateString(), "License created."]
            query = "INSERT INTO licenseLog (licenseID, dateLogged, note) VALUES (?, ?, ?)"

            req.db.run(query, parameters, (error) => {
                if (error) {
                    console.log(error.message)
                    res.status(500)
                    res.send(error.message)
                } else {
                    res.status(201)
                    res.send("success")
                }
            })
        } else {
            res.status(500)
            res.send("ERROR: licenseName or licenseVersion wasn't provided.")
        }
    })

    .delete((req, res) => {
        res.status(405)
        res.send("Method not allowed")
    })

module.exports = router
