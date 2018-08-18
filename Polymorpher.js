// Polymorpher v. 1.02
(function(window, document, undefined){
    var getTime = Date.now || function() {return new Date().getTime();};
    
    function Polymorpher(params){
        this.element = (typeof params.element == "string") ? document.getElementById(params.element) : params.element;
        this.endPoints = params.endPoints;
        this.duration = params.duration;
        this.easing = params.easing;
        this.clock = 0;

        this.is_to_animate = [];

        // 1. Récupère l'élément
        if (typeof this.element != "object") {
            console.error("[Polymorpher] Le premier argument doit être un objet HTML (ex : document.getElementById('mask')).");
            return;
        }

        // 2. Récupère les points et détecte ceux qui doivent être animés
        this.start_points = this.element.getAttribute("points").split(" ");
        for (var i in this.start_points) {
            this.start_points[i] = this.start_points[i].split(",");
            for(var u in this.start_points[i]) {
                this.start_points[i][u] = parseInt(this.start_points[i][u]);
            }
        }

        var u = 0;
        this.endPoints = this.endPoints.split(" ");
        for (var i in this.endPoints) {
            this.endPoints[i] = this.endPoints[i].split(",");
            this.is_to_animate[i] = [];
            for (var u in this.endPoints[i]) {
                this.endPoints[i][u] = parseInt(this.endPoints[i][u]);
                if (this.endPoints[i][u] == this.start_points[i][u]) {
                    this.is_to_animate[i][u] = false;
                } else {
                    this.is_to_animate[i][u] = true;
                }
            }
            u++;
        }
        
        if (this.start_points.length != this.endPoints.length) {
            console.error("WondzSVG : Le deuxième argument n'a pas le même nombre de points que l'objet ciblé.");
            return;
        }

        // 3. Récupère la durée d'animation
        if (typeof this.duration != "number") {
            console.error("WondzSVG : Le troisième argument (durée) doit être de type numérique.");
            return;
        }

        // 4. Récupère l'easing
        if (typeof this.easing != "string") {
            console.error("WondzSVG : Le quatrième argument (easing) doit être une chaîne de caractères");
            return;
        }
        else this.easing = retrieveEasingFunction(this.easing);
        
        function retrieveEasingFunction(easing) {
            if (easing == "ease-in-out") return easeInOutCubic;
            if (easing == "ease-in") return easeInCubic;
            if (easing == "ease-out") return easeOutCubic;
            if (easing == "linear") return linear;
        }

        function easeInOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
            if ((currentIteration /= totalIterations / 2) < 1) {
                return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
            }
            return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
        }

        function easeInCubic(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
        }

        function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
        }

        function linear(currentIteration, startValue, changeInValue, totalIterations) {
            return changeInValue * (currentIteration / totalIterations) + startValue;
        }
    }

    Polymorpher.prototype.start = function() {
        this.startTime = getTime();
        this.morph();
    }

    Polymorpher.prototype.morph = function() {
        this.clock = getTime() - this.startTime;

        var new_points = "";
        for (var i in this.start_points) {
            for (var u in this.start_points[i]){
                if (this.is_to_animate[i][u]){
                    new_points += this.easing(this.clock, this.start_points[i][u], (this.endPoints[i][u] - this.start_points[i][u]), this.duration);
                } else {
                    new_points += this.start_points[i][u];
                }
                if (u == 0) new_points += ',';
            }
            if (i < this.start_points.length) new_points += ' ';
        }
        this.element.setAttribute("points", new_points );
                    
        if (this.clock < this.duration) requestAnimationFrame(this.morph.bind(this));
    }

    window.Polymorpher = Polymorpher;
})(window, document);