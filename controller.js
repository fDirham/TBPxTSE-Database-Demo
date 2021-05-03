/*
Adds a new note into the "notes" collection in firestore.
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
        // Check if document with title exists
        const existingNotes = await firebase.firestore().collection( "notes" ).where( "title", "==", newTitle ).get()
        if ( !existingNotes.empty )
        {
            alert( "Note with title already exists" )
            return
        }

        // Add document to collection
        const newNote = {
            title: newTitle,
            author: newAuthor,
            content: newContent,
            likes: 0,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        }

        await firebase.firestore().collection( "notes" ).add( newNote )

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
Use a note's document id to get it from the database, it should be in the "notes" collection.
return: the document's data in json.

Function is called by viewSingleNote()
*/
async function getNote ( id )
{
    try
    {
        const noteRes = await firebase.firestore().collection( "notes" ).doc( id ).get()
        return noteRes.data()
    }
    catch ( error )
    {
        alert( "Error getting note, check console" )
        console.log( error )
    }
}

/*
Delete a note with the id given. 

Function is called when users click on delete in a note page.
*/
async function deleteNote ( id )
{
    try
    {
        await firebase.firestore().collection( "notes" ).doc( id ).delete()

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
Update the "likes" field of a note document by 1. 
This is possible without getting the document's entire data.

Function is called when users like a note.
*/
async function likeNote ( id )
{
    try
    {
        await firebase.firestore().collection( "notes" ).doc( id ).update( { likes: firebase.firestore.FieldValue.increment( 1 ) } )
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
    if ( notesListener )
    {
        notesListener()
    }
    notesListener = firebase.firestore().collection( "notes" ).orderBy( "created_at", "desc" )
        .onSnapshot( ( querySnapshot ) =>
        {
            var noteDocs = []
            querySnapshot.forEach( doc =>
            {
                noteDocs.push( { id: doc.id, ...doc.data() } )
            } );
            renderNotesList( noteDocs )
        } );
}

/*
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
    if ( notesListener )
    {
        notesListener()
    }
    notesListener = firebase.firestore().collection( "notes" ).orderBy( "likes", "desc" )
        .onSnapshot( ( querySnapshot ) =>
        {
            var noteDocs = []
            querySnapshot.forEach( doc =>
            {
                noteDocs.push( { id: doc.id, ...doc.data() } )
            } );
            renderNotesList( noteDocs )
        } );
}

sortByCreatedAt()