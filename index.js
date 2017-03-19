/**
 * Created by derekvincent on 2017-01-03.
 */
'use strict';



module.exports = Duration;

// Set the Millisecond precision of decimal points. Default to 2.
var nPrecision = 1;

/**
 * Constructor for the duration time via a formatted string HH:MM:ss.ss
 * @param {string} time
 */
function Duration(time, endTime) {

    if (time === undefined) {
        // If time is not defined then assume an empty object and the time 00:00:00
        this.setTime("00:00:00");
    }
     else if (endTime === undefined) {
        // If only time is set the assume we are looking a duration and set it
        this.setTime(time);
    } else if (time !== undefined && endTime !== undefined) {
        // If both time and endTime are entered the assume we need to calutlate the duration a difference of the two
        this.setDurationFromStartEndTimes(time, endTime);
    } else {
        //Throw and error of some sort!
    }


}



/**
 * Set the duration time via a formatted string HH:MM:ss.s
 * @method setTime
 * @param {string} time
 */
Duration.prototype.setTime = function(time) {

    var nInternalTime = convertToRaw(time);
    this.rawTime =  nInternalTime;

};
/**
 * Gets the time duration in the string formatted value
 * @return {string} formmated value
 */
Duration.prototype.getTime = function() {

    return convertToFormat(this.rawTime);
};

/**
 * Adds the passed in value (formatted duration string) and returns the raw duration. It does not affect the internal
 * storage of the time duration.
 * @param {string} time
 * @return {number} sum
 */
Duration.prototype.addTime = function(time) {

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
Duration.prototype.diffTimeRaw = function(time) {
    var inTime = convertToRaw(time);
    var totalDifference = this.rawTime - inTime;
    return totalDifference;
};

// This Function might not stay or maybe usefull in the sorter
Duration.prototype.getRawTime = function() {
    return this.rawTime;
};

/**
 * Takes the start and end time (in HH:MM:ss.mmm format) and stores the duration between them.
 * If the end time is less then the start time then 12 hours is added to take of the AM/PM issue on the
 * same day. It does not handle roll over on days.
 * @param {string} startTime
 * @param {string} endTime
 *
 */
Duration.prototype.setDurationFromStartEndTimes = function(startTime, endTime) {
    var nStartTimeRaw = convertToRaw(startTime),
        nEndTimeRaw = convertToRaw(endTime),
        nDuration = 0;

    if ( nStartTimeRaw > nEndTimeRaw ) {
        nEndTimeRaw += 43200000;
    }
    this.rawTime = nEndTimeRaw - nStartTimeRaw;
    console.log("Start Time: " + startTime + " Raw: " + nStartTimeRaw + " End Time: " + endTime + " Raw: " + nEndTimeRaw
        + " Duration: " + this.getTime() + " Raw Duration: " + this.getRawTime());

};

Duration.prototype.setPercision = function(nNumber) {
    if (nNumber < 4) {
        nPrecision = nNumber;
    }
};

Duration.prototype.getPercision = function(){
    return nPrecision;
}

var convertToRaw = function(time) {

    //TODO: should be checking for valid format before starting - regx would be fine
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
    var nHours = Number(sHour) * 3600 * 1000;
    var nMinutes = Number(sMinute) * 60 * 1000;
    var nSeconds = Number(sSecond) * 1000;
    nInternalTime = nHours + nMinutes + nSeconds;

    return parseFloat(nInternalTime);
};

var convertToFormat = function(rawTime) {

    var time = new Date(rawTime);
    var timeString =  padTime(time.getUTCHours()) + ":"
                    + padTime(time.getUTCMinutes()) + ":"
                    + padTime(time.getUTCSeconds())
                    + formatMilli(time.getUTCMilliseconds());
    return timeString;
};

var padTime = function(timeSegment) {

    if (timeSegment < 10) {
        return "0" + timeSegment;
    }
    return timeSegment

};

var formatMilli = function(milliseconds) {

    return parseFloat((milliseconds/1000).toFixed(nPrecision)).toString().slice(1, (nPrecision +2));
}