const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('cue-card.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let status = null;
  let question = '';
  let answer = '';
  let card = {
    chapitre: '',
    question: '',
    answer: '',
  };
  let cards = {};
  for await (const line of rl) {
    if (line.startsWith('== Question ')) {
      status = 'q';
      card.chapitre = line.substring(14, 16);
    } else if (line.startsWith('== Réponse ')) {
      if (status === 'q') {
        card.question = question;
        question = '';
      }
      status = 'a';
    } else if (line.trim() === '') {
      if (status === 'q') {
        card.question = question.trim();
        question = '';
        status = null;
      } else if (status === 'a') {
        card.answer = answer.trim();
        answer = '';
        const chap = parseInt(card.chapitre);
        if (cards[chap] === undefined) {
          cards[chap] = {
            name: `Chapitre ${chap}`,
            questions: [],
          };
        }
        cards[chap].questions.push({
          question: card.question,
          answer: card.answer,
        });
        // cards.push(card);
        card = {
          chapitre: '',
          question: '',
          answer: '',
        }
        status = null;
      }
    } else {
      if (status === 'q') {
        question = question + ' ' + line;
      } else if (status === 'a') {
        answer = answer + ' ' + line;
      }
    }
  }
  console.log(JSON.stringify(Object.values(cards), 3));

}

processLineByLine();
