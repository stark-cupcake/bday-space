const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const wishMessage = document.getElementById("wishMessage");
  const nextPageBtn = document.getElementById("nextPageBtn");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStars();
  }

  let stars = [];
  let numStars = 206 * 3;

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.1 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.01 + 0.02,
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    });
  }

  function twinkleStars() {
    stars.forEach(star => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0) {
        star.speed *= -1;
      }
    });
    drawStars();
    requestAnimationFrame(twinkleStars);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  twinkleStars();

  let shootingStars = [];

  function createShootingStar() {
    if (shootingStars.length === 0) {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 6 + 4,
        opacity: 1
      });
      
      wishMessage.style.opacity = "1";
      setTimeout(() => {
        wishMessage.style.opacity = "0";
      }, 2000);
    }
  }

  function drawShootingStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    shootingStars.forEach((star, index) => {
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(star.x - star.length, star.y + star.length);
      ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      star.x -= star.speed;
      star.y += star.speed;
      star.opacity -= 0.02;

      if (star.opacity <= 0) {
        shootingStars.splice(index, 1);
      }
    });
  }

  function animateShootingStars() {
    drawShootingStars();
    requestAnimationFrame(animateShootingStars);
  }

  setTimeout(() => {
  createShootingStar();
  setInterval(createShootingStar, 10000);
}, 4000);

  animateShootingStars();

  document.addEventListener("DOMContentLoaded", function () {
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");
  
    let isPlaying = false;
  
    musicToggle.addEventListener("click", function () {
      if (isPlaying) {
        bgMusic.pause();
        musicToggle.textContent = "Play Music 🎵";
      } else {
        bgMusic.play();
        musicToggle.textContent = "Pause Music ⏸️";
      }
      isPlaying = !isPlaying;
    });
  });
   nextPageBtn.addEventListener("click", () => {
    window.location.href = "page2.html";
  });

