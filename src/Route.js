(function () {
  module.exports = function (_g) {
    var app = _g.app;

    function route() {
      app.get("/", function (req, res) {
        res.render("index.html", {});
      });

      //1. enetry point
      app.listen(9922, function () {
        console.log("Autobahn#SamsungMessage! Server listen on *:9922");
      });
    }

    var publicReturn = {
      route: route,
    };
    return publicReturn;
  };
})();
