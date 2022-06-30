import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js';

const NOTES_KEY = 'notesDB'
_createNotes()

export const notesService = {
    query,
    get,
    addNote,
    update,
    remove
}

function query(){
    return storageService.query(NOTES_KEY)
}

function _createNotes() {
    let notes = query()

    if (!notes || !notes.length) {
        let exampleNote1, exampleNote2
        // storageService.post(NOTES_KEY, exampleNote1 )
        // storageService.post(NOTES_KEY, exampleNote2 )
    }
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function update(note) {
    storageService.put(NOTES_KEY, note)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function addNote(note) {
    const newNote = {
        type: note.type,
        isPinned: note.isPinned,
        info: note.info,
        style: note.style,
    }

    return storageService.post(NOTES_KEY, newNote)
}