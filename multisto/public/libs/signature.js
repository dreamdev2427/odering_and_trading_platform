var emptyImage;

function signatureCapture(id) {
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");
    canvas.width = 340;
    canvas.height = 220;
    context.fillStyle = "#fff";
    context.strokeStyle = "#444";
    context.lineWidth = 1.5;
    context.lineCap = "round";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var disableSave = true;
    var pixels = [];
    var cpixels = [];
    var xyLast = {};
    var xyAddLast = {};
    var calculate = false;
    {   //functions
        function remove_event_listeners() {
            canvas.removeEventListener('mousemove', on_mousemove, false);
            canvas.removeEventListener('mouseup', on_mouseup, false);
            canvas.removeEventListener('touchmove', on_mousemove, false);
            canvas.removeEventListener('touchend', on_mouseup, false);

            document.body.removeEventListener('mouseup', on_mouseup, false);
            document.body.removeEventListener('touchend', on_mouseup, false);
        }

        function get_coords(e) {
            var x, y;
            var rect = canvas.getBoundingClientRect();
            if (e.changedTouches && e.changedTouches[0]) {
                x = e.touches[0].clientX - rect.left;
                y = e.touches[0].clientY - rect.top;
            } else if (e.layerX || 0 == e.layerX) {
                x = e.layerX;
                y = e.layerY;
            } else if (e.offsetX || 0 == e.offsetX) {
                x = e.offsetX;
                y = e.offsetY;
            }
            return {
                x: x, y: y
            };
        };

        function on_mousedown(e) {
            e.preventDefault();
            e.stopPropagation();

            canvas.addEventListener('mouseup', on_mouseup, false);
            canvas.addEventListener('mousemove', on_mousemove, false);
            canvas.addEventListener('touchend', on_mouseup, false);
            canvas.addEventListener('touchmove', on_mousemove, false);
            document.body.addEventListener('mouseup', on_mouseup, false);
            document.body.addEventListener('touchend', on_mouseup, false);

            empty = false;
            var xy = get_coords(e);
            context.beginPath();
            pixels.push('moveStart');
            context.moveTo(xy.x, xy.y);
            pixels.push(xy.x, xy.y);
            xyLast = xy;
        };

        function on_mousemove(e, finish) {
            e.preventDefault();
            e.stopPropagation();


            var xy = get_coords(e);

            var xyAdd = {
                x: (xyLast.x + xy.x) / 2,
                y: (xyLast.y + xy.y) / 2
            };

            if (calculate) {
                var xLast = (xyAddLast.x + xyLast.x + xyAdd.x) / 3;
                var yLast = (xyAddLast.y + xyLast.y + xyAdd.y) / 3;
                pixels.push(xLast, yLast);
            } else {
                calculate = true;
            }

            context.quadraticCurveTo(xyLast.x, xyLast.y, xyAdd.x, xyAdd.y);
            pixels.push(xyAdd.x, xyAdd.y);
            context.stroke();
            context.beginPath();
            context.moveTo(xyAdd.x, xyAdd.y);
            xyAddLast = xyAdd;
            xyLast = xy;

        };

        function on_mouseup(e) {
            remove_event_listeners();
            disableSave = false;
            context.stroke();
            pixels.push('e');
            calculate = false;
        };
    }
    canvas.addEventListener('touchstart', on_mousedown, false);
    canvas.addEventListener('mousedown', on_mousedown, false);
}

function signatureClear(id) {
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function initlizeSignaturesCanvas(id) {
    signatureCapture(id);
    signatureClear(id);
    emptyImage = document.getElementById(id).toDataURL();
}

function isSignatureAreaIsEmpty(id) {
    var canvas = document.getElementById(id);
    if (canvas.toDataURL() === emptyImage)
        return true;
    else
        return false;
}

function getSignatureImageData(id) {
    var canvas = document.getElementById(id);
    var dataImage = canvas.toDataURL("image/png");
    return canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
}
