function updateProgress(step) {
  for (var i = 1; i <= 4; i++) {
    if (i == step) {
      $("#card" + i).addClass("bg-dark");
      $("#card" + i).removeClass("bg-secondary");
    } else {
      $("#card" + i).removeClass("bg-dark");
      $("#card" + i).addClass("bg-secondary");
    }
  }
  $("#test_progress").attr("aria-valuenow", step * 25);
  $("#test_progress").css("width", step * 25 + "%");
}

function play() {
  $("#play_spinner").css("display", "inline-block");
  $("#play_text").text("RUNNING...");
}

function stop() {
  $("#play_spinner").css("display", "none");
  $("#play_text").text("PLAY");
}

let keyMap = {};
let traceGroupKeys = [];
let series; //chart state
let labels; //chart state

function generateKeyMap(key) {
  key = ["keyword1", "keyword2", "keyword3"]; //@argument key ; from traceKey db; to imp in route.

  key.forEach((k) => {
    keyMap[k] = [];
  });
}

function loadTraceGroupToKeyMap() {
  //@argu traceGroup db ; may be get recent 10 rows?
  for (var i = 0; i < 10; i++) {
    const cid = "commit" + i;
    traceGroupKeys.push(cid);
    loadTracesToKeyMap(null, cid); //using tracegroup ids to get traces
  }
}

function loadTracesToKeyMap(traces, commitId) {
  //loop in traceGroup maybe 10?
  traces = [
    //@argu traces ; from trace db ; get from route
    { name: "keyword1", duration: "1.1", commitId: commitId },
    { name: "keyword2", duration: "2.2", commitId: commitId },
    { name: "keyword3", duration: "3.3", commitId: commitId },
  ];

  traces.forEach((trace) => {
    keyMap[trace.name].push(trace.duration);
  });
}

function chartAdapter() {
  keyMapKeys = Object.keys(keyMap);
  series = [];
  labels = traceGroupKeys;
  keyMapKeys.forEach((keyword) => {
    series.push({
      name: keyword,
      type: "line",
      data: keyMap[keyword],
    });
  });
}

function displayChartSpinner(show) {
  if (show) {
    $("#chart-spinner").css("display", "block");
  } else {
    $("#chart-spinner").css("display", "none");
  }
}

function displayChart(show) {
  if (show) {
    $("#chart").css("display", "block");
  } else {
    $("#chart").css("display", "none");
  }
}

function loadChart(show) {
  if (show) {
    displayChart(false);
    displayChartSpinner(true);
  } else {
    displayChart(true);
    displayChartSpinner(false);
  }
}

function init() {
  loadChart(true);
  updateProgress(0);
  generateKeyMap();
  loadTraceGroupToKeyMap();
  chartAdapter();
  setTimeout(() => {
    loadChart(false);
  }, 3000);

  console.log(keyMap);
}

window.onload = init();

function openLog() {
  $("#log-btn").click();
}
