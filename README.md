## Todo-fullstack render

Yksinkertainen tehtävälistasovellus (Todo-app), jossa voit:

Lisätä tehtäviä
Muokata tehtäviä
Poistaa tehtäviä
Tallentaa tehtävät tietokantaan (MongoDB)

Sovellus toimii Renderissä verkossa.

## Teknologiat
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Render
- HTML / CSS / JavaScript

## Mikä on render?
Render on pilvipalvelu, jonka avulla voit julkaista sovelluksesi internetiin.

Se toimii näin:

Yhdistät GitHub-repositoriosi Renderiin

Render asentaa riippuvuudet

Render käynnistää sovelluksen

Saat julkisen linkin (esim. https://oma-app.onrender.com)

Näin sovellus toimii netissä ilman, että sinun tarvitsee pitää omaa tietokonetta päällä.

## Entäs Web service
Web Service tarkoittaa taustalla pyörivää palvelinsovellusta.

Tässä projektissa Web Service:

Käynnistää Node.js + Express -palvelimen

Yhdistää MongoDB-tietokantaan

Vastaa HTTP-pyyntöihin (GET, POST, PUT, DELETE)

Palvelee myös frontendin selaimeen

Kun luot Renderissä Web Servicen, Render:

Ajaa npm install

Käynnistää sovelluksen komennolla node index.js

Antaa sovellukselle julkisen verkko-osoitteen

## Käyttö ohje / asennus paikallisesti

- Kun olet kokeillut, että saat todo sovelluksen paikallisesti toimimaan siirretään se githubiin, jotta saadaan se toimimaan renderiin.s

1. Lataa projekti

Jos käytät Git:iä:

git clone <repo-linkki>
cd todo

Tai pura ZIP-tiedosto.

2. Asenna riippuvuudet
npm install

3. Luo .env tiedosto

Luo projektin juureen tiedosto nimeltä:

.env

Ja lisää sinne:

PORT=3000

MONGODB_URI=OMA_MONGODB_YHTEYS

(MongoDB Atlasista saat yhteysosoitteen)

4. Käynnistä sovellus
node index.js

Avaa selaimessa:

http://localhost:3000

5. tee viellä .gitignore tiedosto ja lisää sinne

node_modules/
 
  .env

## Render-deploy
- Luo githubiin uusi repositorio ja nimeä se esim "todo-fullstack"
- ÄLÄ VAIHDA REPOSITORION ASETUKSIA!
- Paina Create repository ja seuraavasta ikkunasta valitse upload an existing file
- Etsi projekti kansio tiedostojen hallinnasta ja valitse kaikki tiedostot projektikansion sisältä ja vedä ne laatikkoon, jossa lukee "Drag files here to add them to your repository"

Luo Render-tili
https://render.com

Luo Web Service

Render → New + → Web Service

Valitse GitHub-repo jonka teit aikaisemmin.

Asetukset Renderissä

Kohta  	        -         Arvo
                
Environment	    =        Node

Build Command	=        npm install

Start Command	=        node index.js

Root Directory	=        jätä tyhjäksi

- Instanssista kannattaa valita ilmainen

## Lisää Environment Variables
- Nämä pitää lisätä, koska render ei käytä .env tiedostoa, joten se tarvitsee tietokannan connectstringin muualta eli renderissä on ympäristö muuttujia joiden avulla pitää kertoa mitä .env sisältää

Render → Environment → Add Variable

Lisää:

Key	Value

MONGODB_URI	    "Oma mongodb connect stringi"

CLIENT_ORIGIN	jätä tyhjäksi

- Paina Deploy Web service
    sinulle aukeaa ikkuna, jossa näkyy console johon tulee logeja kun se alkaa luomaan sitä. Lopuksi se kertoo sinulle consoleen url osoitteen, jolla saat todo sovelluksen auki.

- kopioi osoite, jonka se antaa ja liitä se hakukoneeseen ja nyt todo sovellus toimii renderissä.
