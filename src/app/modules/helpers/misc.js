import moment from 'moment'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export const ToolTipLabel = ({ label, tooltip, className }) => {
    return (
        <OverlayTrigger placement='top' overlay={<Tooltip>{tooltip}</Tooltip>}>
            {({ ref, ...triggerHandler }) => (
                <label {...triggerHandler} className={`form-label ${className}`}>
                    <span className='me-1'>{label}</span>
                    <i ref={ref} className='fas fa-info-circle fs-6'></i>
                </label>
            )}
        </OverlayTrigger>
    )
}
export const OnlyTooltip = ({ tooltip, className }) => {
    return (
        <OverlayTrigger placement='top' overlay={<Tooltip>{tooltip}</Tooltip>}>
            <span className={className}>
                <i className='fas fa-info-circle fs-6'></i>
            </span>
        </OverlayTrigger>
    )
}
export const TooltipComponent = ({ tooltip, children }) => {
    return (
        <OverlayTrigger placement='top' overlay={<Tooltip>{tooltip}</Tooltip>}>
            {children}
        </OverlayTrigger>
    )
}
export const findUnique = (arr, predicate) => {
    var found = {}
    arr.forEach((d) => {
        found[predicate(d)] = d
    })
    return Object.keys(found).map((key) => found[key])
}

export const dateReadable = (date) => {
    return moment(date).format('MM/DD/YY HH:mm:ss')
}

export const dateUnixReadable = (date) => {
    return moment.unix(date).format('DD/MM/YY HH:mm:ss')
}

export const unique = (a) => [...new Set(a)]
export const uniqueBy = (x, f) => Object.values(x.reduce((a, b) => ((a[f(b)] = b), a), {}))
export const intersection = (a, b) => a.filter((v) => b.includes(v))
export const diff = (a, b) => a.filter((v) => !b.includes(v))
export const symDiff = (a, b) => diff(a, b).concat(diff(b, a))
export const union = (a, b) => diff(a, b).concat(b)
export const intersectionBy = (a, b, f) => a.filter((v) => b.some((u) => f(v, u)))

export function arrDiff(a1, a2) {
    // console.log(a1, a2)
    var a = [],
        diff = []

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]]
        } else {
            a[a2[i]] = true
        }
    }

    for (var k in a) {
        diff.push(k)
    }

    return diff
}

export const linkify = (str = '') => {
    str = str.replace(/^\s+|\s+$/g, '') // trim
    str = str.toLowerCase()

    var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
    var to = 'aaaaaeeeeeiiiiooooouuuunc------'
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

    return str
}

export function kFormatter(num) {
    return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
        : Math.sign(num) * Math.abs(num)
}

export function numberWithCommas(x, hideSign) {
    // return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    if (hideSign) {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(Number(x))
    } else {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'BDT',
            currencyDisplay: 'narrowSymbol',
            maximumFractionDigits: 0,
        }).format(Number(x))
    }
}

export const reactSelectify = (list = [], key) => {
    if (Array.isArray(list)) {
        let newList = []
        for (let i = 0; i < list.length; i++) {
            newList.push({
                ...list[i],
                label: list[i][key],
                value: list[i][key],
            })
        }

        return newList
    } else {
        return []
    }
}

export const setLocal = (data, name) => {
    if (!localStorage) {
        return
    }

    try {
        const lsValue = typeof data === 'object' ? JSON.stringify(data) : data
        localStorage.setItem(name, lsValue)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
    }
}
export const getLocal = (name) => {
    if (!localStorage) {
        return
    }

    const lsValue = localStorage.getItem(name)
    if (!lsValue) {
        return
    }

    try {
        const auth = JSON.parse(lsValue)
        if (auth) {
            return auth
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
    }
}

export const deleteLocal = (name) => {
    if (!localStorage) {
        return
    }

    try {
        localStorage.removeItem(name)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
    }
}
