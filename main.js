const nowDate = new Date().getTime();
targetDate = new Date(nowDate + 14 * 23 * 60 * 59 * 1000); // almost 14 days 




function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector(".segment-display");
  const segmentDisplayTop = segmentDisplay.querySelector(
    ".segment-display__top"
  );
  const segmentDisplayBottom = segmentDisplay.querySelector(
    ".segment-display__bottom"
  );

  const segmentOverlay = segmentDisplay.querySelector(".segment-overlay");
  const segmentOverlayTop = segmentOverlay.querySelector(
    ".segment-overlay__top"
  );
  const segmentOverlayBottom = segmentOverlay.querySelector(
    ".segment-overlay__bottom"
  );

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(displayElement, overlayElement, value) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements = getTimeSegmentElements(segmentElement);

  if (
    parseInt(segmentElements.segmentDisplayTop.textContent, 10) === timeValue
  ) {
    return;
  }

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );
  segmentElements.segmentOverlay.classList.add("flip");

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove("flip");

    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );

    this.removeEventListener("animationend", finishAnimation);
  }

  segmentElements.segmentOverlay.addEventListener(
    "animationend",
    finishAnimation
  );
}

function updateTimeSection(sectionID, timeValue) {
  const sectionElement = document.getElementById(sectionID);
  const timeSegments = sectionElement.querySelector(".time-segment");

  updateTimeSegment(timeSegments, timeValue);
}

function getTimeRemaining(targetDateTime) {
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;

  const complete = timeRemaining <= 0;

  if (complete) {
    return {
      complete,
      seconds: 0,
      minutes: 0,
      hours: 0,
    };
  }

  let seconds = Math.floor(timeRemaining / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours = hours % 24;
  minutes = minutes % 60;
  seconds = seconds % 60;

  return {
    complete,
    days,
    seconds,
    minutes,
    hours,
  };
}

function updateAllSegments() {
  const timeRemainingBits = getTimeRemaining(new Date(targetDate).getTime());

  updateTimeSection("seconds", timeRemainingBits.seconds);
  updateTimeSection("minutes", timeRemainingBits.minutes);
  updateTimeSection("hours", timeRemainingBits.hours);
  updateTimeSection("days", timeRemainingBits.days);

  return timeRemainingBits.complete;
}

const countdownTimer = setInterval(() => {
  const isComplete = updateAllSegments();

  if (isComplete) {
    clearInterval(countdownTimer);
  }
}, 1000);

updateAllSegments();

/* BACKGROUND */
/* document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const factorX = 0.1;
  const factorY = 0.1;
  const backgroundPositionX = mouseX * factorX;
  const backgroundPositionY = mouseY * factorY;

  document.body.style.backgroundPositionX = `${backgroundPositionX}px`;
  document.body.style.backgroundPositionY = `${backgroundPositionY}px`;
});
 */
/* Mejor dejo la animcación */
