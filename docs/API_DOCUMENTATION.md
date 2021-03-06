---
Title: API documentation
Version: 1.0.0
---
# API documentation

## Table of Contents

### Licenses

- [Get all licenses](#getAllLicenses)

- [Search for a license](#searchForALicense)

- [Get a license from its ID](#getLicenseById)

- [Add a new license](#addLicense)

- [Change the comment of a license](#changeLicenseComment)

- [Change the URL of a license](#changeLicenseURL)

- [Get all licenses connected to certain component](#getLicensesInComponent)

- [Get all licenses connected to a certain product](#getLicensesInProduct)

- [Get all licenses connected to a certain project](#getLicensesInProject)

- [Get the log for a certain license](#getLicenseLog)


### Components

- [Get all approved components](#getApprovedComponents)

- [Get all pending components](#getPendingComponents)

- [Search for an approved component](#searchForApprovedComponent)

- [Search for a pending component](#searchForPendingComponent)

- [Get a component from its ID](#getComponentByID)

- [Add a new component](#addComponent)

- [Connect a license to a component](#connectLicenesWithComponent)

- [Approve a component](#approveComponent)

- [Change the comment of a component](#changeComponentComment)

- [Get all components containing a certain license](#getComponentsWithLicense)

- [Get all components connected to a certain product](#getComponentsInProduct)

- [Get all components connected to a certain project](#getComponentsInProject)

- [Get the log for a certain component](#getComponentLog)


### Products

- [Get all products](#getAllProducts)

- [Get all approved products](#getApprovedProducts)

- [Get all pending products](#getPendingProducts)

- [Search for an approved product](#searchForApprovedProduct)

- [Search for a pending product](#searchForPendingProduct)

- [Get a product from its ID](#getProductById)

- [Add a new product](#addProduct)

- [Connect a component to a product](#connectComponentWithProduct)

- [Approve a product](#approveProduct)

- [Change the comment of a product](#changeProductComment)

- [Get all products containing a certain license](#getProductsWithLicense)

- [Get all products containing a certain component](#getProductsWithComponent)

- [Get all products connected to a certain project](#getProductsInProject)

- [Show the log for a certain product](#getProductLog)


### Projects

- [Get all approved projects](#getApprovedProjects)
 
- [Get all pending projects](#getPendingProjects)

- [Search for an approved project](#searchForApprovedProject)

- [Search for a pending project](#searchForPendingProject)

- [Get a project from its ID](#getProjectById)

- [Add a new project](#addProject)

- [Connect a product to a project](#connectProductWithProject)

- [Approve a project](#approveProject)

- [Change the comment of a project](#changeProjectComment)

- [Get all projects containing a certain license](#getProjectsWithLicense)

- [Get all projects containing a certain component](#getProjectsWithComponent)

- [Get all projects containing a certain product](#getProjectsWithProduct)

- [Get the log for a certain project](#getProjectLog)


### Statuskod

- **200** Successful GET and PUT.
- **201** Successful POST.
- **202** Successful Provision Queued.
- **204** Successful DELETE.
- **401** Unauthorized.
- **409** Failed POST, PUT or DELETE.
- **500** Internal server error.

# Licenses

<a name="getAllLicenses"/>

## Get all licenses.

### URL

/licenses/?offset=0&amount=30&sort=licenseName&order=asc

### Method

GET

### URL Params

Required:
```
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
  "items":[{  "id":5,
              "licenseName":"Apache License",
              "licenseVersion":"2.0",
              "dateCreated":"2017-10-20",
              "lastEdited":"2017-10-15",
              "URL":"https://www.mozilla.org/en-US/MPL/2.0/",
              "comment":null,
              "licenseType":"Open source license"}],
   "links":{  "prev":"?offset=0&amount=5",
              "current":"?offset=0&amount=5",
              "next":"?offset=0&amount=5"},
   "sort":{   "column":"&sort=licenseName",
              "order":"&order=asc"},
   "meta":{   "current":0,
              "count":0},
   "errors":{ "message":[],
              "status":"OK"},
   "errorflag":false
}
```

### Sample Call
```javascript
axios.get('/licenses/?offset=0&amount=30&sort=licenseName&order=asc')
  .then(response => {
  response.data
}
```

<a name="searchForALicense"/>

## Search for a license.

### URL

/licenses/search/:id?offset=0&amount=30&sort=licenseName&order=asc

### Method

GET

### URL Params

Required:
```
id = licenseName
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
  "items":[{  "id":5,
              "licenseName":"Apache License",
              "licenseVersion":"2.0",
              "dateCreated":"2017-10-20",
              "lastEdited":"2017-10-15",
              "URL":"https://www.mozilla.org/en-US/MPL/2.0/",
              "comment":null,
              "licenseType":"Open source license"}],
   "links":{  "prev":"?offset=0&amount=5",
              "current":"?offset=0&amount=5",
              "next":"?offset=0&amount=5"},
   "sort":{   "column":"&sort=licenseName",
              "order":"&order=asc"},
   "meta":{   "current":0,
              "count":0},
   "errors":{ "message":[],
              "status":"OK"},
   "errorflag":false
}
```

### Sample Call
```javascript
axios.get('/licenses/search/Apache?offset=0&amount=30&sort=licenseName&order=asc')
  .then(response => {
  response.data
}
```

<a name="getLicenseById"/>

## Get a license from its ID.

### URL

/licenses/license/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
{
"id" : 1,
"licenseName" : "GNU AGPL",
"licenseVersion" : "3.0",
"dateCreated" : "2017-10-01",
"lastEdited" : "2017-10-01",
"URL" : "https://www.gnu.org/licenses/agpl-3.0.en.html",
"comment" : "GNU Affero General Public License",
"licenseType" : "Open source license"
}
```

### Sample Call
```javascript
axios.get('/licenses/license/1')
  .then(response => {
  response.data
}
```

<a name="addLicense"/>

## Add a new license.

### URL

/licenses/add

### Method

POST

### Data Params

Example:
```javascript
{
  "licenseName" : String,
  "licenseVersion" : String,
  "dateCreated" : String,
  "lastEdited" : String,
  "URL" : String,
  "comment" : String,
  "licenseType" : String
}
```

### Success Response

Code: 201

Content:
```
{
  "send": "success"
}
```

### Error Response

Code: 500

Content:
```
{
  error_id : "E04"
}
```

### Sample Call
```
let data = '{
              "licenseName" : "New License",
              "licenseVersion" : "1.0",
              "dateCreated" : "2017-12-05",
              "lastEdited" : "2017-12-05",
              "URL" : "http://www.example.com",
              "comment" : "This is a comment.",
              "licenseType" : "Type of license."
}'
```
```javascript
axios.post('/licenses/add', data)
  .then(response => {
  response
})
```

<a name="changeLicenseComment"/>

## Change the comment of a license.

### URL

/licenses/comment

### Method

POST

### Data Params

Example:
```
{
  "id" : Integer,
  "comment" : String
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Error Response

Code: 500

Content:
```
{
  error_id : "E04"
}
```

### Sample Call
```
let data = '{
              "id" : 1,
              "comment" : "This is a comment."
}'
```
```javascript
axios.post('/licenses/comment', data)
  .then(response => {
  response
})
```

<a name="changeLicenseURL"/>

## Change the URL of a license.

### URL

/licenses/URL

### Method

POST

### Data Params

Example:
```
{
  "id" : Integer,
  "URL" : String
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Error Response

Code: 500

Content:
```
{
  error_id : "E04"
}
```

### Sample Call
```
let data = '{
              "id" : 1,
              "URL" : "This is an URL."
}'
```
```javascript
axios.post('/licenses/URL', data)
  .then(response => {
  response
})
```

<a name="getLicensesInComponent"/>

## Get all licenses connected to a certain component.

### URL

/licenses/licensesInComponent/:id

### Method

GET

### URL Params

Required:
```
id = Integer (id of component)
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"licenseName" : "GNU AGPL",
"licenseVersion" : "3.0",
"dateCreated" : "2017-10-01",
"lastEdited" : "2017-10-01",
"URL" : "https://www.gnu.org/licenses/agpl-3.0.en.html",
"comment" : "GNU Affero General Public License",
"licenseType" : "Open source license"
}, ...]
```

### Sample Call
```javascript
axios.get('/licenses/licensesInComponent/1')
  .then(response => {
  response.data
}
```

<a name="getLicensesInProduct"/>

## Get the licenses connected to a certain product.

### URL

/licenses/licensesInProduct/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 9,
"licenseName" : "BSD 3-clause",
"licenseVersion" : "1.0",
"dateCreated" : "2017-11-01",
"lastEdited" : "2017-11-01",
"comment" : null
}]
```

### Sample Call
```javascript
axios.get('/licenses/licensesInProduct/1')
  .then(response => {
  response.data
}
```

<a name="getLicensesInProject"/>

## Get the licenses connected to a certain project.

### URL

/licenses/licensesInProject/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 9,
"licenseName" : "BSD 3-clause",
"licenseVersion" : "1.0",
"dateCreated" : "2017-11-01",
"lastEdited" : "2017-11-01",
"comment" : null
}]
```

### Sample Call
```javascript
axios.get('/licenses/licensesInProject/1')
  .then(response => {
  response.data
}
```

<a name="getLicenseLog"/>

## Get the log for a certain license.

### URL

/licenses/log/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"licenseID" : 1,
"dateLogged" : 0,
"note" : "License created."
}]
```

### Sample Call
```javascript
axios.get('/licenses/log/1')
  .then(response => {
  response.data
}
```


# Components

<a name="getApprovedComponents"/>

## Get all approved components

### URL

/components/?offset=0&amount=30&sort=componentName&order=asc

### Method

GET

### URL Params

Required:
```
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
  "items":[{  "id":3,
              "componentName":"axios",
              "componentVersion":"0.17.0",
              "dateCreated":"2017-11-04",
              "lastEdited":"2017-11-04",
              "comment":"Promise based HTTP client for the browser and node.js.",
              "approved":1,
              "approvedBy":"Nils Nilsson"}],
  "links":{   "prev":"?offset=0&amount=5",
              "current":"?offset=0&amount=5",
              "next":"?offset=0&amount=5"},
  "sort":{    "column":"&sort=componentName",
              "order":"&order=asc"},
  "meta":{    "current":0,
              "count":0},
  "errors":{  "message":[],
              "status":"OK"},
  "errorflag":false
}
```

### Sample Call
```javascript
axios.get('/components/?offset=0&amount=30&sort=componentName&order=asc')
  .then(response => {
  response.data
}
```

<a name="getPendingComponents"/>

## Get all pending components.

### URL

/components/pending?offset=0&amount=30&sort=componentName&order=desc

### Method

GET

### URL Params

Required:
```
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
  "items":[{  "id":3,
              "componentName":"axios",
              "componentVersion":"0.17.0",
              "dateCreated":"2017-11-04",
              "lastEdited":"2017-11-04",
              "comment":"Promise based HTTP client for the browser and node.js.",
              "approved":0,
              "approvedBy":"Nils Nilsson"}],
  "links":{   "prev":"?offset=0&amount=5",
              "current":"?offset=0&amount=5",
              "next":"?offset=0&amount=5"},
  "sort":{    "column":"&sort=componentName",
              "order":"&order=asc"},
  "meta":{    "current":0,
              "count":0},
  "errors":{  "message":[],
              "status":"OK"},
  "errorflag":false
}
```

### Sample Call
```javascript
axios.get('/components/pending?offset=0&amount=30&sort=componentName&order=desc')
  .then(response => {
  response.data
}
```

<a name="searchForApprovedComponent"/>

## Search for an approved component.

### URL

/components/search/:id?offset=0&amount=30&sort=componentName&order=asc

### Method

GET

### URL Params

Required:
```
id = componentName
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
  "items":[{  "id":3,
              "componentName":"axios",
              "componentVersion":"0.17.0",
              "dateCreated":"2017-11-04",
              "lastEdited":"2017-11-04",
              "comment":"Promise based HTTP client for the browser and node.js.",
              "approved":1,
              "approvedBy":"Nils Nilsson"}],
  "links":{   "prev":"?offset=0&amount=5",
              "current":"?offset=0&amount=5",
              "next":"?offset=0&amount=5"},
  "sort":{    "column":"&sort=componentName",
              "order":"&order=asc"},
  "meta":{    "current":0,
              "count":0},
  "errors":{  "message":[],
              "status":"OK"},
  "errorflag":false
}
```

### Sample Call
```javascript
axios.get('/components/search/axios?offset=0&amount=30&sort=componentName&order=asc')
  .then(response => {
  response.data
}
```

<a name="searchForPendingComponent"/>

## Search for a pending component.

### URL

/components/pending/search/:id?offset=0&amount=30&sort=componentName&order=asc

### Method

GET

### URL Params

Required:
```
id = componentName
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
  "items":[{  "id":10,
              "componentName":"sqlite3",
              "componentVersion":"3.1.13",
              "dateCreated":"2017-11-11",
              "lastEdited":"2017-11-11",
              "comment":"Asynchronous, non-blocking SQLite3 bindings for Node.js.",
              "approved":0,
              "approvedBy":"Nils Nilsson"}],
  "links":{   "prev":"?offset=0&amount=5",
              "current":"?offset=0&amount=5",
              "next":"?offset=0&amount=5"},
  "sort":{    "column":"&sort=componentName",
              "order":"&order=asc"},
  "meta":{    "current":0,
              "count":0},
  "errors":{  "message":[],
              "status":"OK"},
  "errorflag":false
}
```
### Sample Call
```javascript
axios.get('/components/pending/search/sqlite3?offset=0&amount=30&sort=componentName&order=asc')
  .then(response => {
  response.data
}
```

<a name="getComponentByID"/>

## Get a component from its ID.

### URL

/components/component/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
{
  "id":1,
  "componentName":"vue",
  "componentVersion":"2.5.2",
  "dateCreated":"2017-11-01",
  "lastEdited":"2017-11-01",
  "comment":"The Progressive JavaScript Framework.",
  "approved":1,
  "approvedBy":"Nils Nilsson"
}
```

### Sample Call
```javascript
axios.get('/components/component/1')
  .then(response => {
  response.data
}
```

<a name="addComponent"/>

## Add a new component.

### URL

/components/add

### Method

POST

### Data Params

Example:
```
{
    "componentName" : String,
    "componentVersion" : String,
    "comment" : String,
    "license" : Integer
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
    "componentName":"Random component name",
    "componentVersion":"1.0",
    "comment":"Third party handler Rest API for handling licenses.",
    "license":1
}'
```
```javascript
axios.post('/components/add', data)
  .then(response => {
  response
})
```

<a name="connectLicenesWithComponent"/>

## Connect a license to a component.

### URL

/components/connectLicenseWithComponent

### Method

POST

### Data Params

Example:
```
{
    componentID : Integer,
    licenseID : Integer,
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
              componentID : 1,
              licenseID : 2,
            '
```
```javascript
axios.post('/components/connectLicenseWithComponent', data)
  .then(response => {
  responseShow
})
```

<a name="approveComponent"/>

## Approve a component.

### URL

/components/approve

### Method

PUT

### Data Params

Example:
```
{
  id : Integer,
  approved : Integer,
  approvedBy : String,
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
              id : 1,
              approved : 1,
              approvedBy : "Nils Nilsson",
            }'
```
```javascript
axios.post('/components/approve', data)
  .then(response => {
  response
})
```

<a name="changeComponentComment"/>

## Change the comment of a component.

### URL

/component/comment

### Method

POST

### Data Params

Example:
```
{
    componentID : Integer,
    comment : String,
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
              componentID : 1,
              comment : "Detta är en ny kommentar",
            '
```
```javascript
axios.post('/components/comment', data)
  .then(response => {
  response
})
```

<a name="getComponentsWithLicense"/>

## Get all components containing a certain license.

### URL

/components/componentsWithLicense/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"componentName" : "A component",
"componentVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "This is a component.",
"approved" : 1,
"approvedBy" : "Nils Nilsson"
}]
```

### Sample Call
```javascript
axios.get('/components/componentsWithLicense/1')
  .then(response => {
  response.data
}
```

<a name="getComponentsInProduct"/>

## Get all components connected to a certain product.

### URL

/components/componentsInProduct/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"componentName" : "A component",
"componentVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "This is a component.",
"approved" : 1,
"approvedBy" : "Nils Nilsson"
}]
```

### Sample Call
```javascript
axios.get('/components/componentsInProduct/1')
  .then(response => {
  response.data
}
```

<a name="getComponentsInProject"/>

## Get all components connected to a certain project.

### URL

/components/componentsInProject/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"componentName" : "A component",
"componentVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "This is a component.",
"approved" : 1,
"approvedBy" : "Nils Nilsson"
}]
```

### Sample Call
```javascript
axios.get('/components/componentsInProject/1')
  .then(response => {
  response.data
}
```

<a name="getComponentLog"/>

## Get the log for a certain component.

### URL

/components/log/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"componentID" : 1,
"dateLogged" : "2017-11-05",
"note" : "Component created."
}]
```

### Sample Call
```javascript
axios.get('/components/log/1')
  .then(response => {
  response.data
}
```


# Products

<a name="getAllProducts"/>

## Get all products

### URL

/products/all/?offset=0&amount=30&sort=productName&order=asc

### Method

GET

### URL Params

Required:
```
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
"items": [{  "id":1,
              "productName":"Third-Party License Management REST API",
              "productVersion":"1.0",
              "dateCreated":"2017-11-20",
              "lastEdited":"2017-11-20",
              "comment":"Third party handler Rest API for handling licenses.",
              "approved":1,
              "approvedBy":"Nils Nilsson"},
           {  "id":2,
              "productName":"Third-Party License Management WUI",
              "productVersion":"1.0",
              "dateCreated":"2017-11-20",
              "lastEdited":"2017-11-20",
              "comment":"Third party handler Rest API for handling licenses.",
              "approved":0,
              "approvedBy":"Nils Nilsson"}],
"links": {    "prev":"?offset=0&amount=5&sort=productName&order=asc",
              "current":"?offset=0&amount=5&sort=productName&order=asc",
              "next":"?offset=0&amount=5&sort=productName&order=asc"},
"sort": {     "column":"&sort=productName",
              "order":"&order=asc"},
"meta": {     "current":0,
              "count":0},
"errors": {   "message":[],
              "status":"OK"},
"errorflag": false
}
```

### Sample Call
```javascript
axios.get('/products/all/?offset=0&amount=30&sort=productName&order=asc')
  .then(response => {
  response.data
}
```

<a name="getApprovedProducts"/>

## Get all approved products

### URL

/products/?offset=0&amount=30&sort=productName&order=asc

### Method

GET

### URL Params

Required:
```
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
"items": [{  "id":1,
              "productName":"Third-Party License Management REST API",
              "productVersion":"1.0",
              "dateCreated":"2017-11-20",
              "lastEdited":"2017-11-20",
              "comment":"Third party handler Rest API for handling licenses.",
              "approved":1,
              "approvedBy":"Nils Nilsson"}],
"links": {    "prev":"?offset=0&amount=5&sort=productName&order=asc",
              "current":"?offset=0&amount=5&sort=productName&order=asc",
              "next":"?offset=0&amount=5&sort=productName&order=asc"},
"sort": {     "column":"&sort=productName",
              "order":"&order=asc"},
"meta": {     "current":0,
              "count":0},
"errors": {   "message":[],
              "status":"OK"},
"errorflag": false
}
```

### Sample Call
```javascript
axios.get('/products/?offset=0&amount=30&sort=productName&order=asc')
  .then(response => {
  response.data
}
```

<a name="getPendingProducts"/>

## Get all pending products.

### URL

/products/pending/?offset=0&amount=30&sort=productName&order=desc

### Method

GET

### URL Params

Required:
```
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
"items": [{  "id":2,
              "productName":"Third-Party License Management WUI",
              "productVersion":"1.0",
              "dateCreated":"2017-11-20",
              "lastEdited":"2017-11-20",
              "comment":"Third party handler Rest API for handling licenses.",
              "approved":0,
              "approvedBy":"Nils Nilsson"}],
"links": {    "prev":"?offset=0&amount=5",
              "current":"?offset=0&amount=5",
              "next":"?offset=0&amount=5"},
"sort": {     "column":"&sort=productName",
              "order":"&order=desc"},
"meta": {     "current":0,
              "count":0},
"errors": {   "message":[],
              "status":"OK"},
"errorflag": false
}
```

### Sample Call
```javascript
axios.get('/products/pending/?offset=0&amount=30&sort=productName&order=desc')
  .then(response => {
  response.data
}
```

<a name="searchForApprovedProduct"/>

## Search for an approved product.

### URL

/products/search/:id/?offset=0&amount=30&sort=productName&order=asc

### Method

GET

### URL Params

Required:
```
id = productName
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
"items": [{  "id":1,
              "productName":"Third-Party License Management REST API",
              "productVersion":"1.0",
              "dateCreated":"2017-11-20",
              "lastEdited":"2017-11-20",
              "comment":"Third party handler Rest API for handling licenses.",
              "approved":1,
              "approvedBy":"Nils Nilsson"}],
"links": {    "prev":"?offset=0&amount=5",
              "current":"?offset=0&amount=5",
              "next":"?offset=0&amount=5"},
"sort": {     "column":"&sort=productName",
              "order":"&order=asc"},
"meta": {     "current":0,
              "count":0},
"errors": {   "message":[],
              "status":"OK"},
"errorflag": false
}
```

### Sample Call
```javascript
axios.get('/products/search/Third-Party License Management REST API/?offset=0&amount=30&sort=productName&order=asc')
  .then(response => {
  response.data
}
```

<a name="searchForPendingProduct"/>

## Search for a pending product.

### URL

/products/pending/search/:id/?offset=0&amount=30&sort=productName&order=asc

### Method

GET

### URL Params

Required:
```
id = productName
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
"items": [{  "id":2,
              "productName":"Third-Party License Management WUI",
              "productVersion":"1.0",
              "dateCreated":"2017-11-20",
              "lastEdited":"2017-11-20",
              "comment":"Third party handler Rest API for handling licenses.",
              "approved":0,
              "approvedBy":"Nils Nilsson"}],
"links": {    "prev":"?offset=0&amount=5",
              "current":"?offset=0&amount=5",
              "next":"?offset=0&amount=5"},
"sort": {     "column":"&sort=productName",
              "order":"&order=asc"},
"meta": {     "current":0,
              "count":0},
"errors": {   "message":[],
              "status":"OK"},
"errorflag": false
}
```

### Sample Call
```javascript
axios.get('/products/pending/search/Third-Party License Management WUI/?offset=0&amount=30&sort=productName&order=asc')
  .then(response => {
  response.data
}
```

<a name="getProductById"/>

## Get the product from its ID.

### URL

/products/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
{
"id" : 1,
"productName" : "Third-Party License Management REST API",
"productVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "Third party handler Rest API for handling licenses.",
"approved" : 1,
"approvedBy" : "Nils Nilsson"
}
```

### Sample Call
```javascript
axios.get('/products/1')
  .then(response => {
  response.data
}
```

<a name="addProduct"/>

## Add a new product.

### URL

/products/add

### Method

POST

### Data Params

Example:
```
{
    "productName" : String,
    "productVersion" : String,
    "dateCreated" : Date,
    "lastEdited" : Date,
    "comment" : String,
    "components" : [Integer,Integer]
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
    "productName":"Random product name",
    "productVersion":"1.0",
    "dateCreated":"2017-11-20",
    "lastEdited":"2017-11-20",
    "comment":"Third party handler Rest API for handling licenses.",
    "components":[1,2]
}'
```
```javascript
axios.post('/products/add', data)
  .then(response => {
  response
})
```

<a name="connectComponentWithProduct"/>

## Connect a component to a product.

### URL

/products/connectComponentWithProduct

### Method

POST

### Data Params

Example:
```
{
    productID : Integer,
    componentID : Integer,
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
              productID : 1,
              componentID : 2,
            '
```
```javascript
axios.post('/products/connectComponentWithProduct', data)
  .then(response => {
  response
})
```

<a name="approveProduct"/>

## Approve a product.

### URL

/products/approve

### Method

PUT

### Data Params

Example:
```
{
  id : Integer,
  approved : Integer,
  approvedBy : String,
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
              id : 1,
              approved : 1,
              approvedBy : "Nils Nilsson",
            }'
```
```javascript
axios.post('/products/approve', data)
  .then(response => {
  response
})
```

<a name="changeProductComment"/>

## Change the comment of a product.

### URL

/products/comment

### Method

POST

### Data Params

Example:
```
{
    productID : Integer,
    comment : String,
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
              productID : 1,
              comment : "Detta är en ny kommentar",
            '
```
```javascript
axios.post('/products/comment', data)
  .then(response => {
  response
})
```

<a name="getProductsWithLicense"/>

## Get all products containing a certain license.

### URL

/products/productsWithLicense/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"licenseName" : "A license",
"licenseVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "This is a License.",
"URL" : "www.hej.se"
}]
```

### Sample Call
```javascript
axios.get('/products/productsWithLicense/1')
  .then(response => {
  response.data
}
```

<a name="getProductsWithComponent"/>

## Get all products containing a certain component.

### URL

/products/productsWithComponent/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"componentName" : "A component",
"componentVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "This is a component.",
"approved" : 1,
"approvedBy" : "Nils Nilsson"
}]
```

### Sample Call
```javascript
axios.get('/products/productsWithComponent/1')
  .then(response => {
  response.data
}
```

<a name="getProductsInProject"/>

## Get all products connected to a certain project.

### URL

/products/productsInProject/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"projectName" : "A Project",
"projectVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "This is a project.",
"approved" : 1,
"approvedBy" : "Nils Nilsson"
}]
```

### Sample Call
```javascript
axios.get('/products/productsWithComponent/1')
  .then(response => {
  response.data
}
```

<a name="getProductLog"/>

## Get the log for a certain product.

### URL

/products/log/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"productID" : 1,
"dateLogged" : "2017-11-05",
"note" : "Product created."
}]
```

### Sample Call
```javascript
axios.get('/products/log/1')
  .then(response => {
  response.data
}
```


# Projects

<a name="getApprovedProjects"/>

## Get all approved projects

### URL

/projects/?offset=0&amount=30&sort=projectName&order=asc

### Method

GET

### URL Params

Required:
```
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
  "items":[{    "id":1,
                "projectName":"3PP Management Tool",
                "projectVersion":"1.0",
                "dateCreated":"2017-11-21",
                "lastEdited":"2017-11-21",
                "comment":"License manager solution for SAAB.",
                "approved":1,
                "approvedBy":"Nils Nilsson"}],
  "links":{     "prev":"?offset=0&amount=5",
                "current":"?offset=0&amount=5",
                "next":"?offset=0&amount=5"},
  "sort":{      "column":"&sort=projectName",
                "order":"&order=asc"},
  "meta":{      "current":0,
                "count":0},
  "errors":{    "message":[],
                "status":"OK"},
  "errorflag":false
}
```

### Sample Call
```javascript
axios.get('/projects/?offset=0&amount=30&sort=projectName&order=asc')
  .then(response => {
  response.data
}
```

<a name="getPendingProjects"/>

## Get all pending projects

### URL

/projects/pending/?offset=0&amount=30&sort=projectName&order=asc

### Method

GET

### URL Params

Required:
```
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
  "items":[{    "id":1,
                "projectName":"3PP Management Tool",
                "projectVersion":"1.0",
                "dateCreated":"2017-11-21",
                "lastEdited":"2017-11-21",
                "comment":"License manager solution for SAAB.",
                "approved":0,
                "approvedBy":"Nils Nilsson"}],
  "links":{     "prev":"?offset=0&amount=5",
                "current":"?offset=0&amount=5",
                "next":"?offset=0&amount=5"},
  "sort":{      "column":"&sort=projectName",
                "order":"&order=asc"},
  "meta":{      "current":0,
                "count":0},
  "errors":{    "message":[],
                "status":"OK"},
  "errorflag":false
}
```

### Sample Call
```javascript
axios.get('/projects/?offset=0&amount=30&sort=projectName&order=asc')
  .then(response => {
  response.data
}
```

<a name="searchForApprovedProject"/>


## Search for an approved project.

### URL

/projects/search/:id?offset=0&amount=30&sort=comment&order=asc

### Method

GET

### URL Params

Required:
```
id = projectName
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
  "items":[{    "id":1,
                "projectName":"3PP Management Tool",
                "projectVersion":"1.0",
                "dateCreated":"2017-11-21",
                "lastEdited":"2017-11-21",
                "comment":"License manager solution for SAAB.",
                "approved":1,
                "approvedBy":"Nils Nilsson"}],
  "links":{     "prev":"?offset=0&amount=5",
                "current":"?offset=0&amount=5",
                "next":"?offset=0&amount=5"},
  "sort":{      "column":"&sort=projectName",
                "order":"&order=asc"},
  "meta":{      "current":0,
                "count":0},
  "errors":{    "message":[],
                "status":"OK"},
  "errorflag":false
}
```

### Sample Call
```javascript
axios.get('/projects/search/:id?offset=0&amount=30&sort=comment&order=asc')
  .then(response => {
  response.data
}
```

<a name="searchForPendingProject"/>


## Search for a pending project.

### URL

/projects/pending/search/:id?offset=0&amount=30&sort=comment&order=asc

### Method

GET

### URL Params

Required:
```
id = projectName
offset = Integer
amount = Integer
sort = String
order = asc OR desc
```

### Success Response

Code: 200

Content:
```
{
  "items":[{    "id":6,
                "projectName":"A project",
                "projectVersion":"1.0",
                "dateCreated":"12/12/2017",
                "lastEdited":"12/12/2017",
                "comment":"License manager solution for SAAB.",
                "approved":0,
                "approvedBy":"Nils Nilsson"}],
  "links":{     "prev":"?offset=0&amount=5",
                "current":"?offset=0&amount=5",
                "next":"?offset=0&amount=5"},
  "sort":{      "column":"&sort=comment",
                "order":"&order=asc"},
  "meta":{      "current":0,
                "count":0},
  "errors":{    "message":[],
                "status":"OK"},
  "errorflag":false
}
```

### Sample Call
```javascript
axios.get('/projects/pending/search/A project?offset=0&amount=30&sort=comment&order=asc')
  .then(response => {
  response.data
}
```

<a name="getProjectById"/>


## Get a project from its ID.

### URL

/projects/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
{
"id" : 1,
"projectName" : "A Project",
"projectVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "This is a project.",
"approved" : 1,
"approvedBy" : "Nils Nilsson"
}
```

### Sample Call
```javascript
axios.get('/projects/1')
  .then(response => {
  response.data
}
```

<a name="addProject"/>

## Add a new project.

### URL

/projects/add

### Method

POST

### Data Params

Example:
```
{
    "projectName" : String,
    "projectVersion" : String,
    "comment" : String,
    "products" : [Integer,Integer]
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
    "projectName" : "A project",
    "projectVersion" : "1.0",
    "comment" : "Third party handler Rest API for handling licenses.",
    "products" : [1,2]
    }'
```
```javascript
axios.post('/project/add', data)
  .then(response => {
  response
})
```

<a name="connectProductWithProject"/>

## Connect a product to a project.

### URL

/projects/connectProductWithProject

### Method

POST

### Data Params

Example:
```
{
    projectID : Integer,
    productID : Integer,
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
              projectID : 1,
              productID : 2,
            '
```
```javascript
axios.post('/projects/connectProductWithProject', data)
  .then(response => {
  response
})
```

<a name="approveProject"/>

## Approve a project.

### URL

/projects/approve

### Method

PUT

### Data Params

Example:
```
{
  id : Integer,
  approved : Integer,
  approvedBy : String,
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
              id : 1,
              approved : 1,
              approvedBy : "Nils Nilsson",
            }'
```
```javascript
axios.post('/projects/approve', data)
  .then(response => {
  response
})
```

<a name="changeProjectComment"/>

## Change the comment of a project.

### URL

/projects/comment

### Method

POST

### Data Params

Example:
```
{
    projectID : Integer,
    comment : String,
}
```

### Success Response

Code: 201

Content:
```
{
  send : "success"
}
```

### Sample Call
```
let data = '{
              projectID : 1,
              comment : "Detta är en ny kommentar",
            '
```
```javascript
axios.post('/projects/comment', data)
  .then(response => {
  response
})
```

<a name="getProjectsWithLicense"/>

## Get all projects containing a certain license.

### URL

/projects/projectsWithLicense/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"projectName" : "A Project",
"projectVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "This is a project.",
"approved" : 1,
"approvedBy" : "Nils Nilsson"
}]
```

### Sample Call
```javascript
axios.get('/projects/projectsWithLicense/1')
  .then(response => {
  response.data
}
```

<a name="getProjectsWithComponent"/>

## Get all projects containing a certain component.

### URL

/projects/projectsWithComponent/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"projectName" : "A Project",
"projectVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "This is a project.",
"approved" : 1,
"approvedBy" : "Nils Nilsson"
}]
```

### Sample Call
```javascript
axios.get('/projects/projectsWithComponent/1')
  .then(response => {
  response.data
}
```

<a name="getProjectsWithProduct"/>

## Get all projects containing a certain product.

### URL

/projects/projectsWithProduct/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"projectName" : "A Project",
"projectVersion" : "1.0",
"dateCreated" : "2017-11-20",
"lastEdited" : "2017-11-20",
"comment" : "This is a project.",
"approved" : 1,
"approvedBy" : "Nils Nilsson"
}]
```

### Sample Call
```javascript
axios.get('/products/productsWithLicense/1')
  .then(response => {
  response.data
}
```

<a name="getProjectLog"/>

## Get the log for a certain project.

### URL

/projects/log/:id

### Method

GET

### URL Params

Required:
```
id = Integer
```
Example: id = 1

### Success Response

Code: 200

Content:
```
[{
"id" : 1,
"projectID" : 1,
"dateLogged" : "2017-11-05",
"note" : "Project created."
}]
```

### Sample Call
```javascript
axios.get('/projects/log/1')
  .then(response => {
  response.data
}
```
