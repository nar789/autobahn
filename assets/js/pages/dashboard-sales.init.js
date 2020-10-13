function generateInfoDialog(commit, data) {
  $("#modal-commit").text(commit);

  let rows = "";
  let sum = 0;
  for (d of data) {
    sum = sum + parseFloat(d.data);
    const row = `<div class="row">
    <div class="col text-center"><b>${d.name}</b></div>
    <div class="col">${d.data}ms</div></div>`;
    rows = rows + row;
  }
  $("#modal-data").html(rows);
  let total_html = `<hr />
  <div class="row">
    <div class="col text-center text-primary">
      <h5>총 진입 속도</h5>
    </div>
    <h4 class="col text-info">${sum}ms</h4>
  </div>`;
  $("#modal-total").html(total_html);
}

var colors = ["#3bafda", "#1abc9c", "#f672a7", "#000000", "#5555ff"];
var options = {
  chart: {
    height: 500,
    type: "line",
    padding: { right: 0, left: 0 },
    stacked: !1,
    toolbar: { show: !1 },
    zoom: {
      enabled: !1,
    },
    events: {
      click: function (event, chartContext, config) {
        let idx = config.dataPointIndex;
        if (idx < 0) {
          return;
        }
        let values = [];
        series.forEach((s) => {
          let obj = {};
          obj.data = s.data[idx];
          obj.name = s.name;
          values.push(obj);
        });
        generateInfoDialog(labels[idx], values);
        $("#chartinfo-btn").click();
        //pop-up
      },
    },
  },
  stroke: { width: [1, 2], curve: "smooth" },
  plotOptions: { bar: { columnWidth: "50%" } },
  colors: colors,
  series: series,
  fill: {
    opacity: [0.25, 1],
    gradient: {
      inverseColors: !1,
      shade: "light",
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100],
    },
  },
  labels: labels,
  markers: { size: 0 },
  legend: { offsetY: 5 },
  xaxis: {
    labels: {
      formatter: function (a) {
        return a;
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (a) {
        return a;
      },
      offsetX: -10,
    },
  },
  tooltip: {
    followCursor: true,
    shared: !0,
    intersect: !1,
    y: {
      formatter: function (a) {
        return a + "ms";
      },
    },
  },
  grid: { borderColor: "#f1f3fa", padding: { bottom: 10 } },
};

(chart = new ApexCharts(
  document.querySelector("#products-sales"),
  options
)).render();
