

const WALLPAPER = {
  canvas: undefined,
  blur: 16,
  frameCount: 0,
  frameRate: 24,
  mountainSpawnInterval: 96,
  mountains: [],
  stars: [],
  renderFrame: function() {
    this.canvas.width = this.canvas.clientWidth / WALLPAPER.blur;
    this.canvas.height = this.canvas.clientHeight / WALLPAPER.blur;
    this.frameCount += 1;
    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "#131112";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    if(
      this.frameCount % this.mountainSpawnInterval == 0
      || this.mountains.length == 0
    ) {
      const heights = [];
      for(let i = 0; i < Math.random() * 12; i++) {
        heights.push({
          x: Math.random(),
          y: Math.random() * 0.25
        });
      }
      this.mountains.push({
        yLevel: 0,
        heights
      })
    }
    for(let i = 0; i < this.stars.length; i++) {
      ctx.fillStyle = "#FF99FF" + Math.floor(
        this.stars[i].pulse * 64 
        + this.stars[i].scale * 32
        + (this.stars[i].initX > 0.5 ? (1 - this.stars[i].x) : (this.stars[i].x)) * 160
      ).toString(16).padStart(2, "0");
      ctx.fillRect(this.stars[i].x  * this.canvas.width, this.stars[i].y * this.canvas.height / 4 * 3, this.stars[i].scale * this.canvas.width * 0.01, this.stars[i].scale * this.canvas.height * 0.01);
      this.stars[i].pulse += 0.1 * this.stars[i].pulseFactor;
      if(
        this.stars[i].pulse > 1
        || this.stars[i].pulse < 0
      ) {
        this.stars[i].pulseFactor *= -1;
      }
      this.stars[i].y += this.stars[i].scale * 0.0025;
      this.stars[i].x -= (0.5 - this.stars[i].initX) * 0.01;
      if(
        this.stars[i].x > 1 
        || this.stars[i].x < 0 
        || this.stars[i].y > 1
      ) {
        this.stars[i].initX = (i % 2 == 0 ? 0 : 0.5) + Math.random() * 0.5;
        this.stars[i].initY = Math.random() * 0.5;
        this.stars[i].x = this.stars[i].initX;
        this.stars[i].y = this.stars[i].initY;
      }
    }
    const garbage = [];
    for(let i = 0; i < this.mountains.length; i++) {
      if(this.mountains[i].yLevel > 1) {
        garbage.push(i);
        continue;
      }
      this.mountains[i].yLevel += 0.002;
      ctx.fillStyle = "#9933CC" + Math.floor(this.mountains[i].yLevel * 80).toString(16).padStart(2, "0");
      let translateY = this.mountains[i].yLevel * this.canvas.height / 2;
      ctx.beginPath();
      ctx.moveTo(-this.canvas.width / 4, this.canvas.height / 2 + translateY);
      for(let j = 0; j < this.mountains[i].heights.length; j++) {
        ctx.lineTo(
          (this.canvas.width / this.mountains[i].heights.length * j) 
            + (this.canvas.width / this.mountains[i].heights.length * this.mountains[i].heights[j].x),
          this.canvas.height / 3 + this.mountains[i].heights[j].y * this.canvas.height / 12 + translateY
        )
      }
      ctx.lineTo(this.canvas.width + this.canvas.width / 4, this.canvas.height / 2 + translateY);
      ctx.lineTo(this.canvas.width, this.canvas.height + translateY);
      ctx.lineTo(0, this.canvas.height + translateY);
      ctx.closePath();
      ctx.fill();
    }
    for(let i = 0; i < garbage.length; i++) {
      this.mountains.splice(garbage[i], 1);
    }
    setTimeout(() => {
      requestAnimationFrame(this.renderFrame.bind(this));
    }, 1000 / this.frameRate);
  },
  load: function() {
    this.canvas = document.querySelector(".wallpaper");
    for(let i = 0; i < 16; i++) {
      let initX = (i % 2 == 0 ? 0 : 0.5) + Math.random() * 0.5;
      let initY = Math.random();
      this.stars.push({
        initX: initX,
        initY: initY,
        x: initX,
        y: initY,
        pulse: 0.5 + Math.random() * 0.5,
        pulseFactor: 1,
        scale: 0.5 + Math.random() * 0.5
      });
    }
    for(let i = 0; i < 10; i++) {
      let heights = [];
      for(let j = 0; j < Math.random() * 16; j++) {
        heights.push({
          x: Math.random(),
          y: Math.random()
        });
      }
      this.mountains.push({
        yLevel: i * 0.1,
        heights
      })
    }
  }
}; 

window.addEventListener("load", () => {
  WALLPAPER.load();
  setTimeout(WALLPAPER.renderFrame.bind(WALLPAPER), 256);
});
