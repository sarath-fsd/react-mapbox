
## Introduction

This project is the frontend of react-maps.  
This is the implementation of Maps using React, Mapbox.   

App consists of 3 pages as follows:
```sh                  
	# Home Page:                                
		This page allows user to search name of a location.   A suggestion list will be displayed based on the entered location name.
        User can select any one of the places to look on the map.   There is an option provided to add the selected location to the favorite places list.  
```
                                                                                                                        
```sh 
	# My Favorite places:
		This page allows user to view the list of favorite places selected/added on the Home page.                                
```

```sh 
	# Nearby Favorite Places:
		This page helps to search a place and displays the favorite places within the radius of 50 Kms.                              
```
## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Run Backend

To run this project, you need to run back end.  Please refer the readme file present in the backend. 

Once you you follow the steps present in the readme file in the backend, make sure it's running.

### Install the Frontend Dependencies

Next, from the project folder, install the dependencies:

    npm i

### Environment Variables

| Name | Value  |
| ------ | ------ |
| REACT_APP_API_BASE_URL| http://localhost:3900/api (Update the port, if back end is running on differnt port) |
| REACT_APP_MAPBOX_TOKEN | Configured with temporary token, if app doesn't render maps. Please get the token from the Mapbox then update this variable with the new value |
| REACT_APP_RADIUS_TO_SHOW_FAVORITE_PLACES | 50 (Please increase or decrease this value according to your need.  This value is in KMs) |

### Start the App

    npm run start

This will launch the application on port 3000. If that port is busy, you can set a different port.