$(document).ready(function(){
    var ctx = $("#skills").get(0).getContext("2d");

    var data = [
        {
            value: 80,
            highlight: "#F4511E",
            color: "#FF5722",
            label: "HTML5"
        },
        {
            value: 60,
            highlight: "#039BE5",
            color: "#03A9F4",
            label: "CSS3"
        },
        {
            value: 30,
            highlight: "#FFEB3B",
            color: "#FFEE58",
            label: "Python"
        },
        {
            value: 40,
            highlight: "#F0DB4F",
            color: "#F0DB4F",
            label: "Javascript"
        }
    ];

    var chart = new Chart(ctx).Doughnut(data);
});