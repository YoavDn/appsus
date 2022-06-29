
import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'




const MAIL_KEY = 'mailsDB'
_createMails()

export const mailService = {
    query,
}

function query() {
    return storageService.query(MAIL_KEY)
}


function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {

        mails = fetch("js/demo-data/demo-mails.json").then(res => res.json())
            .then(res => {
                console.log(res);
                return utilService.saveToStorage(MAIL_KEY, res)
            })
    }

    return mails
}



