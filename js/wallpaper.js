

const WALLPAPER = {
  canvas: undefined,
  blur: 28,
  frameCount: 0,
  frameRate: 24,
  mountainMaxHeights: 32,
  mountainMaxHeightFactor: 0.1,
  mountainSpawnInterval: 96,
  mountainBlendAlpha: 160,
  mountainMotion: 0.002,
  mountainAreaFactor: 0.75,
  starScaleFactor: 0.025,
  starMotionX: 0.01,
  starMotionY: 0.0025,
  mountains: [],
  stars: [],
  newMountainHeights: function() {
    const heights = [];
    for(let _ = 0; _ < Math.random() * this.mountainMaxHeights; _++)
    heights.push({
      x: Math.random(),
      y: Math.random()
    });
    return heights;
  },
  renderFrame: function() {

    this.canvas.width = this.canvas.clientWidth / WALLPAPER.blur;
    this.canvas.height = this.canvas.clientHeight / WALLPAPER.blur;
    this.frameCount += 1;

    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "#232122";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    if(this.frameCount % this.mountainSpawnInterval == 0)
    this.mountains.push({
      yLevel: 0,
      heights: this.newMountainHeights()
    });
    
    for(let i = 0; i < this.stars.length; i++) {
      ctx.fillStyle = "#FF99FF" + Math.floor(
        this.stars[i].pulse * 64 
        + this.stars[i].scale * 32
        + (this.stars[i].initX > 0.5 ? (1 - this.stars[i].x) : (this.stars[i].x)) * 160
      ).toString(16).padStart(2, "0");
      ctx.fillRect(
        this.stars[i].x  * this.canvas.width, 
        this.stars[i].y * this.canvas.height * (1 - this.mountainAreaFactor) * 2, 
        this.stars[i].scale * this.canvas.width * this.starScaleFactor, 
        this.stars[i].scale * this.canvas.height * this.starScaleFactor
      );
      this.stars[i].pulse += 0.1 * this.stars[i].pulseFactor;
      if(
        this.stars[i].pulse > 1
        || this.stars[i].pulse < 0
      ) {
        this.stars[i].pulseFactor *= -1;
      }
      this.stars[i].y += this.stars[i].scale * this.starMotionY;
      this.stars[i].x -= (0.5 - this.stars[i].initX) * this.starMotionX;
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
      this.mountains[i].yLevel += this.mountainMotion;
      ctx.fillStyle = "#9933CC" + Math.floor(
        this.mountains[i].yLevel * this.mountainBlendAlpha 
      ).toString(16).padStart(2, "0");
      const baseY = this.canvas.height * (1 - this.mountainAreaFactor);
      const translateY = this.mountains[i].yLevel * (this.canvas.height * this.mountainAreaFactor);
      ctx.beginPath();
      ctx.moveTo(-this.canvas.width / 4, baseY + translateY);
      for(let j = 0; j < this.mountains[i].heights.length; j++) {
        ctx.lineTo(
          (this.canvas.width / this.mountains[i].heights.length * j) 
            + (this.canvas.width / this.mountains[i].heights.length * this.mountains[i].heights[j].x),
            baseY + this.mountains[i].heights[j].y * this.canvas.height * -this.mountainMaxHeightFactor + translateY
        )
      }
      ctx.lineTo(this.canvas.width + this.canvas.width / 4, baseY + translateY);
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
    for(let i = 0; i < 10; i++)
    this.mountains.push({
      yLevel: i * 0.1,
      heights: this.newMountainHeights()
    })
  }
}; 

window.addEventListener("load", () => {
  WALLPAPER.load();
  setTimeout(WALLPAPER.renderFrame.bind(WALLPAPER), 256);
});
