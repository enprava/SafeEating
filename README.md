# Safe Eating

Safe Eating is a user-friendly mobile application designed to help individuals with dietary intolerances or allergies find restaurants that accommodate their specific dietary needs. The app caters to individuals with various food sensitivities, including gluten intolerance, lactose intolerance, nut allergies, and other common dietary restrictions.

## Information for developers

### Develop

Run the entire project in docker with:
```
docker compose -f docker-compose-dev.yml up
```

This docker compose setup builds 2 images (backend and frontend) and runs a third with the postgis database.

You can optionally run isolated backend or frontend. To run backend:

```
cd backend
docker compose up #Starts database
source venv/bin/activate #Activate venv
pip install -r requirements.txt #Install dependencies
python manage.py runserver # Run the development server
```

You can run frontend by:

```
cd frontend
npm i
npm run dev
```
### Running deployment containers

By running `docker compose up` you can run the entire deployment setup. You can add the flag `-f docker-compose-pi.yml` to run it in raspberry-pi devices.