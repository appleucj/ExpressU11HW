const express = require('express')
const path = require("path")
const fs = require("fs")
// CONSTANTS

const app = express()

const port = 3000 || process.env.PORT

//MIDDLEWARE
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API ROUTES
// READ FROM DB.JSON
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db/json", "utf-8", (err, data) => {
        const json = JSON.parse(data)
        res.json(json)
    })
});

app.post("/api/notes", (req, res) => {
    // console.log(req.body)
    const newNote = req.body
    // const parseNote = JSON.stringify(newNote)
    // console.log(parsedNote)
    console.log(newNote)
    // WILL ADD TO DB.json
    fs.readFile("./db/db/json", "utf-8", (err, data) => {
        // consle.log(data)
        const parsedArray = JSON.parse(data)
        parsedArray.push(newNote)
        const stringifyArry = JSON.stringify(parsedArray)
        console.log(parsedArray)

        fs.writeFile("./db/db.json", stringifyArray, "utf-8", (err) => {
            if (err) throw err
        })
        // ===========================================================================

        res.json(parsedArray)
    })
    // fs.appendFile("./db/db/json", parsedNote, "utf-8", (err, data)=>{
    //     })
});

// DELETE NOTE
app.delete("/api/notes/:id", (req, res) => {
    // GET AN ID FROM THE NOTE IN THE DB
    // IF ID MATCHES DELETE
    const query = req.params
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const parsedArray = JSON.parse(data);
        console.log(parsedArray)
        idArray = parsedArray.map((note, index) => {
            note.id = index
        })
        console.log("Added ID", parsedArray)
        const filterredArr = parsedArray.filter(note => note.id !== parseInt(query.id))

        fs.writeFile("./db/db.json", filteredArr, "utf-8", err => {
            if (err) throw err;

        });
        res.json(filteredArr)
    })
})

// HTML ROUTES
app.get("/notes", (req, res) => {
    res.sendFile(path.join(_dirname, "/public/notes.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "/public/index.html"))
})

app.listen(port, console.log('server is running on port ${port}'))