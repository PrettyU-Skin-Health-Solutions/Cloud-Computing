# About Repository

This is a repository for the PrettyU API that will be used by the mobile development team using endpoints to interact with the server.

## Requirements

Required npm installation:
+ @hapi/hapi
+ @hapi/joi
+ dotenv
+ bcrypt
+ jsonwebtoken
+ mysql
+ joi
+ @tensorflow/tfjs-node

## How to Run Backend API

1. Make sure you have installed Node.js on your device. (Used version: 20)
2. Initiate a new node.js project.
```
npm init -y
```
3. Install some required modules.
```
npm install @hapi/hapi @hapi/joi dotenv bcrypt jsonwebtoken mysql joi @tensorflow/tfjs-node
```
3. Make sure you have ```.env``` file that contains:
```
MODEL_URL=<url that link machine learning model>
DB_HOST=<ip address of your database>
DB_USER=<name of registered user>
DB_PASSWORD=<database password>
DB_DATABASE=<what databases you will use>
```
4. Run your API server.
```
npm run start
```

## Endpoints

### `/register` [POST]
#### Request Parameters
| Parameter | Data Type |
| --------- | ---------| 
| `username`     | Text     |
| `email`     | Text     |
| `password`     | Text     |

### `/login` [POST]
#### Request Parameters
| Parameter | Data Type |
| --------- | ---------| 
| `username`     | Text     |
| `password`     | Text     |

### `/predict` [POST]
#### Request Parameters
| Parameter | Data Type |
| --------- | ---------| 
| `image`     | file     |
