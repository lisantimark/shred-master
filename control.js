// Basic Controller

var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 250;
context.canvas.width = 600;

// Keeps track of object
rectangle = {
    height: 32,
    width: 32,
    x: 144,
    x_velocity: 0,
    y: 0,
    y_velocity: 0
};

// Controller logic
controller = {
    left:false,
    right:false,
    up:false,
    keyListener:function(event) {

        // Toggles keystate
        var key_state = (event.type == "keydown")?true:false;

        switch(event.keyCode) {
            case 37:// Left key
                controller.left = key_state;
                break;
            case 38:// Up key
                controller.up = key_state;
                break;
            case 39:// Right key
                controller.right = key_state;
                break;
        }
    }
};

loop = function() {

    // Values added on every frame of animation
    // Plus and minus gives easing effect on movement
    if (controller.up && rectangle.jumping == false) {
        rectangle.y_velocity -= 20;
        rectangle.jumping = true;
    }

    if (controller.left) {
        rectangle.x_velocity -= 0.5;
    }

    if (controller.right) {
        rectangle.x_velocity += 0.5;
    }

    // Physics
    rectangle.x += rectangle.x_velocity; // Adds velocity to current pos
    rectangle.y += rectangle.y_velocity;
    rectangle.y_velocity += 1.5; // Gravity
    // Friction controls
    rectangle.x_velocity *= 0.9;
    rectangle.y_velocity *= 0.9;

    // Floor collision
    if (rectangle.y > 180-16-32) {
        rectangle.jumping = false;
        rectangle.y = 180-16-32;
        rectangle.y_velocity = 0;
    }

    // If rectangle is going off the left of the screen
    if (rectangle.x < -32) {
        rectangle.x = 600;
        // If rectangle goes past right boundary
    } else if (rectangle.x > 600) {
        rectangle.x = -32;
    }

    context.fillStyle = "#fff5fd";
    context.fillRect(0,0,600,250);

    // Draw rectangle
    context.fillStyle = "#f120ff";
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    context.fill();

    // Draw floor
    context.strokeStyle = "#202830";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0, 164);
    context.lineTo(600, 164);
    context.stroke();

    // Recursive call on loop function
    window.requestAnimationFrame(loop);
}


// Add listener to specific object
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
