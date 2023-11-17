# Prerequisites
* Node.js
* Docker


# Setup project

* create `.env.local` and override environment variables with your local's variables
  * **REACT_APP_API_URL**: The API url
  

* Clone repository
```bash
  git clone http://192.168.206.207:81/akdital/new-visionhis/app.git
```

* Navigate the `/app`
```bash
  cd app
```

* Create an image called client on Docker.
```bash
  docker build -f Dockerfile -t client .
```

* Run the application in development mode
```bash
  docker run -it -p 4001:3011 client
```

