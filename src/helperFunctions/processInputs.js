var mode = document.getElementById("myform").value;
var start = document.getElementById("_start").value;
var dest = document.getElementById("_dest").value;

document.getElementById("_mode_").innerHTML = "Mode: " + mode;
document.getElementById("_start_").innerHTML = "Start: " + start;
document.getElementById("_dest_").innerHTML = "Destination: " + dest;

if (mode == "Timed") {
    // send to database [NEEDED]

}