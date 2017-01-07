/**
 * Created by derekvincent on 2017-01-03.
 */
'use strict';



module.exports = TimePeriod;

/**
 * Constructor for the duration time via a formatted string HH:MM:ss.ss
 * @param {string} time
 */
function TimePeriod(time) {

    // need to check if set
    // if not then default to 00:00:00.0
    this.setTime(time);
}

/**
 * Set the duration time via a formatted string HH:MM:ss.s
 * @method setTime
 * @param {string} time
 */
TimePeriod.prototype.setTime = function(time) {

    var nInternalTime = convertToRaw(time);
    this.rawTime =  nInternalTime;

};
/**
 * Gets the time duration in the string formatted value
 * @return {string} formmated value
 */
TimePeriod.prototype.getTime = function() {

    return convertToFormat(this.rawTime);
};

/**
 * Adds the passed in value (formatted duration string) and returns the raw duration. It does not affect the internal
 * storage of the time duration.
 * @param {string} time
 * @return {number} sum
 */
TimePeriod.prototype.addTime = function(time) {

    // Not sure if we want to just calculate the add or to store it
    var inTime = convertToRaw(time);
    var totalTime = this.rawTime + inTime;
    return totalTime;
};

/**
 *
 * @param time
 * @return {number}
 */
TimePeriod.prototype.diffTimeRaw = function(time) {
    var inTime = convertToRaw(time);
    var totalDifference = this.rawTime - inTime;
    return totalDifference;
};

// This Function might not stay or maybe usefull in the sorter
TimePeriod.prototype.getRawtime = function() {
    return this.rawTime;
};

var convertToRaw = function(time) {

    // should be checking for valid format before starting
    // regx would be fine
    var aTimeBreakdown = time.split(":");
    var sHour,
        sMinute,
        sSecond,
        nInternalTime;
    if (aTimeBreakdown.length  > 2) {
        sHour = aTimeBreakdown[0];
        sMinute = aTimeBreakdown[1];
        sSecond = aTimeBreakdown[2];
    } else if (aTimeBreakdown.length = 2 ) {
        sHour = '00';
        sMinute = aTimeBreakdown[1];
        sSecond = aTimeBreakdown[2];

    }
    nInternalTime = (Number(sHour) * 3600) + (Number(sMinute) * 60) + Number(sSecond);
    return nInternalTime;
};

var convertToFormat = function(rawTime) {

    var sHours,
        sMinutes,
        sSeconds;

    sHours = Math.floor(rawTime /  3600);
    rawTime %= 3600;
    sMinutes = Math.floor(rawTime  / 60);
    sSeconds = rawTime % 60;

    console.log("Raw Time: " + rawTime + " Converted Time: " + padTimeSegment(sHours) + ":" + padTimeSegment(sMinutes) + ":" + padTimeSegment(sSeconds));
    return padTimeSegment(sHours) + ":" + padTimeSegment(sMinutes) + ":" + padTimeSegment(sSeconds);
};

var padTimeSegment = function(timeSegment) {

    // This is very specific to the time segment if the field is less
    // then 1 character long it will add a 0 to left side.
    var wholeSegment = timeSegment.toString().split('.')[0];
    return wholeSegment.length === 1 ? "0" + timeSegment : timeSegment;

};