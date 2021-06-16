# job-location-app
A mobile application that locates jobs on a map using jobs api

- Contributor: Arnaud Adon
- Status: Open - possibility of improvments later
- Reason: :small_blue_diamond: To manipultate more Expo tools under React native as Animate, pan responder, notifications, redux-persist, etc ...


## Description 

Une application mobile permettant de localiser sur une carte différents emplois au alentour de la position de l'appareil.
A Mobile application allowing to locate on a map different jobs around the device position.

### Main features

- Authentification with Facebook account is required to log in
- Jobs are listed as swipe card to drag
- drag a card to the left for save job in favorite list, drag to the right for delete job
- favorite jobs list are saved when the application is close

## Application overview

https://user-images.githubusercontent.com/17828383/122127216-27201500-ce33-11eb-9687-3c6301c30d83.mp4

<img src="https://user-images.githubusercontent.com/17828383/122253564-9138c880-cecc-11eb-9113-a4a4c428eb3a.png" width="300" />  <img src="https://user-images.githubusercontent.com/17828383/122253659-a877b600-cecc-11eb-89dd-c2ba846af4a2.png" width="300" />

<img src="https://user-images.githubusercontent.com/17828383/122253736-baf1ef80-cecc-11eb-8fab-91bf53fe906c.png" width="300" /> <img src="https://user-images.githubusercontent.com/17828383/122258437-52594180-ced1-11eb-8177-0044d2fe7ea6.png" width="300" />


## Data
l'application fonctionne actuellement avec un mock qui contient des emplois, mais une api d'emploi peut y être ratachée, tel que Indeed, github jobs, etc...
Mobile app currently work with mock data jobs, but can be use with jobs API like Indeed, githubs jobs, ...

## Topic covered :clipboard:

- Welcome screen scrollview
- Facebook authentification
- Mapview 
- Animate and pan responder from React Native
- persist informations
- nested stack and tab navigation
- notifications

## Technical stack :computer:

- Expo
- React Native
- Redux
- Redux-persist
- AsyncStorage
- axios

Install

```
npm run install
```

To start

```
expo start
```
