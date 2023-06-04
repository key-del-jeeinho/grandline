import moment = require("moment")

export const startAtFormat = (startAt: string) => moment(startAt, START_AT_FORMAT)
export const START_AT_FORMAT = 'YYYY.MM.DD'