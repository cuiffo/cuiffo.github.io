class Countdown {

  start() {
    if (this.started) {
      console.log('started already');
      return;
    }
    this.started = true;
    let endDate = new Date(2016, 9, 16, 17);

    let secondsEl = document.getElementsByClassName('seconds-count')[0];
    let minutesEl = document.getElementsByClassName('minutes-count')[0];
    let hoursEl = document.getElementsByClassName('hours-count')[0];
    let daysEl = document.getElementsByClassName('days-count')[0];

    let currentSeconds = parseInt(secondsEl.innerText);
    let currentMinutes = parseInt(minutesEl.innerText);
    let currentHours = parseInt(hoursEl.innerText);
    let currentDays = parseInt(daysEl.innerText);

    let MILLISECONDS_IN_SECOND = 1000;
    let MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60;
    let MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;
    let MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;
    window.setInterval(() => {
      let now = new Date();
      if (endDate.getTime() > now.getTime()) {
        let difference = endDate.getTime() - now.getTime();
        let days = Math.floor(difference/MILLISECONDS_IN_DAY);
        difference -= days*MILLISECONDS_IN_DAY;
        let hours = Math.floor(difference/MILLISECONDS_IN_HOUR);
        difference -= hours*MILLISECONDS_IN_HOUR;
        let minutes = Math.floor(difference/MILLISECONDS_IN_MINUTE);
        difference -= minutes*MILLISECONDS_IN_MINUTE;
        let seconds = Math.floor(difference/MILLISECONDS_IN_SECOND);
        
        if (currentDays !== days) {
          currentDays = days;
          daysEl.innerText = days;
        }
        if (currentHours !== hours) {
          currentHours = hours;
          hoursEl.innerText = hours;
        }
        if (currentMinutes !== minutes) {
          currentMinutes = minutes;
          minutesEl.innerText = minutes;
        }
        if (currentSeconds !== seconds) {
          currentSeconds = seconds;
          secondsEl.innerText = seconds;
        }
      }

      // TODO: Handle case when difference is negative. set everything to 0.
    }, 250);
  }
}

var __instance__ = new Countdown();
module.exports = {
  getInstance: () => __instance__
};
