# Project Title 

Hook, Line, and Keeper (sever)

# Author

Maxwell Horton

# Description 

The server for Hook, Line, and Keeper (HLK) is set up to handle CRUD endpoints for users, their primary posts, and their secondary posts. 

# Use

.env: 
    If you pull this server from github and want to use it create a .env file in the source with the following information included. 

    "PORT =" : set this to your local port (usually 3000) 

    "DATABASE_URL =" : set this to the url to your server. i.e. "postgresql://postgres:PASSWORDHERE@localhost/SERVERNAME" 

    "JWT_SECRET =" : set this secret to a string of your choosing. 

db.js:
    Commit out lines 6 - 9 to run on a local server. If you don't do this you will get CORS errors. 

app.js: 
    Lines 27 & 28 are important to manipulating your database. Line 28 should be already committed out, while line 27 is not. If your want to clear your db, or if your made changes to the db table parameters, then you will need to commit out line 27 and un-commit out line 28 and save. Once you save refresh your local db and then reverse the commits in the server code and save again. 
 