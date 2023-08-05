const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn =document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: 'sad.jpg',
        text: "I'm sad"
    },
    {
        image: 'happy.jpg',
        text: "I'm happy"
    },
    {
        image: 'tired.jpg',
        text: "I'm tired"
    },
    {
        image: 'excited.jpg',
        text: "I'm excited"
    },
    {
        image: 'embarrassed.jpg',
        text: "I'm embarrassed"
    },
    {
        image: 'anxious.jpg',
        text: "I'm anxious"
    },
    {
        image: 'energized.jpg',
        text: "I'm energized"
    },
    {
        image: 'angry.jpg',
        text: "I'm angry"
    },
    {
        image: 'sick.jpg',
        text: "I'm sick"
    }
];

data.forEach(createBox);

//init speech sync
let message = new SpeechSynthesisUtterance();

//Create speech boxes
function createBox(item) {
    const box = document.createElement('div');

    const {image, text} = item;

    box.classList.add('box');
    box.innerHTML = `
      <img src="${image}" alt="${text}"/>
      <p class="info">${text}</p>
    `;

    // speak event
    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    })


    main.appendChild(box);
}


// Add voices to select list
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach((voice) => {
        let option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `
          ${voice.name} ${voice.lang}
        `

        voiceSelect.appendChild(option)
    })
}

//set message
function setTextMessage(text) {
    message.text = text;
}

//speak text
function speakText() {
    speechSynthesis.speak(message);
}

// set voice 
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

//Add event listener to toggle btn
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

//Add event listener to close button
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

//Voice changed
speechSynthesis.addEventListener('voiceschanged', getVoices)

// to change voice
voiceSelect.addEventListener('change', setVoice);

// read button event listener
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
})

getVoices();