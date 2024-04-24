document.addEventListener("DOMContentLoaded", (event) => {
    const canvas = document.getElementById('cnv');
    const ctx = cnv.getContext('2d');
    
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    const sizer = cnv.height + cnv.width;
    
    const plt = {
        n: Math.random(),
        clr: [],
        name: ""
    }
    plt.clr = chooseRdm([
        ["#000000", "#FF0090", "#21094E", "#4B0082", "#00FF00"],
        ["#FF0090", "#FF6600", "#08F7FE", "#610594", "#B100E8"],
        ["#7209B7", "#ABF9F5", "#3A0CA3", "#3F37C9", "#4361EE"],
        ["#B5179E", "#F72585", "#7209B7", "#560BAD", "#480CA8"],
        ["#50596B", "#B4B5B9", "#6B3400", "#A69D90", "#5C5D61"],
        ["#3E434C", "#6E797C", "#9DA3A7", "#C0C5C1", "#8A7F67"],
        ["#313638", "#535E61", "#68737A", "#80939D", "#ABB7BF"],
        ["#393E46", "#4ECCA3", "#EEEEEE", "#FFD369", "#393E46"],
        ["#222831", "#393E46", "#00ADB5", "#EEEEEE", "#FFD369"],
        ["#30475E", "#F2A365", "#ECECEC", "#C9CCD5", "#222831"],
        ["#F94C66", "#FEFE22", "#0D21A1", "#7E08F8", "#14F5FE"],
        ["#03F4EB", "#09FBD3", "#6E0DD0", "#F907FC", "#05DFD7"],
        ["#CB3301", "#FF0066", "#FF6666", "#FEFF99", "#FFFF67"],
        ["#05E8BA", "#B3FC9F", "#FC5B78", "#FC8EAC", "#FAAFFF"],
        ["#FF5200", "#F21170", "#FF8300", "#FFD600", "#FFFDC0"],
        ["#6930C3", "#7400B8", "#5E60CE", "#5390D9", "#4EA8DE"],
        ["#3A0088", "#930077", "#E61C5D", "#FFBD39", "#FFFB46"],
        ["#FD3A69", "#FFAA4C", "#FFF275", "#AAE6FF", "#233D4D"],
        ["#252A34", "#FF2E63", "#08D9D6", "#FF2E63", "#EAEAEA"],
        ["#8900FF", "#ED0CEF", "#303030", "#FFED00", "#E80000"],
        ["#6B2B06", "#B80C09", "#0C1E1C", "#FCFF4B", "#D4D4DC"],
        ["#FF2400", "#E8EDDF", "#E6E8E6", "#0A0908", "#5E503F"],
        ["#8D0801", "#5B0000", "#400202", "#2D0202", "#FFD700"],
        ["#E6E6E6", "#929598", "#6E6E6E", "#48494B", "#2C2C34"],
        ["#3B000A", "#6A040F", "#9D0208", "#D00000", "#000FFF"],
        ["#F8B7D0", "#ED92AB", "#EC608D", "#D926A9", "#8B104E"],
        ["#9B5DE5", "#F15BB5", "#FEE440", "#00BBF9", "#00F5D4"],
        ["#000000", "#FF0000", "#FFFFFF", "#000000", "#0000FF"],
        ["#000000", "#110000", "#FFFFFF", "#000000", "#FF0000"],
        ["#EEFFFF", "#FFFFFF", "#FF0000", "#000000", "#000000"],
    ])
    
    const area = {
        n: Math.random(),
        val: 12,
    };
    
    if (area.n < 0.25) {
        area.val = 6
    }
    else if (area.n < 0.5) {
        area.val = 8
    }
    else if (area.n < 0.75) {
        area.val = 12
    }
    else {
        area.val = 4 
    }
    
    //////////////////////
    window.$generativeTraits = {
        "Palette": plt.clr,
        'Base Area': area.val,
    }
    console.log(window.$generativeTraits)
    
    const IsoX = cnv.width / 2;
    const IsoY = cnv.height / 2;
    let IsoW;
    let IsoH = IsoW / 2;
    
    function rdmColor(palette, a) {
        const couleurs = palette;
        const couleurHex = couleurs[Math.floor(Math.random() * couleurs.length)];
        const alpha = a;
        const r = parseInt(couleurHex.slice(1, 3), 16);
        const g = parseInt(couleurHex.slice(3, 5), 16);
        const b = parseInt(couleurHex.slice(5, 7), 16);
        const couleurRGBA = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        return couleurRGBA;
    }
    
    function isoToScreenX(localX, localY) {
        return IsoX + (localX - localY) * IsoW;
    }
    
    function isoToScreenY(localX, localY) {
        return IsoY + (localX + localY) * IsoH;
    }
    
    function drawCube(isoX, isoY) {
        ctx.lineWidth = sizer * 0.001;
        ctx.strokeStyle = rdmColor(plt.clr, Math.random() * 255);
    
    
        // Top side
        ctx.fillStyle = plt.clr[2];
        ctx.beginPath();
        ctx.moveTo(isoToScreenX(isoX, isoY), isoToScreenY(isoX, isoY));
        ctx.lineTo(isoToScreenX(isoX, isoY - 1), isoToScreenY(isoX, isoY - 1));
        ctx.lineTo(isoToScreenX(isoX - 1, isoY - 1), isoToScreenY(isoX - 1, isoY - 1));
        ctx.lineTo(isoToScreenX(isoX - 1, isoY), isoToScreenY(isoX - 1, isoY));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    
        // Left side
        ctx.fillStyle = plt.clr[3];
        ctx.beginPath();
        ctx.moveTo(isoToScreenX(isoX + 1, isoY + 1), isoToScreenY(isoX + 1, isoY + 1));
        ctx.lineTo(isoToScreenX(isoX, isoY), isoToScreenY(isoX, isoY));
        ctx.lineTo(isoToScreenX(isoX - 1, isoY), isoToScreenY(isoX - 1, isoY));
        ctx.lineTo(isoToScreenX(isoX, isoY + 1), isoToScreenY(isoX, isoY + 1));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    
        // Right side
        ctx.strokeStyle = plt.clr[3];
        ctx.fillStyle = plt.clr[2];
        ctx.beginPath();
        ctx.moveTo(isoToScreenX(isoX + 1, isoY + 1), isoToScreenY(isoX + 1, isoY + 1));
        ctx.lineTo(isoToScreenX(isoX + 1, isoY), isoToScreenY(isoX + 1, isoY));
        ctx.lineTo(isoToScreenX(isoX, isoY - 1), isoToScreenY(isoX, isoY - 1));
        ctx.lineTo(isoToScreenX(isoX, isoY), isoToScreenY(isoX, isoY));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    
    function drawCubes(x, y, zone, h) {
        ctx.save()
        ctx.translate(x, y)
        for (let x = 0; x < zone; x++) {
            for (let y = 0; y < zone; y++) {
                let nbr = Math.floor(Math.random() * 5);
                for (let z = 0; z < nbr * h; z++) {
                    drawCube(x - z, y - z);
                }
            }
        }
        ctx.restore()
    }
    
    function drawScene() {
        const centerX = cnv.width / 2;
        const centerY = cnv.height / 2;
        const radius = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, plt.clr[1]);
        gradient.addColorStop(1, plt.clr[0]);
    
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cnv.width, cnv.height);
    
        let scl = sizer * 0.05;
    
        for (let x = -cnv.width / 2; x < cnv.width / 2; x += scl) {
            for (let y = -cnv.height / 2; y < cnv.height / 2; y += scl) {
                IsoW = mathRandBetween(-sizer * 0.025, sizer * 0.025);
                IsoH = IsoW * 0.5;
                drawCubes(x, y, Math.floor(Math.random() * area.val), Math.random() * 1.618);
            }
        }
    
        addGrain(cnv, sizer * 0.023)
    }
    
    drawScene();
    
    document.addEventListener('keydown', function (event) {
        if (event.key === 's' || event.key === 'S') {
            event.preventDefault();
            saveHighResolutionImage();
        }
    });
    
    document.addEventListener('click', function (event) {
        drawScene();
    });
    
    
    function saveHighResolutionImage() {
    
        const scaleFactor = 4;
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;
    
        // Resize Canvas
        canvas.width = oldWidth * scaleFactor;
        canvas.height = oldHeight * scaleFactor;
    
        canvas.style.width = oldWidth + "px";
        canvas.style.height = oldHeight + "px";
        const scaledIsoX = IsoX * scaleFactor;
        const scaledIsoY = IsoY * scaleFactor;
    
        ctx.save();
        ctx.scale(scaleFactor, scaleFactor);
        drawScene(scaledIsoX, scaledIsoY);
    
        canvas.toBlob(function (blob) {
            const link = document.createElement('a');
            link.download = 'high-res-image.png';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        }, 'image/png');
        ctx.restore();
    }
    
    function mapRange(value, in_min, in_max, out_min, out_max) {
        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    
    function addGrain(canvas, graininess) {
        const ctx = cnv.getContext('2d');
        const width = cnv.width;
        const height = cnv.height;
        const pixels = ctx.getImageData(0, 0, width, height);
    
        for (let i = 0; i < pixels.data.length; i += 4) {
            const r = pixels.data[i];
            const g = pixels.data[i + 1];
            const b = pixels.data[i + 2];
            const alpha = pixels.data[i + 3];
            const random = Math.random();
            const offset = (random - 0.5) * graininess;
    
            pixels.data[i] = Math.max(0, Math.min(255, r + offset));
            pixels.data[i + 1] = Math.max(0, Math.min(255, g + offset));
            pixels.data[i + 2] = Math.max(0, Math.min(255, b + offset));
            pixels.data[i + 3] = alpha;
        }
    
        ctx.putImageData(pixels, 0, 0);
    }
    
    function mathRandBetween(a, b) {
        if (!b) {
            return fxrand() * a
        }
        return Math.random() * (b - a) + a
    }
    function chooseRdm(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
});
