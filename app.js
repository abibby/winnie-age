//@ts-check

const birthday = new Date('2022-05-07')
const age = document.getElementById('age')

const millisecond = 1
const second = millisecond * 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
const week = day * 7
const month = day * 30
const year = day * 365

function formatDuration(ms, sigFigs) {
    if (ms < 0) ms = -ms;

    const time = [
        ['year', year],
        // ['month', month],
        ['week', week],
        ['day', day],
        ['hour', hour],
        ['minute', minute],
        ['second', second],
        ['millisecond', millisecond]
    ];
    
    let current = ms
    let result = ''

    let lastDuration = Number.MAX_SAFE_INTEGER
    
    let count = 0

    for (const [name, duration] of time) {
        count++
        const floor = Math.floor((current / duration) % lastDuration)
        if (duration <= current) {
            const s = floor !== 1 ? 's' : ''
            result += `${floor} ${name}${s}, `
        }
        current = current - (floor * duration)

        if (count > sigFigs) {
            break
        }
    }

    return result.slice(0, -2)
};

/**
 * 
 * @param {Date} date 
 * @returns number
 */
function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * 
 * @param {Date} date 
 * @returns number
 */
function getMonths(date) {
    return (date.getFullYear() * 12 + date.getMonth() + (date.getDate() / getDaysInMonth(date)))
}

/**
 * 
 * @param {Date} start
 * @param {Date} end
 * @param {number} sigFigs
 * @returns {string}
 */
function formatAge(start, end, sigFigs) {
    const totalMonths = getMonths(end) - getMonths(start)
    const years = Math.floor(totalMonths / 12)
    const months = Math.floor(totalMonths) % 12
    const totalDays = Math.floor(totalMonths % 1 * getDaysInMonth(end))
    const weeks = Math.floor(totalDays / 7)
    const days = totalDays - weeks * 7
    
    const time = [
        ['year', years],
        ['month', months],
        ['week', weeks],
        ['day', days],
    ];
    let result = ''
    let count = 0
    for (const [name, duration] of time) {
        if (duration > 0) {
            count++
            const s = duration !== 1 ? 's' : ''
            result += `${duration} ${name}${s}, `

        }
        if (count >= sigFigs) {
            break
        }
    }

    return result
};

function setAge() {
    // age.innerText = formatDuration(Date.now() - birthday.getTime(), 2)
    age.innerText = formatAge(birthday, new Date(), 2)
}
setAge()