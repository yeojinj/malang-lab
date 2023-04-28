import './Timer.css';
import { TweenLite, Expo} from 'gsap'


export default function Timer() {
  TweenLite.defaultEase = Expo.easeOut;

  initTimer('00:11'); // other ways --> "0:15" "03:5" "5:2"

  var reloadBtn = document.querySelector('.reload');
  var timerEl = document.querySelector('.timer');

  function initTimer(t) {
    var self = this,
      timerEl = document.querySelector('.timer'),
      minutesGroupEl = timerEl.querySelector('.minutes-group'),
      secondsGroupEl = timerEl.querySelector('.seconds-group'),
      minutesGroup = {
        firstNum: minutesGroupEl.querySelector('.first'),
        secondNum: minutesGroupEl.querySelector('.second'),
      },
      secondsGroup = {
        firstNum: secondsGroupEl.querySelector('.first'),
        secondNum: secondsGroupEl.querySelector('.second'),
      };

    var time = {
      min: t.split(':')[0],
      sec: t.split(':')[1],
    };

    var timeNumbers;

    function updateTimer() {
      var timestr;
      var date = new Date();

      date.setHours(0);
      date.setMinutes(time.min);
      date.setSeconds(time.sec);

      var newDate = new Date(date.valueOf() - 1000);
      var temp = newDate.toTimeString().split(' ');
      var tempsplit = temp[0].split(':');

      time.min = tempsplit[1];
      time.sec = tempsplit[2];

      timestr = time.min + time.sec;
      timeNumbers = timestr.split('');
      updateTimerDisplay(timeNumbers);

      if (timestr === '0000') countdownFinished();

      if (timestr != '0000') setTimeout(updateTimer, 1000);
    }

    function updateTimerDisplay(arr) {
      animateNum(minutesGroup.firstNum, arr[0]);
      animateNum(minutesGroup.secondNum, arr[1]);
      animateNum(secondsGroup.firstNum, arr[2]);
      animateNum(secondsGroup.secondNum, arr[3]);
    }

    function animateNum(group, arrayValue) {
      TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
      TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
        y: -group.querySelector('.num-' + arrayValue).offsetTop,
      });
    }

    setTimeout(updateTimer, 1000);
  }

  function countdownFinished() {
    setTimeout(function () {
      TweenMax.set(reloadBtn, { scale: 0.8, display: 'block' });
      TweenMax.to(timerEl, 1, { opacity: 0.2 });
      TweenMax.to(reloadBtn, 0.5, { scale: 1, opacity: 1 });
    }, 1000);
  }

  reloadBtn.addEventListener('click', function () {
    TweenMax.to(this, 0.5, {
      opacity: 0,
      onComplete: function () {
        reloadBtn.style.display = 'none';
      },
    });
    TweenMax.to(timerEl, 1, { opacity: 1 });
    initTimer('12:35');
  });

  return (
    <div>
      <div className="timer">
        <div className="timer--clock">
          <div className="minutes-group clock-display-grp">
            <div className="first number-grp">
              <div className="number-grp-wrp">
                <div className="num num-0">
                  <p>0</p>
                </div>
                <div className="num num-1">
                  <p>1</p>
                </div>
                <div className="num num-2">
                  <p>2</p>
                </div>
                <div className="num num-3">
                  <p>3</p>
                </div>
                <div className="num num-4">
                  <p>4</p>
                </div>
                <div className="num num-5">
                  <p>5</p>
                </div>
                <div className="num num-6">
                  <p>6</p>
                </div>
                <div className="num num-7">
                  <p>7</p>
                </div>
                <div className="num num-8">
                  <p>8</p>
                </div>
                <div className="num num-9">
                  <p>9</p>
                </div>
              </div>
            </div>
            <div className="second number-grp">
              <div className="number-grp-wrp">
                <div className="num num-0">
                  <p>0</p>
                </div>
                <div className="num num-1">
                  <p>1</p>
                </div>
                <div className="num num-2">
                  <p>2</p>
                </div>
                <div className="num num-3">
                  <p>3</p>
                </div>
                <div className="num num-4">
                  <p>4</p>
                </div>
                <div className="num num-5">
                  <p>5</p>
                </div>
                <div className="num num-6">
                  <p>6</p>
                </div>
                <div className="num num-7">
                  <p>7</p>
                </div>
                <div className="num num-8">
                  <p>8</p>
                </div>
                <div className="num num-9">
                  <p>9</p>
                </div>
              </div>
            </div>
          </div>
          <div className="clock-separator">
            <p>:</p>
          </div>
          <div className="seconds-group clock-display-grp">
            <div className="first number-grp">
              <div className="number-grp-wrp">
                <div className="num num-0">
                  <p>0</p>
                </div>
                <div className="num num-1">
                  <p>1</p>
                </div>
                <div className="num num-2">
                  <p>2</p>
                </div>
                <div className="num num-3">
                  <p>3</p>
                </div>
                <div className="num num-4">
                  <p>4</p>
                </div>
                <div className="num num-5">
                  <p>5</p>
                </div>
                <div className="num num-6">
                  <p>6</p>
                </div>
                <div className="num num-7">
                  <p>7</p>
                </div>
                <div className="num num-8">
                  <p>8</p>
                </div>
                <div className="num num-9">
                  <p>9</p>
                </div>
              </div>
            </div>
            <div className="second number-grp">
              <div className="number-grp-wrp">
                <div className="num num-0">
                  <p>0</p>
                </div>
                <div className="num num-1">
                  <p>1</p>
                </div>
                <div className="num num-2">
                  <p>2</p>
                </div>
                <div className="num num-3">
                  <p>3</p>
                </div>
                <div className="num num-4">
                  <p>4</p>
                </div>
                <div className="num num-5">
                  <p>5</p>
                </div>
                <div className="num num-6">
                  <p>6</p>
                </div>
                <div className="num num-7">
                  <p>7</p>
                </div>
                <div className="num num-8">
                  <p>8</p>
                </div>
                <div className="num num-9">
                  <p>9</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reload">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 65 65"
          enable-background="new 0 0 65 65"
          xmlSpace="preserve"
        >
          <path
            fill="#2b2b2b"
            d="M60.2,2.5c-2.3-0.2-4.4,1.5-4.6,3.9l-0.2,2.3c-6-5.6-13.8-8.7-22-8.7C15.5,0,0.9,14.5,0.9,32.4c0,17.9,14.5,32.4,32.4,32.4
        c12.3,0,23.5-6.9,29-17.9c1.1-2.1,0.2-4.7-1.9-5.7c-2.1-1.1-4.7-0.2-5.7,1.9c-4.1,8.1-12.3,13.2-21.4,13.2
        c-13.2,0-23.9-10.7-23.9-23.9c0-13.2,10.7-23.9,23.9-23.9c6.1,0,11.9,2.3,16.4,6.5l-3.4-0.3c-2.3-0.2-4.4,1.5-4.6,3.9
        c-0.2,2.3,1.5,4.4,3.9,4.6l12.7,1.1c0.1,0,0.3,0,0.4,0c1,0,2-0.3,2.7-1c0.9-0.7,1.4-1.8,1.5-2.9l1.2-13.4
        C64.3,4.7,62.5,2.7,60.2,2.5z"
          />
        </svg>
        <p>NOW, WITH 12:34</p>
      </div>
    </div>
  );
}
