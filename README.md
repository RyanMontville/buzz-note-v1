# Bee_Inspection
My parents are bee keepers as a hobby. They wanted to start recording the state of the hives whenever they inspect the hive. I would like to create a web application that they can quickly and easily record the data using their phone. The purpose of recording the inspections is to try to find patterns and possibly use the data from last year to predict what will happen this year. 

## V 0.1
-I have created a mock-up of what the web interface might look like. I have added some Javascript to simulate how the buttons will react when pressed, but doesn't do anything besides change color currently.
<br>-My next step is to deciede how the data will be stored / exported. I might try to store it all in a database and create a interface to view the inspections or maybe just have the application export the data to a csv that can be imported into a speadsheet.

## V 0.2
-I have created Java classes for the inspection, boxes and frames with methods to set and get all parts of the inspection.
<br>-Currently the program does not store the data in any way, just takes in data then prints it out nicely formatted.
<br>-The next thing I'm working on is probably writting the data to a file.

## V 0.2.1
-I have started working on creating the Dao. the current code uploaded does not connect to the local database I set up, still trying to get this code to work.

## V 0.2.2
-I have successfully connected to the the datbase with my Dao code. I was missing a postgresql dependency. Some of the dao methods work, but almost every option in the CLI app crashes at some point because of a springframework exception. Currently working on fixing these bugs.

