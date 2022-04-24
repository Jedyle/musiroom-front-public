## Launch instructions

From the root directory :

	npm install

Then create a .env file with the following content: 

	NODE_PATH=src/
	REACT_APP_API_URL="http://localhost:8000" # the api endpoint
	REACT_APP_SITE_TITLE=La Musithèque
	
Then 

	npm run start
	
	
Coding Guidelines

* "components" containers reusable material.
* "containers" are components using redux / external api calls 
* "pages" are the actual pages

/!\ a "component" in components/ folder should NEVER call a "container" /!\
