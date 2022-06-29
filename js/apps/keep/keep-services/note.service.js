import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js';

const NOTES_KEY = 'notesDB'
_createNotes()

export const notesService = {

}

function query(){
    return storageService.query(NOTES_KEY)
}