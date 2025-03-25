
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');

const sectors = ['Win', 'Lose', 'Try Again', 'Jackpot', 'No Prize', 'Bonus'];
const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33A8', '#33FFF3', '#F3FF33'];

let angle = 0;
let spinning = false;

function drawWheel() {
    const numSectors = sectors.length;
    const sectorAngle = (Math.PI * 2) / numSectors;

    for (let i = 0; i < numSectors; i++) {
        const startAngle = i * sectorAngle + angle;
        const endAngle = startAngle + sectorAngle;

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(startAngle + sectorAngle / 2);
        ctx.fillStyle = '#fff';
        ctx.font = '18px Arial';
        ctx.fillText(sectors[i], canvas.width / 3.5, 10);
        ctx.restore();
    }
}

function spinWheel() {
    if (!spinning) {
        spinning = true;
        let spins = Math.floor(Math.random() * 10) + 5;
        let spinTime = 3000;

        const spinInterval = setInterval(() => {
            angle += (Math.PI / 32);
            drawWheel();
        }, 50);

        setTimeout(() => {
            clearInterval(spinInterval);
            spinning = false;
            const winningSector = sectors[Math.floor(Math.random() * sectors.length)];
            alert(`You landed on: ${winningSector}`);
        }, spinTime);
    }
}

spinButton.addEventListener('click', spinWheel);
drawWheel();
