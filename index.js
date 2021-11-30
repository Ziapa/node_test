const express = require("express")
const AmoCRM = require("amocrm-js")
const PORT = process.env.PORT || 5000
const cors = require('cors')


const app = express()
app.use(cors())

const crm = new AmoCRM({
    domain: 'ziapa',
    auth: {
        client_id: 'ea6e99be-6e54-401c-98b3-123169b5345c',
        client_secret: 'mj21Q5oHVoWy6jpxlu3PwFl0gEXbVKNibAUUvm7v5gqDju2xJsTZPJpxyn1ABXng',
        redirect_uri: 'https://0cd3-5-145-252-223.ngrok.io',
        code: process.env.CODE
    },

});




app.get("/", async (req, res) => {
   return res.json("work")
})

app.get("/leads", async (req, res) => {
    const response = await crm.request('GET', '/api/v4/leads');

    return res.json(response.data)
})

app.get("/leads/:id", async (req, res) => {
    const response = await crm.request('GET', `/api/v4/leads?query=${req.params.id}`);

    return res.json(response.data)
})

app.get("/contacts/", async (req, res) => {
    const response = await crm.request('GET', `/api/v4/contacts`);

    return res.json(response.data)
})

app.get("/contacts/:id", async (req, res) => {
    const response = await crm.request('GET', `/api/v4/contacts?with=${req.params.id}`);

    return res.json(response.data)
})

async function startApp() {
    try {
        app.listen(PORT, () => {
            console.log(`Server start: http://localhost:${PORT}/`)
        })
    } catch (e) {
        console.log(e)
    }
}

startApp()
