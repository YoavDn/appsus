
import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'




const MAIL_KEY = 'mailsDB'
_createMails()

export const mailService = {
    query,
    addMail,
    getMailById,
    updateMail,
    filterByActiveList,
    suggest,
    clearTrash,
}

function query() {
    return storageService.query(MAIL_KEY)
}




function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = fetch("js/demo-data/demo-mails.json").then(res => res.json())
            .then(res => utilService.saveToStorage(MAIL_KEY, res))
    }
    return mails
}

function clearTrash() {
    const mails = query().then(mails => {
        const newMails = mails.filter(mail => !mail.trash)
        utilService.saveToStorage(MAIL_KEY, newMails)
        return mails
    })
    return mails
}

function addMail(mail) {
    mail.sentAt = Date.now()
    return storageService.post(MAIL_KEY, mail,)
}

function getMailById(id) {
    return storageService.get(MAIL_KEY, id)
}

function updateMail(mail) {
    storageService.put(MAIL_KEY, mail)
}


function filterByActiveList(actvieList, mails) {
    if (actvieList === 'starred') {
        return mails.filter(mail => mail.isStar)
    } else if (actvieList === 'trash') {
        return mails.filter(mail => mail.trash)
    } else if (actvieList === 'sent') {
        return mails.filter(mail => mail.sent)
    } else if (actvieList === 'sent') {
        return mails.filter(mail => mail.sent)
    }
    return mails.filter(mail => !mail.sent && !mail.trash)
}


function suggest(query, mails) {
    const regex = new RegExp(query, "i");
    return mails.filter(mail => regex.test(mail.subject) || regex.test(mail.from))
}