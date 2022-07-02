
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
    if (actvieList === 'inbox') return mails.filter(mail => !mail.sent && !mail.trash)
    return mails.filter(mail => mail[actvieList])
}


function suggest(filterBy, mails) {
    const lastWeek = utilService.getLastWeeksDate()
    const regex = new RegExp(filterBy.query, "i");


    if (filterBy.lastWeek && filterBy.isSent) {
        const filteredMails = mails.filter(mail => {
            return mail.sent && mail.sentAt > lastWeek
        })
        return filteredMails.filter(mail => {
            return regex.test(mail.subject) || regex.test(mail.from)
        })
    }

    if (filterBy.isSent && !filterBy.lastWeek) {
        const sentMails = mails.filter(mail => mail.sent)
        console.log(sentMails)
        return sentMails.filter(mail => {
            return regex.test(mail.subject) || regex.test(mail.from)
        })
    }

    if (filterBy.lastWeek && !filterBy.isSent) {
        const lastWeekMails = mails.filter(mail => mail.sentAt > lastWeek)
        console.log(lastWeekMails);
        return lastWeekMails.filter(mail => {
            return regex.test(mail.subject) || regex.test(mail.from)
        })
    }


    return mails.filter(mail => regex.test(mail.subject) || regex.test(mail.from))
}