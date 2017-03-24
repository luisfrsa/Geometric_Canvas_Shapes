var canvas, interval,run;
$(document).ready(function () {
    canvas = new LCanvas('myCanvas');
     run = function () {
        canvas.clearCanvas();
        canvas.fillCanvas();
    };
    interval = setInterval(run, 200);
});

var getCollorPattern = {
    rainbow: ['#fe0000', '#ff7f00', '#ffff00', '#00ff01', '#0000fe', '#4b0081', '#8e01ff'],
    gradient: generateColor
};

var LCanvas = function (id) {
    var self = this;

    var _canvas = document.getElementById(id),
            _context = _canvas.getContext('2d');


    this.config = {
        space: 10,
        size: 20,
        /*fill: random, sequencial, and draw name methods*/
        fill: 'random',
        colorConf: {
            /*fill: random or sequencial*/
            pattern: 'sequencial',
            color: getCollorPattern.rainbow
        },
        opacity: {
            min: 0.3,
            max: 0.9
        }
    };
    var configCanvas = function () {
        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;
        self.config.canvas = {
            width: _canvas.width,
            height: _canvas.height
        };
    };

    configCanvas();

    var createMatrix = function () {
        var qtRow = Math.floor(self.config.canvas.width / (self.config.space + (self.config.size * 2))),
                qtCol = Math.floor(self.config.canvas.height / (self.config.space + (self.config.size * 2)));
        var m = new Array(qtRow);
        for (var i = 0; i < qtRow; i++) {
            m[i] = new Array(qtCol);
        }
        return m;
    };

    this.draw = {
        circle: function (posX, posY, size, color) {
            _context.beginPath();
            _context.arc(posX, posY, size, 0, Math.PI * 2, true);
            _context.fillStyle = color;
            _context.fill();
            _context.closePath();
        },
        square: function (posX, posY, size, color) {
            _context.beginPath();
            _context.rect(posX - size, posY - size, size * 2, size * 2);
            _context.fillStyle = color;
            _context.fill();
            _context.closePath();
        },
        triangle: function (posX, posY, size, color) {
            _context.beginPath();
            _context.moveTo(posX + size, posY + size);
            _context.lineTo(posX, posY - size);
            _context.lineTo(posX - size, posY + size);
            _context.fillStyle = color;
            _context.fill();
            _context.closePath();
        },
        /*adapted from http://jsfiddle.net/m1erickson/8j6kdf4o/*/
        starfive: function (posX, posY, size, color) {
            var spikes = 5, outerRadius = 30, innerRadius = 13;
            var spikes = 5, outerRadius = size * 1.05, innerRadius = (size * 0.8) / 2;
            var rot = Math.PI / 2 * 3;
            var x = posX;
            var y = posY;
            var step = Math.PI / spikes;

            _context.strokeSyle = "#000";
            _context.beginPath();
            _context.moveTo(posX, posY - outerRadius);
            for (i = 0; i < spikes; i++) {
                x = posX + Math.cos(rot) * outerRadius;
                y = posY + Math.sin(rot) * outerRadius;
                _context.lineTo(x, y);
                rot += step;

                x = posX + Math.cos(rot) * innerRadius;
                y = posY + Math.sin(rot) * innerRadius;
                _context.lineTo(x, y);
                rot += step;
            }
            _context.lineTo(posX, posY - outerRadius);
            _context.closePath();
            _context.fillStyle = color;
            _context.fill();
        }
    };
    var getShapeFill = function (ind) {
        var drawMethods = Object.keys(self.draw),
                fill = self.config.fill;
        if (drawMethods.indexOf(fill) !== -1) {
            return fill;
        }
        switch (fill) {
            case 'sequencial':
                return drawMethods[ind % drawMethods.length];
                break;
            case 'random':
                var rand = Math.floor((Math.random() * drawMethods.length));
                return drawMethods[rand];
                break;
            default:
                return drawMethods[0];
                break;
        }
    };
    var getColorFill = function (ind) {
        var color;
        if (self.config.colorConf.pattern === 'sequencial') {
            color = self.config.colorConf.color[ind % self.config.colorConf.color.length];
        } else if (self.config.colorConf.pattern === 'random') {
            color = self.config.colorConf.color[Math.floor((Math.random() * self.config.colorConf.color.length))];
        }
        return hex2rgba(color, (Math.random() * (self.config.opacity.max - self.config.opacity.min) + self.config.opacity.min).toFixed(2));
    };
    this.fillCanvas = function () {
        configCanvas();
        var count = 0,
                countCol,
                posX,
                posY,
                colorRGBA,
                matrix = createMatrix(),
                countRow = matrix.length;
        for (var r = 0; r < countRow; r++) {
            countCol = matrix[r].length;
            for (var c = 0; c < countCol; c++) {
                posX = ((self.config.size * 2) + self.config.space) * (r) + self.config.size + self.config.space / 2;
                posY = ((self.config.size * 2) + self.config.space) * (c) + self.config.size + self.config.space / 2;
                colorRGBA = getColorFill(count);
                self.draw[getShapeFill(count)](posX, posY, self.config.size, colorRGBA);
                count++;
            }
        }
    };
    this.clearCanvas = function () {
        _context.clearRect(0, 0, self.config.canvas.width, self.config.canvas.height);
    };

};

function log(l) {
    console.log(l);
}



