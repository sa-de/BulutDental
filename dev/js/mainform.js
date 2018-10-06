var colors = new Array(
    [28, 216, 210], [147, 237, 199],

    [237, 66, 100], [255, 237, 188],

    [220, 36, 36], [74, 86, 157],

    [252, 53, 76], [10, 191, 188],

    [248, 87, 166], [255, 88, 88],

    [229, 93, 135], [95, 195, 228]
);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.005;

function updateGradient() {
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "#" + ((r1 << 16) | (g1 << 8) | b1).toString(16);

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "#" + ((r2 << 16) | (g2 << 8) | b2).toString(16);

    $('.house').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    }).css({
        '-webkit-text-fill-color': 'transparent',
        '-webkit-background-clip': 'text'
    });


    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
}

setInterval(updateGradient, 10);




// The rest of this is just polish. Ignore at will.
// INPUT MASK
$("#phone").mask("(999) 999-9999");


$("#phone").on("blur", function() {
    var last = $(this).val().substr($(this).val().indexOf("-") + 1);

    if (last.length == 3) {
        var move = $(this).val().substr($(this).val().indexOf("-") - 1, 1);
        var lastfour = move + last;

        var first = $(this).val().substr(0, 9);

        $(this).val(first + '-' + lastfour);
    }
});

// BUTTON SUBMISSION

$(function() {
    $('form').submit(function(e) {
        e.preventDefault();
      
      //on successful submission
        if ($(this).parsley().isValid()) {
            trigger: 'keyup',
            $(this).find("button, input, .input-icon").addClass("sent");
            $(this).find("button").html("Sending...");
            $(this).find("button[type='submit'], input").prop('disabled', true);
          
            // http://stackoverflow.com/questions/591269/settimeout-and-this-in-javascript
            var that = this; 
          
            //SUCCESS STATE
            setTimeout(function() {
                $(that).find('button').html("<span class='fa fa-check button-icon'></span> Sent!");
                $(that).find('input-icon').remove
            }, 3500);
          
            //RESET STATE
            setTimeout(function() {
                $(that).find('button, input, .input-icon').removeClass('sent');
                $(that).find('button').html("Notify Me");
                $(that).find(':input', '#myform')
                    .not(':button, :submit, :reset, :hidden')
                    .val('')
                    .removeAttr('checked')
                    .removeAttr('selected');
              $(that).find("button[type='submit'], input").prop('disabled', false);
            }, 4700);



        }
    });
});
