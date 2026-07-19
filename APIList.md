# API's List

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
-GET /profile/view 
-PATCH /profile/edit 
-PATCH /profile/password

## ConnectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId
-POST /request/send/accepted/:userId
-POST /request/send/rejected/:userId

## userRouter
-GET users/connection
-GET users/requests/received
-GET users/feed - gets you the profiles of users on the platform

## REAL TIME CHAT INTEGRATION 

  BUILD UI FOR CHAT
  Setup sockt io in BE 


