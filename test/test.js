'use strict';

var expect = require('chai').expect;
var TimePeriod = require('../index');

describe('Duration', function(){
    describe('Simple format 00:00:00 return Internal Format', function() {

        it ('should take an empty constructor', function() {
            var result = new TimePeriod();
            expect(result.getRawTime()).to.equal(0);
        });

        it('should take one second', function() {
            var result = new TimePeriod("00:00:01");
            expect(result.getRawTime()).to.equal(1 * 1000);
        });

        it('should take ten seconds', function() {
            var result = new TimePeriod("00:00:10");
            expect(result.getRawTime()).to.equal(10 * 1000);
        });

        it('should take ten seconds and 1 tenths of a second', function() {
            var result = new TimePeriod("00:00:10.1");
            expect(result.getRawTime()).to.equal(10.1 * 1000);
        });

        it('should take one minute', function() {
            var result = new TimePeriod("00:01:00");cd
            expect(result.getRawTime()).to.equal(60 * 1000);
        });

        it('should take ten minutes', function() {
            var result = new TimePeriod("00:10:00");
            expect(result.getRawTime()).to.equal(600 * 1000);
        });

        it('should take one minute and 10 second', function() {
            var result = new TimePeriod("00:01:10");
            expect(result.getRawTime()).to.equal(70 * 1000);
        });

        it('should take ten minutes and 30 seconds', function() {
            var result = new TimePeriod("00:10:30");
            expect(result.getRawTime()).to.equal(630 * 1000);
        });

        it('should take one hour', function() {
            var result = new TimePeriod("01:00:00");
            expect(result.getRawTime()).to.equal(3600 * 1000);
        });

        it('should take one hour and ten minutes', function() {
            var result = new TimePeriod("01:10:00");
            expect(result.getRawTime()).to.equal(4200 * 1000);
        });

        it('should take one hour, ten minutes and ten seconds', function() {
            var result = new TimePeriod("01:10:10");
            expect(result.getRawTime()).to.equal(4210 * 1000);
        });
    });

    describe('Simple format 00:00:00 return Proper Format', function() {

        it('should take one tenth of a second', function() {
            var time = "00:00:00.1";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take one second', function() {
            var time = "00:00:01";
            var result = new TimePeriod(time);
            result.setPercision(2);
            expect(result.getTime()).to.equal(time);
        });

        it('should take ten seconds', function() {
            var time = "00:00:10";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take one seconds and 1 tenths of a second', function() {
            var time = "00:00:01.1";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take one seconds and one hundreth of a second', function() {
            var time = "00:00:01.01";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take ten seconds and 10 tenths of a second', function() {
            var time = "00:00:10.1";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take one minute', function() {
            var time = "00:01:00";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take ten minutes', function() {
            var time = "00:10:00";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take one minute and 10 second', function() {
            var time = "00:01:10";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take ten minutes and 30 seconds', function() {
            var time = "00:10:30";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take one hour ', function() {
            var time = "01:00:00";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take one hour and one minute', function() {
            var time = "01:01:00";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take one hour, one minutes and one second', function() {
            var time = "01:01:01";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take one hour and ten minutes', function() {
            var time = "01:10:00";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

        it('should take one hour, ten minutes and one second', function() {
            var time = "01:10:01";
            var result = new TimePeriod(time);
            expect(result.getTime()).to.equal(time);
        });

    });

    describe('Creation of duration using start and end times', function(){
        it('should start at 12:00:00 and finish at 12:00:01', function() {
           var result = new TimePeriod("12:00:00", "12:00:01");
           expect(result.getTime()).to.equal("00:00:01");
        });

        it('should start at 12:00:00 and finish at 12:01:01', function() {
            var result = new TimePeriod("12:00:00", "12:01:01");
            expect(result.getTime()).to.equal("00:01:01");
        });

        it('should start at 12:00:00 and finish at 12:10:10', function() {
            var result = new TimePeriod("12:00:00", "12:10:10");
            expect(result.getTime()).to.equal("00:10:10");
        });

        it('should start at 12:00:00 and finish at 12:10:10.5', function() {
            var result = new TimePeriod("12:00:00", "12:10:10.5");
            expect(result.getTime()).to.equal("00:10:10.5");
        });

        it('should start at 12:55:00 and finish at 1:10:10.5', function() {
            var result = new TimePeriod("12:55:00", "01:10:10.5");
            expect(result.getTime()).to.equal("00:15:10.5");
        });

        it('create an empty object and set the start at 11:55:00 and finish at 12:10:10.5', function() {
            var result = new TimePeriod();
            result.setDurationFromStartEndTimes("11:55:00", "12:10:10.5");
            expect(result.getTime()).to.equal("00:15:10.5");
        });
    });

    describe('Adding Time', function() {

        it('should take ten second and add two seconds', function() {
            var timePeriodToken = new TimePeriod("00:00:10");
            var result =  timePeriodToken.addTime(("0:00:02"));
            expect(result).to.equal(12 * 1000);
        });

        it('should take fifty seconds and add twelve seconds', function() {
            var timePeriodToken = new TimePeriod("00:00:50");
            var result =  timePeriodToken.addTime(("0:00:12"));
            expect(result).to.equal(62 * 1000);
        });

        it('should take ten minutes and add 30 minutes Return raw', function() {
            var timePeriodToken = new TimePeriod("00:10:00");
            var result =  timePeriodToken.addTime(("0:30:00"));
            expect(result).to.equal(2400 * 1000);
        });

        it('should take fifty minutes and add twleve minutes', function() {
            var timePeriodToken = new TimePeriod("00:50:00");
            var result =  timePeriodToken.addTime(("0:12:00"));
            expect(result).to.equal(3720 * 1000);
        });

        it('should take fifty minutes thirty seconds and add ten minutes', function() {
            var timePeriodToken = new TimePeriod("00:50:30");
            var result =  timePeriodToken.addTime(("0:10:00"));
            expect(result).to.equal(3630 * 1000);
        });

        it('should take one hour and add one second', function() {
            var timePeriodToken = new TimePeriod("01:00:00");
            var result =  timePeriodToken.addTime(("0:00:01"));
            expect(result).to.equal(3601 * 1000);
        });

        it('should take one hour and add one minute', function() {
            var timePeriodToken = new TimePeriod("01:00:00");
            var result =  timePeriodToken.addTime(("0:01:00"));
            expect(result).to.equal(3660 * 1000);
        });

        it('should take one hour and add 10 hours', function() {
            var timePeriodToken = new TimePeriod("01:00:00");
            var result =  timePeriodToken.addTime(("10:00:00"));
            expect(result).to.equal(39600 * 1000);
        });
    });
    describe('Difference Time', function() {
        it('should calculate the difference between 5 second and 4 seconds', function() {
            var timePeriodToken = new TimePeriod("00:00:05");
            var result = timePeriodToken.diffTimeRaw("00:00:05");
            expect(result).to.equal(0 * 1000);
        });

        it('should calculate the difference between 5 second and 4 seconds', function() {
            var timePeriodToken = new TimePeriod("00:00:05");
            var result = timePeriodToken.diffTimeRaw("00:00:04");
            expect(result).to.equal(1 * 1000);
        });

        it('should calculate the difference between 5 second and 4 seconds', function() {
            var timePeriodToken = new TimePeriod("00:00:05");
            var result = timePeriodToken.diffTimeRaw("00:00:04.1");
            expect(result).to.equal(0.9 * 1000);
        });
    });
});
