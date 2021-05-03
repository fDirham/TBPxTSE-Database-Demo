/*
When users click on new note, the right side of the screen displays the create note form
*/
function viewCreateNote ()
{
    var contentContainer = document.getElementById( "content-container" )
    var createTitle = document.getElementById( "create-title" )

    if ( !!createTitle ) return

    contentContainer.innerHTML = '' +
        '<h1 id="create-title">Create Note</h1>' +
        '<form id="create-form"">' +
        '<label>Title</label>' +
        '<input type="text" id="new-title"></input><br><br>' +
        '<label>Author</label>' +
        '<input type="text" id="new-author"></input><br><br>' +
        '<label>Content</label>' +
        '<textarea id="new-content"></textarea><br><br>' +
        '<button type="button" onclick="createNewNote()">submit</button>' +
        '</form>'
}

/*
After a successful creation of a note, the form resets
*/
function resetCreateNoteForm ()
{
    document.getElementById( "new-title" ).value = ""
    document.getElementById( "new-author" ).value = ""
    document.getElementById( "new-content" ).value = ""
}


/*
When users click on a note from the list, the right side of the screen displays the note's content
*/
async function viewSingleNote ( id )
{
    var contentContainer = document.getElementById( "content-container" )
    contentContainer.innerText = 'Loading note with id: "' + id + '"...'

    /*Not really needed, we can get data from the onSnapshot listener directly.
    This is just for practice.
    */
    const note = await getNote( id )
    if ( !note )
    {
        contentContainer.innerText = "Note not found"
        return
    }

    contentContainer.innerHTML = '' +
        '<h1 id="note-title">' + note.title + '</h1>' +
        '<p id="note-author"> by: ' + note.author + '</p>' +
        '<p id="note-date"> created at: ' + formatNoteDate( note.created_at ) + '</p>' +
        '<div id="note-content">' + note.content + '</div> <br><br>' +
        '<button type="button" onclick="deleteNote(\'' + id + '\')">delete</button> <br><br>' +
        '<p id="note-likes">likes: ' + note.likes + '</p>' +
        '<button type="button" onclick="likeNote(\'' + id + '\')">like</button>'
}

/*
When a user likes a note, we need to update the note's page since it does not listen to document changes
*/
function incrementNoteLikes ()
{
    var noteLikes = document.getElementById( "note-likes" )
    const newLikes = parseInt( noteLikes.innerHTML.substr( 6 ) ) + 1
    noteLikes.innerText = "likes: " + newLikes
}

/*
Given an array of note documents render the notes list on the left
*/
function renderNotesList ( noteDocs )
{
    var notesList = document.getElementById( "notes-list" )
    let noteListHTML = ""
    noteDocs.forEach( note =>
    {
        let noteBlockHTML = '' +
            '<div class="note-block" onclick="viewSingleNote(\'' + note.id + '\')">' +
            '<p class="block-title">' + note.title + '</p>' +
            '<p class="block-author"> by: ' + note.author + '</p>' +
            '<p class="block-likes"> likes: ' + note.likes + '</p>' +
            '<p class="block-date">' + formatNoteDate( note.created_at ) + '</p>' +
            '</div>'
        noteListHTML += noteBlockHTML
    } );

    if ( !noteDocs.length ) noteListHTML = "<p>No notes yet...</p>"
    notesList.innerHTML = noteListHTML
    var loading = document.getElementById( "notes-list-loading" )
    if ( !!loading ) loading.remove()
}


/*
Resets the notes list, currently not used
*/
function resetNotesList ()
{
    var notesList = document.getElementById( "notes-list" )
    notesList.innerHTML = ''
    var loading = document.getElementById( "notes-list-loading" )
    if ( !loading )
    {
        var loading = document.createElement( "p" )
        loading.id = "notes-list-loading"
        loading.innerText = "Loading..."
        document.getElementById( "notes-list-container" ).appendChild( loading )
    }
}

/*
Formats a firestore timestamp
*/
function formatNoteDate ( timestamp )
{
    // Use the timestamp's toDate function to get a JS date object
    const date = timestamp.toDate()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    if ( hour < 10 ) hour = "0" + hour
    if ( minutes < 10 ) minutes = "0" + minutes

    return month + "/" + day + "/" + year + " - " + hour + ":" + minutes
}

// Initialize page to create note on first render
viewCreateNote()

