c.style.background = '#0f7';
c.width = 900;
for (n = 4000; n--;) {
  x.lineTo(450 + func_S(n * 94.9 + t / 6) * 450, 250 + func_C(n) * 79 * (4 + func_S(t * 8 + n) / 2));
}
x.fill().toString();
