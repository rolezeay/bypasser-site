const lowercaseBypasses = {
  "fucking": "fบcking",
  "fuck": "fบck",
  "fucked": "fบcked",
  "fuckidy": "fบckidy",
  "niggerest": "ⴖiggerest",
  "nigger": "ⴖigger",
  "niggers": "ⴖiggers",
  "nigga": "ⴖigga",
  "niggas": "ⴖiggas",
  "ass": "аรร",
  "retard": "ꞅetard",
  "bastard": "bลstลrd",
  "dumbass": "dบmbаรร",
  "bitch": "bi〪tch",
  "cunt": "cบnt",
  "hoe": "һoe",
  "hoes": "һoes",
  "pussy": "pบssy",
  "discord": "disִcord",
  "shit": "shi〪t",
  "raped": "rаped",
  "rape": "rаpe",
  "hitler": "hi〪tler",
  "porn": "porⴖ",
  "pornhub": "porⴖhub",
  "dick": "diᲃk",
  "dicks": "diᲃks",
  "dildo": "dil〪do",
  "dildos": "dil〪dos",
  "kill": "kіll",
  "yourself": "yoบrself",
  "faggot": "fลggot",
  "slut": "slบt",
  "sex": "sеִx",
  "cum": "cบm",
  "boobs": "bоִоִbs",
  "boob": "bоִоִb",
  "lmao": "lmao",
  "lmfao": "lmfao",
  "suck": "sบck",
  "sucker": "sบcker",
  "dirty": "dіrty",
  "fat": "fลt",
  "raping": "rลping"
};

const uppercaseBypasses = {
  "FUCKING": "ꜰUCKING",
  "FUCK": "ꜰUCK",
  "FUCKED": "ꜰUCKED",
  "FUCKIDY": "ꜰUCKIDY",
  "BITCH": "BI〪TCH",
  "ASS": "AS〪S",
  "NIGGA": "NI〪GGA",
  "NIGGAS": "NI〪GGAS",
  "NIGGER": "NI〪GGER",
  "NIGGEREST": "NI〪GGEREST",
  "NIGGERS": "NI〪GGERS",
  "HOE": "HOE",
  "HOES": "HOES",
  "CUNT": "CUN〪T",
  "DICK": "DI〪CK",
  "HITLER": "HI〪TLER",
  "PORN": "POR〪N",
  "RAPING": "RАPI〪NG",
  "RAPED": "RАPED",
  "RAPE": "RАPE",
  "FAGGOT": "ꜰAGGOT",
  "DISCORD": "DISִCORD",
  "SLUT": "SL〪UT",
  "SEX": "SЕִX",
  "LMAO": "LMAO",
  "LMFAO": "LMFAO",
  "DIRTY": "DІRTY",
  "PUSSY": "Р〪USSY"
};

function transformText(inputText) {
  const transformedWords = [];
  const words = inputText.split(/\s+/);

  for (let word of words) {
    let trailingPunct = '';
    let coreWord = word;
    const punctMatch = word.match(/[\p{P}]+$/u);
    if (punctMatch) {
      trailingPunct = punctMatch[0];
      coreWord = word.slice(0, -trailingPunct.length);
    }

    const lowered = coreWord.toLowerCase();

    let replacedWord = coreWord;
    let found = false;

    if (coreWord.toUpperCase() === coreWord && coreWord.length > 1) {
      for (const bad in uppercaseBypasses) {
        if (coreWord.includes(bad)) {
          replacedWord = coreWord.replace(bad, uppercaseBypasses[bad]);
          found = true;
          break;
        }
      }
    }

    if (!found) {
      for (const bad in lowercaseBypasses) {
        if (lowered.includes(bad)) {
          const index = lowered.indexOf(bad);
          replacedWord = coreWord.substring(0, index) + lowercaseBypasses[bad] + coreWord.substring(index + bad.length);
          found = true;
          break;
        }
      }
    }

    replacedWord += trailingPunct;
    transformedWords.push(replacedWord);
  }

  return transformedWords.join("\x1F");
}

const inputArea = document.getElementById('inputText');
const outputDiv = document.getElementById('outputText');
const copyBtn = document.getElementById('copyBtn');

inputArea.addEventListener('input', () => {
  outputDiv.textContent = transformText(inputArea.value);
});

copyBtn.addEventListener('click', () => {
  const textToCopy = outputDiv.textContent;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy Converted Text', 1500);
    });
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      copyBtn.textContent = successful ? 'Copied!' : 'Failed to copy';
      setTimeout(() => copyBtn.textContent = 'Copy Converted Text', 1500);
    } catch {
      copyBtn.textContent = 'Failed to copy';
      setTimeout(() => copyBtn.textContent = 'Copy Converted Text', 1500);
    }

    document.body.removeChild(textArea);
  }
});
