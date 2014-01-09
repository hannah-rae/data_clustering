/* Class definitions */

/* A Point has a position defined by x, y and a centroid that it can be assigned to.
  When no centroid is assigned, the following is true: this.centroid === undefined
  Points are created when data is loaded. You shouldn't need to call new Point(...).
*/
function Point(x, y, centroid) {
  this.x = x;
  this.y = y;
  this.centroid = centroid;
}

/* A Centroid has a position defined by x,y.
  Centroids are created and removed by clicking on the Add Centroid and Remove Centroid buttons.
  You shouldn't need to call new Centroid(...).
  The id field is needed so that the same color is always used when displaying the centroid. Ignore this field.
*/ 
function Centroid(x, y, id) {
  this.x = x;
  this.y = y;
  this.id = id;
}

/* App variables */

//centroids is a list of the current centroids. It starts empty until you click on add centroid.
var centroids = [];

//points is a list of currently displayed points.
var points = [];


/* IMPLEMENT THE FUNCTIONS BELOW
--------------------------------
*/

/* For each point, assign it to the cluster represented by the closest centroid */
function assignCentroids() {

  var i; 
  for (i = 0; i < points.length; i++) {
    var j;
    var minDist = Infinity;
    for (j = 0; j < centroids.length; j++) {
      var closestCentroid;
      var checkDist = Math.sqrt((centroids[j].x - points[i].x)*(centroids[j].x - points[i].x) + (centroids[j].y - points[i].y)*(centroids[j].y - points[i].y))
      //console.log("Distance between point and centroid: " + checkDist);
      if (checkDist < minDist) {
        minDist = checkDist;
        closestCentroid = centroids[j];
      }
    }
    points[i].centroid = closestCentroid;
  }
  
}

/* Update the position of each centroid based on the points assigned to it. 
  The new position should be the mean of the positions of the points assigned to it.
*/
function updateCentroids() {

  var i;
  for (i = 0; i < centroids.length; i++) {
    var xSum = 0;
    var ySum = 0;
    var pointCount = 0;
    var j;
    for (j = 0; j < points.length; j++) {
      if (centroids[i] == points[j].centroid) {
        xSum += points[j].x;
        ySum += points[j].y;
        pointCount++;
      }
    }
    centroids[i].x = xSum/pointCount;
    centroids[i].y = ySum/pointCount;
  }
}
