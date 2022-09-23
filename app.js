//@ts-check

const birthday = new Date('2022-05-07')
const age = document.getElementById('age')

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

    return result.slice(0, -2)
};

function setAge() {
    age.innerText = formatAge(birthday, new Date(), 2) 
}
setAge()