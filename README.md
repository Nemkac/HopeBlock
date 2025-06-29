# HopeBlock

- Open-source crypto wallet koji pordžava multi chain, non custodial korisnike. Fokus ove aplikacije je na donacijama i transparentnosti.
- Uz pomoć MetaMask-a omogućavamo korisnicima da doniraju kripto iz bilo koje mreže jednim klikom.
- Pomoću Etherscan-a, korisnici mogu videti sve donacije za selektovanu humanitarnu svrhu.


## Kako pokrenuti

### Backend
- Otvoriti terminal
- Pozicionirati se u folder HopeBlock/api
- Pokrenuti sledeće komande
```
npm install
npm run dev
```
### Frontend
- Otvoriti drugi terminal
- Pozicionirati se u folder HopeBlock/frontend
- Pokrenuti sledeće komande
```
npm install
ng serve
```
- Pokrenuti aplikaciju na: localhost:4200
## Funkcionalnosti

- Prikaz dobrotvornih svrha
- Prikaz pojedinačne dobrotvorne svrhe
- Doniranje kripto valuta dobrotvornim svrhama iz razlčitih mreža.
- Non-Custodial wallet bez registracije.
- Istorija svake donacije sa hash-om i linkom ka block exploreru.

## Tehnologije

- Frontend: Angular
- Backend: Node.js
- Baza: MongoDb
