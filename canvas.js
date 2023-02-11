// const { distance } = require("./utils")

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ["#2191FB", "#B2ECE1", "#2B4162", "#8D80AD", "#5863F8"]

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Objects
class Particle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.radian = Math.random() * Math.PI * 2
        this.velocity = 0.03
        this.dia = randomIntFromRange(80, 190)
        this.lp = {
            x: this.x,
            y: this.y
        }
        this.lastm = {
            x: x,
            y: y
        }
    }

    draw() {
        c.beginPath()
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // c.fillStyle = this.color
        // c.fill()

        c.strokeStyle = this.color
        c.lineWidth = this.radius
        c.moveTo(this.lp.x, this.lp.y)
        c.lineTo(this.x, this.y)
        c.stroke()
        c.closePath()
    }

    update() {
        this.lp = {
            x: this.x,
            y: this.y
        }
        this.lastm.x += (mouse.x - this.lastm.x) * 0.05
        this.lastm.y += (mouse.y - this.lastm.y) * 0.05
        this.radian += this.velocity
        this.x = this.lastm.x + Math.cos(this.radian) * this.dia
        this.y = this.lastm.y + Math.sin(this.radian) * this.dia
        this.draw()
    }
}

// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(innerWidth / 2, innerHeight / 2, randomIntFromRange(2, 5), randomColor(colors)))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(255,255,255,0.05)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
        particle.update()
    });
}

init()
animate()
