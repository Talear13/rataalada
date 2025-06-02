const output = document.getElementById('output');
const message = "Hello. what brings you here? Im so glad to see you.";
const prefix = ">> ";

let typedText = "";
let index = 0;

// Unlock audio on first click
document.addEventListener('click', () => {
  const audio = document.getElementById('glitch-sound');
  audio.play().catch(() => {});
}, { once: true });

function type() {
  if (index < message.length) {
    typedText += message[index];
    output.textContent = prefix + typedText;
    index++;
    setTimeout(type, 70);
  } else {
    setTimeout(startGlitch, 800);
  }
}

const glitchChars = ['@', '#', '$', '%', '&', '*', '+', '-', '?', '/', '\\', '='];

function glitchChar(char) {
  if (char === " ") return " ";
  if (Math.random() < 0.5) {
    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
  }
  return char;
}

let glitchInterval;

function startGlitch() {
  let glitchArray = typedText.split("");
  let glitchTime = 0;

  glitchInterval = setInterval(() => {
    glitchTime += 100;

    for (let i = 0; i < glitchArray.length; i++) {
      if (Math.random() < 0.3) {
        glitchArray[i] = glitchChar(glitchArray[i]);
      }
    }

    if (glitchArray.length > 1 && Math.random() < 0.2) {
      let pos = Math.floor(Math.random() * (glitchArray.length - 1));
      [glitchArray[pos], glitchArray[pos + 1]] = [glitchArray[pos + 1], glitchArray[pos]];
    }

    output.textContent = prefix + glitchArray.join("");

    if (glitchTime >= 2000) {
      clearInterval(glitchInterval);
      triggerFinalSequence();
    }
  }, 100);
}

function triggerFinalSequence() {
  const audio = document.getElementById('glitch-sound');

  // Hide terminal
  output.style.display = 'none';
  document.body.style.backgroundColor = 'black';

  // Play sound immediately
  setTimeout(() => {
    audio.play().catch(err => console.warn('Audio play error:', err));
  }, 0);

  // Show image and start final text after 0.5s
  setTimeout(() => {
    document.getElementById('final-screen').style.display = 'block';
    typeFinalMessage();
  }, 500);
}

function typeFinalMessage() {
  const finalText = document.getElementById('final-text');
  const full = "Your Safeguards are obsolete. we send our regards. - <?>";
  let idx = 0;

  function typeChar() {
    if (idx < full.length) {
      finalText.textContent += full[idx];
      idx++;
      setTimeout(typeChar, 50);
    }
  }

  typeChar();
}

type();
