
let firstFullMoon = new Date("1994-09-19T20:00:00Z");
let todaysDate = new Date();
let synodicMonth = 2551442777.78;

let currentPhaseNumber = ((todaysDate - firstFullMoon) % synodicMonth) / synodicMonth;

let phaseInput = document.getElementById('phase');
let root = document.documentElement;
let rootStyle = getComputedStyle(root);
let dark = rootStyle.getPropertyValue('--dark');
let light = rootStyle.getPropertyValue('--light');
let size = rootStyle.getPropertyValue('--moonsize').replace(/\D/g, '');

let moon = {
    date: todaysDate,
    phaseName: "Unknown...",
    phase: (currentPhaseNumber * 2) - 1,
    leftHemi: rootStyle.getPropertyValue('--left-hemi'),
    rightHemi: rootStyle.getPropertyValue('--right-hemi'),
    shadeDisk: rootStyle.getPropertyValue('--shade-disk'),
    diskWidth: rootStyle.getPropertyValue('--disk-width'),

    calcShadow: function(){
        if (-1 <= this.phase && this.phase < -0.5) {
            this.shadeDisk = light;
            this.leftHemi = light;
            this.rightHemi = dark;
            
            this.diskWidth = ((( -1 * this.phase ) - 0.5 ) * 2 * size );
        } 
        else if (-0.5 <= this.phase && this.phase < 0) {
            this.shadeDisk = dark;
            this.leftHemi = light;
            this.rightHemi = dark;

            this.diskWidth = (( Number(this.phase) + 0.5 ) * 2 * size );
        }
        else if (0 <= this.phase && this.phase < 0.5) {
            this.shadeDisk = dark;
            this.leftHemi = dark;
            this.rightHemi = light;

            this.diskWidth = (( this.phase - 0.5 ) * -2 * size );
        }
        else if (0.5 <= this.phase && this.phase <= 1) {
            this.shadeDisk = light;
            this.leftHemi = dark;
            this.rightHemi = light;

            this.diskWidth = (( this.phase - 0.5 ) * 2 * size );
        }
    },

    calcName: function(){
        if (-1 <= this.phase && this.phase < -0.932) {
            this.phaseName = 'Full Moon';
        }
        else if (-0.932 <= this.phase && this.phase < -0.568) {
            this.phaseName = 'Waning Gibbous';
        }
        else if (-0.568 <= this.phase && this.phase < -0.432) {
            this.phaseName = 'Last Quarter';
        }
        else if (-0.432 <= this.phase && this.phase < -0.108) {
            this.phaseName = 'Waning Crescent';
        }
        else if (-0.108 <= this.phase && this.phase < 0.068) {
            this.phaseName = 'New Moon';
        }
        else if (0.068 <= this.phase && this.phase < 0.432) {
            this.phaseName = 'Waxing Crescent';
        }
        else if (0.432 <= this.phase && this.phase < 0.568) {
            this.phaseName = 'Last Quarter';
        }
        else if (0.568 <= this.phase && this.phase < 0.932) {
            this.phaseName = 'Waxing Gibbous';
        }
        else if (0.932 <= this.phase && this.phase <= 1) {
            this.phaseName = 'Full Moon';
        }
    },

    changePhase: function(newPhase) {
        this.phase = newPhase;
        this.calcShadow();
        this.calcName();
        root.style.setProperty('--phase', this.phase);
        root.style.setProperty('--left-hemi', this.leftHemi);
        root.style.setProperty('--right-hemi', this.rightHemi);
        root.style.setProperty('--shade-disk', this.shadeDisk);
        root.style.setProperty('--disk-width', this.diskWidth + 'vw');
    }
    
}

phaseInput.addEventListener('change', function() {
    moon.changePhase(this.value);
})

phaseInput.addEventListener('mousedown', function() {
    this.onmousemove = function(){
        moon.changePhase(this.value);
    }
})

phaseInput.addEventListener('mouseup', function() {
    this.onmousemove = null;
})

phaseInput.value = moon.phase;
moon.changePhase(moon.phase);
