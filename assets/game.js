$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Great going cadet', 'On the money astrophysicist', "To Infinity!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1500);
    }

    var questions = [
        // question 1
        {
            "q": "What are chunks of rocks of varied size in space called?",
            "c": ["Astreiods", "Stars", "Comets"],
            "answer": 0
        },
        // question 2
        {
            "q": "What 2 planets are most of the asteroids in our solar system found between?",
            "c": ["Mars and Jupiter", "Mercury and Venus", "Earth and Mars"],
            "answer": 0
        },
        // question 3
        {
            "q": "A star is a spinning ball of hot luminous gas which releases what through nuclear reactions ?",
            "c": ["Gravity", "Sound", "Energy"],
            "answer": 2
        },
        // question 4
        {
            "q": "The elements hydrogen and helium together comprise what percent of almost all matter in the Universe?",
            "c": ["98 percent", "83 percent", "75 percent"],
            "answer": 2
        },
        // question 5
        {
            "q": "What does NASA stand for?",
            "c": ["National Aeronautics and Space Administration", "National Astronauts and Space Aerodynamics", "National Astrophysics and Space Admiration"],
            "answer": 0
        },
        // question 6
        {
            "q": "Which of these four is usually farthest from the sun ?",
            "c": ["Saturn", "Jupiter", "Pluto"],
            "answer": 1
        },
        // question 7
        {
            "q": "How many years does it take for the Sun to travel around the galaxy?",
            "c": ["103 million years", "225 million years", "34 billion years"],
            "answer": 1
        },
        // question 8
        {
            "q": "What are Saturn's rings made of?",
            "c": ["star dust and comet debris", "sulfur and sand", "ice and rock"],
            "answer": 2
        },
        // question 9
        {
            "q": "Unidentified type of matter that does not emit or interact with light?",
            "c": ["dark matter", "gravity", "orbiting matter"],
            "answer": 0
        },
        // question 10
        {
            "q": "The golden record is ____________",
            "c": ["The planet made up of the most gold", "a record compiled by Carl Sagan for the Voyager", "the furthest humans have traveled away from Earth"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});

var dance = {

    init: function() {
        this.dance();
    },

    config: {
        newSize: 40,
    },

    dance: function(config) {
        var newText = '',
            h1 = $('h1'),
            text = $('h1').text(),
            oldSize = h1.css('font-size'),
            length = text.length,
            i;

        for( i = 0; i < length; i++ ) {

            newText += '<span>' + text.charAt(i) + '</span>';
        }

        h1.html(newText);

        h1.on('mouseenter mouseleave', 'span', function(e) {
            var span = $(this);

            if( e.type == 'mouseenter') {

                span.stop(true,false).animate({fontSize: dance.config.newSize + 'px'});

            } else if( e.type == "mouseleave" ) {

                span.animate({fontSize: oldSize});
            }
        });
    }
};

$(function() {
    dance.init();
});
