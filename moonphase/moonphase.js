let phaseInput = document.getElementById('phase');
let root = document.documentElement;
let rootStyle = getComputedStyle(root);
let dark = rootStyle.getPropertyValue('--dark');
let light = rootStyle.getPropertyValue('--light');
let size = rootStyle.getPropertyValue('--moonsize').replace(/\D/g, '');

let moon = {
    phase: phaseInput.value,
    leftHemi: rootStyle.getPropertyValue('--left-hemi'),
    rightHemi: rootStyle.getPropertyValue('--right-hemi'),
    shadeDisk: rootStyle.getPropertyValue('--shade-disk'),

    diskWidth: rootStyle.getPropertyValue('--disk-width'),

    calcPhase: function(){
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
        console.log('Moon:', this);
    }
    
}


phaseInput.addEventListener('change', function() {
    changePhase(this.value);
})

phaseInput.addEventListener('mousedown', function() {
    this.onmousemove = function(){
        changePhase(this.value);
    }
})

phaseInput.addEventListener('mouseup', function() {
    this.onmousemove = null;
})

function changePhase(phase) {
    moon.phase = phase;
    moon.calcPhase();
    root.style.setProperty('--phase', moon.phase);
    root.style.setProperty('--left-hemi', moon.leftHemi);
    root.style.setProperty('--right-hemi', moon.rightHemi);
    root.style.setProperty('--shade-disk', moon.shadeDisk);
    root.style.setProperty('--disk-width', moon.diskWidth + 'vw');
}

phaseInput.value = moon.phase;
changePhase(moon.phase);