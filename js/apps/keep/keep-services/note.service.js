import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js';

const NOTES_KEY = 'notesDB'
const PINNED_KEY = 'pinnedDB'
_createNotes()

export const notesService = {
    query,
    get,
    addNote,
    update,
    removeFromRegularList,
    queryPins,
    addToPins,
    removeFromPinnedList
}

function query(){
    return storageService.query(NOTES_KEY)
}
function queryPins() {
    return storageService.query(PINNED_KEY)
}

function _createNotes() {
    let notes 
    query().then((res)=> {
        notes = res
        if (!notes || !notes.length) {
            let exampleNote1, exampleNote2
            exampleNote1 = {
                type: "note-text",
                isPinned: false, 
                info: {
                    title: 'Hello World!',
                    txt: 'Here is a paragraph'
                },
                isEditAble: false,
                style: {
                    backgroundColor: '#fff',
                } 
            }
            
            
             exampleNote2 = {

                type: "note-todos",
                isPinned: false, 
                info: {
                    title: 'Hello Todo!',
                    todos: [
                        {txt:'Go to supermarket', isDone: false},
                        {txt:'Go to the gym', isDone: false},
                    ]
                },
                isEditAble: false,
                style: {
                    backgroundColor: '#fff',
                } 
            }
            storageService.post(NOTES_KEY, exampleNote2 )
                .then(() => {
                 storageService.post(NOTES_KEY, exampleNote1 )

                })
        }
    })
    console.log('notes = ', notes)

}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function update(note) {
    if (!note.isPinned) {
        return storageService.put(NOTES_KEY, note)
    } else if (note.isPinned) {
        return storageService.put(PINNED_KEY, note)
    }
}

function removeFromRegularList(noteId) {

        return storageService.remove(NOTES_KEY, noteId)

}

function removeFromPinnedList(noteId) {

        return storageService.remove(PINNED_KEY, noteId)

}

function addNote(note) {
    const newNote = {
        type: note.type,
        isPinned: note.isPinned,
        info: note.info,
        style: note.style,
        isEditAble: false,
    }

    return storageService.post(NOTES_KEY, newNote)
}

function addToPins(note) {
    return storageService.post(PINNED_KEY, note)
}