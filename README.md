## Introduction
This web app was created for aspiring web developers to learn the basics of manipulating data in a NoSQL document collection database. You will fill in the blanks to implement functions in "controller.js" by following the comments written.

This web app serves as a simple single page note taking app. Users can create notes by filling in a title, author, and content. 
All created notes are shown as a list on the left side of the screen. Users can like or delete notes and sort notes in the list by date or likes.

This was created for the UCSD TSExTBP Databases Workshop on May 2021. Check out the "solutions" branch to see finished and filled in code.

### We assume that you:
1. Have basic understanding of Javascript or are willing to learn. 
2. Understand the basics of document collection databases. 

## What you will learn
1. How to create a firebase project and connect it to your web app, along with firebase's firestore database service.
2. How to create documents in a collection
3. How to check for existing documents with the same fields before creating a document
4. How to listen for changes in a collection and return the results
5. How to delete and update a document
6. How to sort the results of listening to changes in a collection

## Getting started
Simply open index.html on a web browser.


## Note schema
Although firestore's documents do not have to follow a rigid schema, the front end for this demo will only work if note documents are within the "notes" collection and have the following fields:
* title: string,
* author: string,
* content: string,
* likes: int,
* created_at: firestore timestamp

## Firestore Documentation
* [add data](https://firebase.google.com/docs/firestore/manage-data/add-data)
* [delete data](https://firebase.google.com/docs/firestore/manage-data/delete-data)
* [get data](https://firebase.google.com/docs/firestore/query-data/get-data)
* [listen to real time updates](https://firebase.google.com/docs/firestore/query-data/listen)