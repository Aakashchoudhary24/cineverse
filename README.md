# Accessing the db
$ psql -U cineverse_user -d cineverse -h localhost
enter your password after the above command.

# Featuers upto now
## Auth : 
1. If not logged in - Log in if you wish to
2. If not registered - register
3. If logged in and trying to register - logout first
4. If logged in and trying to login - logout first
5. Each new registration must have a unique username
6. All usernames are converted to lowercase later on
7. Confirm password feature added

## Tasks :
1. User might be logged in for viewing others' tasks
2. User must be logged in to create/add tasks 
3. Tasks button in navbar takes you to the
tasks page where you view other tasks that people have created
and allows likes
4. Tasks div shows username and tags/genres/categories

