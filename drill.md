## Exercise Guide 

Try to implement all of the step in code without looking at the solution but if stuck for more than 10 minutes on 1 step then peak at the solution complete the script and repeat as many times as you like

Challenge: Try to complete the app under a certain time limit like a time attack: start with 15 minutes

1. Install `archiver` into project

2. Import archiver, path, and fs into file 

3. Make variables to hold the file path to the txt and image file on the filesystem 

4. Make a variable to track the total number of bytes from both files to be zipped up 

5. Read both file's statistics and add the files size to the variable to hold byte number 

  b. Log the total number of bytes for all files in last file to the console

6. Make a variable to hold value for zlib compression level

7. Make a path for the new zip file to br written on the file system and name the zip file with the right file extension

8. Create a write strea for the new zip file

9. Create an archive variable that use archiver object that creates a zip file with an objects opbject with zlib key with an object as its value with a level key with zlib compression as its value

10. Listen on write stream for the `close` event to be emitted and run a callback that logs the total bytes to console using archive variable from dtep 9 and log archiving is done

11. Listen on archive object for `error` event to be emitted then run a callback with error as a parameter and throw the error

12. Pipe the write stream to the archiver object

13. Add the read streams of the file paths for the text and image files in the file system and append them to archiver object with a new name

14. Finalize the archiving process (end zipping) using the archiver module's `finalize` method