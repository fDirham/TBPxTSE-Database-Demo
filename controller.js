/*
TODO: Adds a new note into the "notes" collection in firestore.

Check the notes schema on the readme for fields the document should have.
You should initialize likes to 0 and created_at to the current server time in firestore.

Before adding a document, you should check whether a note in the collection has the same
title. If it does, do not create and alert the user.

Function is called when users click on the submit button
*/
async function createNewNote ()
{
    // Get data from form
    const newTitle = document.getElementById( "new-title" ).value
    const newAuthor = document.getElementById( "new-author" ).value
    const newContent = document.getElementById( "new-content" ).value

    if ( !newTitle || !newAuthor || !newContent ) return alert( "Missing fields" )

    try
    {
        // TODO: Check if document with title exists, replace false below with the result of this check
        if ( false )
        {
            alert( "Note with title already exists" )
            return
        }

        // TODO: Add document to collection

        // Reset form
        resetCreateNoteForm()
        alert( "Note created" )
    }
    catch ( error )
    {
        alert( "Error creating note, check console" )
        console.log( error )
    }
}

/*
TODO: Get a note from notes collection using id

Use a note's document id to get it from the database, it should be in the "notes" collection.
return: the document's data in json.

Function is called by viewSingleNote()
*/
async function getNote ( id )
{
    try
    {
        // Get note document from notes collection
        return /*Note document's data*/
    }
    catch ( error )
    {
        alert( "Error getting note, check console" )
        console.log( error )
    }
}

/*
TODO: Delete a note with the id given. 

Function is called when users click on delete in a note page.
*/
async function deleteNote ( id )
{
    try
    {
        // TODO: Delete note from notes collection

        // Move away from note view
        viewCreateNote()
        alert( "Note deleted :(" )
    }
    catch ( error )
    {
        alert( "Error deleting note, check console" )
        console.log( error )
    }
}

/*
TODO: Update the "likes" field of a note document by 1. 
This is possible without getting the document's entire data.

Function is called when users like a note.
*/
async function likeNote ( id )
{
    try
    {
        // TODO: Increment note likes

        // Update front end likes
        incrementNoteLikes()
    }
    catch ( error )
    {
        alert( "Error liking note, check console" )
        console.log( error )
    }
}

// This variable will store the "notes" collection listener. Value is set by next two functions
var notesListener = null;

/*
TODO: Set a notes listener sorted by created_at desc

If notesListener is not null, unsubscribe from listening to collection changes by calling notesListener().

Set notesListener to a new listener that returns documents in the "notes" collection in real time.
The documents should be ordered by "created_at" and descending so the newest documents are returned first.

Within the listener, when a document changes this function should:
1. Fill in an array with data from each document returned by the listener. 
The array's element should contain...
    - All data from the document
    - An id field with the document's id
2. Call renderNotesList with the array as it's argument.

Function is called when users click on "sort created at"
*/

function sortByCreatedAt ()
{
    // TODO: Unsubscribe from listener if it exists
    // TODO: Set notes listener and render new notesList
    var noteDocs = []
    renderNotesList( noteDocs )
}

/*
TODO: Set a notes listener sorted by likes desc

If notesListener is not null, unsubscribe from listening to collection changes by calling notesListener().

Set notesListener to a new listener that returns documents in the "notes" collection in real time.
The documents should be ordered by "likes" and descending so the most liked documents are returned first.

Within the listener, when a document changes this function should:
1. Fill in an array with data from each document returned by the listener. 
The array's element should contain...
    - All data from the document
    - An id field with the document's id
2. Call renderNotesList with the array as it's argument.

Function is called when users click on "sort likes"
*/

function sortByLikes ()
{
    // TODO: Unsubscribe from listener if it exists
    // TODO: Set notes listener and render new notesList
    var noteDocs = []
    renderNotesList( noteDocs )
}

/*
TODO: Delete renderNotesList and uncomment one of the functions after implementing the two functions above
*/

renderNotesList( [] )
//sortByCreatedAt()
//sortByLikes()