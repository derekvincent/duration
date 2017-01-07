'use strict';

var expect = require('chai').expect;
var TimePeriod = require('../index');

describe('EventTime', function(){
    describe('Simple format 00:00:00 return Internal Format', function() {

        it('should take one second', function() {
            var result = new TimePeriod("00:00:01");
            expect(result.getRawtime()).to.equal(1);
        });

        it('should take ten seconds', function() {
            var result = new TimePeriod("00:00:10");
            expect(result.getRawtime()).to.equal(10);
        });

        it('should take ten seconds and 1 tenths of a second', function() {
            var result = new TimePeriod("00:00:10.1");
            expect(result.getRawtime()).to.equal(10.1);
        });

        it('should take one minute', function() {
            var result = new TimePeriod("00:01:00");
            expect(result.getRawtime()).to.equal(60);
        });

        it('should take ten minutes', function() {
            var result = new TimePeriod("00:10:00");
            expect(result.getRawtime()).to.equal(600);
        });

        it('should take one minute and 10 second', function() {
            var result = new TimePeriod("00:01:10");
            expect(result.getRawtime()).to.equal(70);
        });

        it('should take ten minutes and 30 seconds', function() {
            var result = new TimePeriod("00:10:30");
            expect(result.getRawtime()).to.equal(630);
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

        it('should take one seconds and one hunderth of a second', function() {
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
    describe('Adding Time', function() {
        it('should take ten minutes and add 30 minutes Return raw', function() {
            var timePeriodToken = new TimePeriod("00:10:00");
            var result =  timePeriodToken.addTime(("0:30:00"));
            expect(result).to.equal(2400);
        });

        it('should take ten minutes and add 30 minutes Return formatted', function() {
            var timePeriodToken = new TimePeriod("00:10:00");
            var result =  timePeriodToken.addTime(("0:30:00"));
            expect(result).to.equal(2400);
        });
    })
});
