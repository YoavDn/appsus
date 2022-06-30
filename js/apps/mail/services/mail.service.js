
import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'




const MAIL_KEY = 'mailsDB'
const TRASH_KEY = 'trash'
_createMails()

export const mailService = {
    query,
    addMail,
    getMailById,
    updateMail,
    moveToTrash,
    filterByActiveList,
    suggest
}

function query() {
    return storageService.query(MAIL_KEY)
}

function _queryTrash() {
    return storageService.query(TRASH_KEY)
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {

        mails = fetch("js/demo-data/demo-mails.json").then(res => res.json())
            .then(res => utilService.saveToStorage(MAIL_KEY, res))
    }
    return mails
}

function addMail(mail) {
    mail.sentAt = Date.now()
    console.log(mail);
    return storageService.post(MAIL_KEY, mail,)
}

function getMailById(id) {
    console.log(id);
    return storageService.get(MAIL_KEY, id)
}

function updateMail(mail) {
    storageService.put(MAIL_KEY, mail)
}

function moveToTrash(mail) {
    storageService.post(TRASH_KEY, mail)
    return storageService.remove(MAIL_KEY, mail)

}

function filterByActiveList(actvieList, mails) {
    if (actvieList === 'starred') {
        return mails.filter(mail => mail.isStar)
    } else if (actvieList === 'trash') {
        return utilService.loadFromStorage(TRASH_KEY)
    } else if (actvieList === 'sent') {
        return mails.filter(mail => mail.sent)
    } else if (actvieList === 'sent') {
        return mails.filter(mail => mail.sent)
    }

    return mails.filter(mail => !mail.sent)
}


function suggest(query, mails) {
    const regex = new RegExp(query, "i");
    return mails.filter(mail => regex.test(mail.subject) || regex.test(mail.from))
}