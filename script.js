const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

toggle?.addEventListener("click", () => {
  root.classList.toggle("light");
  toggle.textContent = root.classList.contains("light") ? "dark" : "light";
});

document.querySelectorAll(".row-top").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".row")?.classList.toggle("open");
  });
});

const honorOutput = document.getElementById("honorOutput");

document.querySelectorAll(".honors-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    const active = button.classList.contains("active");

    document.querySelectorAll(".honors-grid button").forEach((x) => {
      x.classList.remove("active");
    });

    if (active) {
      if (honorOutput) honorOutput.innerHTML = "";
      return;
    }

    button.classList.add("active");

    if (honorOutput) {
      honorOutput.innerHTML = button.dataset.detail || "";
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const canvas = document.getElementById("stars");
const ctx = canvas?.getContext("2d");
let stars = [];

function reset() {
  if (!canvas) return;

  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;

  stars = Array.from(
    { length: Math.min(58, Math.floor(innerWidth / 22)) },
    () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: (Math.random() * 1.2 + 0.35) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.08 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.08 * devicePixelRatio,
      a: Math.random() * 0.38 + 0.16
    })
  );
}

function frame() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const light = root.classList.contains("light");

  for (const s of stars) {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0) s.x = canvas.width;
    if (s.x > canvas.width) s.x = 0;
    if (s.y < 0) s.y = canvas.height;
    if (s.y > canvas.height) s.y = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = light
      ? `rgba(49, 92, 255, ${s.a * 0.34})`
      : `rgba(190, 210, 255, ${s.a})`;
    ctx.fill();
  }

  requestAnimationFrame(frame);
}

reset();
frame();
addEventListener("resize", reset);
