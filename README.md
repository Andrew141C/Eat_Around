## Project Info
- Project name: Eat Around
- Course code: comp3810sef / comp3811f
- Group: 13
- Group info: _fill in group number, names, SIDs_
  - Cheung Tsz Hin, Anderson S1411328
  - Tse Tsz Sum S1423100
  - Choy Tsz Lok S1410837

## Project File Intro
- server.js
  - express server and with middleware(include: cors, dotenv, body-parser)
  - use mongoose to connect MongoDB database
  - RESTful API routes
    - auth with register, login and password recovery
    - food listing with acquirable food items in list
    - orders checkout, summarize and delete
- package.json
  - dependencies of install package
    - express
    - mongoose
    - bcrypt
    - jsonwebtoken
    - cors
    - dotenv
  - scripts
    - start
    - test
- public
  - `login.html` (mix with `login.js` and `login.css`)
  - `forget.html` and `reset.html` (mix with `recovery-client.js`and `reset-client.js`)
  - `new hom page 3.html`  (mix with `home.js`and `home.css`)
    - main menu and cart UI
  - `payment.html` (payment choices and final “pay” action)
- Assets 
  - WeChat-Pay.png
  - OIP.webp
  - LOGO.png
  - T1.png
- CSS
  - login.css
  - home.css
- JavaScript
  - login.js
  - recovery-client.js
  - reset-client.js
  - home.js
## Cloud-based Server URL
- URL：
- Local run: `npm install` then `node server.js`, default `http://localhost:3000/`

## Operation Guides (user flow)
- Login & Logout(update):
  - Open `login.html`, input your username and password to `/api/auth/login`.
  - Token is stored in localStorage; “Log out” clears it.
- Food menu & cart(create and read):
  - `new hom page 3.html` loads foods from `/api/foods`.
  - Click foods you want and it add into cart; Adjustable number of food in cart.
  - “Confirm” in cart calls `POST /api/orders` (requires token) to place an order.
- Pay (order summary & clear) (read and delete):
  - “Pay” in the main page shows orders via `/api/orders/summary`.
  - `payment.html`: select a payment option, click Pay → `DELETE /api/orders`, show success, redirect home.
- Recovery(update):
  - `forget.html` → `/api/recovery/verify` → `reset.html` → `PUT /api/recovery/reset`.

## API Quick Reference (local defaults)
- `POST /api/auth/register` `{ username|name, email?, password }`
- `POST /api/auth/login` `{ username|name, password }` → `token`
- `GET /api/foods`
- `POST /api/orders` (auth) `{ items: [{ name, price, quantity }] }`
- `GET /api/orders/mine` (all orders, no auth)
- `GET /api/orders/summary` (all orders with totals, no auth)
- `DELETE /api/orders` (clears all orders, no auth)
- `PUT /api/recovery/reset` (reset the password after auth)