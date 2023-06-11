import moment = require("moment")

export function momentToJson(moment: moment.Moment) {
    return moment.format(MOMENT_FORMAT)
}
export function jsonToMoment(json: string) {
    return moment(json, MOMENT_FORMAT)
}
const MOMENT_FORMAT = 'YYYY.MM.DD'