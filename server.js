
import express from "express";
import fetch from "node-fetch";
const app = express();
const port = 8080;
let d = new Date();
let s = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + " " + d.getHours() +":" + d.getMinutes()+ ":"+ d.getSeconds();
let apiKey = '75fc22d2fe77da3282f33adf2e4920ef1902e8cac39425a87e554c11';
function json(url) {
    return fetch(url).then(res => res.json());
};

app.get('/', (req, res) => {
    
    res.send("Strona glowna <br/>" + "Sprawdz ip wpisujac /ip w pasku url");
});

app.get('/ip', (req, res) => {
    
    json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    
            res.write("Twoj adres IP: " + data.ip + "\n" + "Czas w twojej strefie: " +data.time_zone.current_time);
            res.end();
    
        });
});

app.listen(port, () => {
    console.log("Jakub Jaroń");
    console.log(`Serwer działa na porcie: ${port}`);
    console.log(`Czas uruchomienia serwera: ${s}`);
});