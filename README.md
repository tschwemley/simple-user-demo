# Simplue User Register Demo
Simple demo of user registration and an admin report. For a live demo check out http://user.tylerschwemley.com

Allows registration of a user and provides an admin report, when requested, of users who were already registered.

Client side validation is done using javascript instead of HTML5 due to HTML5 validation issues in IE9 and below as well as some issues in Safari.

#Database configuration
Run the following command from the project root directory to create the database:
    
    mysql -u YOUR_USER -p < db_init.sql
