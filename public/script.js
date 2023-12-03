document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const board = document.getElementById('board');
  let playerColor;
  let currentSquareIndex;
  let isQuestionPending = false;

  // Receive the player's color from the server
  socket.on('initColor', (data) => {
    playerColor = data.color;
  });

  // Define an array of 100 words and their translations
  const words = [
    { german: 'das Haus', english: 'house' },
    { german: 'der Hund', english: 'dog' },
    { german: 'die Katze', english: 'cat' },
    { german: 'der Tisch', english: 'table' },
    { german: 'die Sonne', english: 'sun' },
    { german: 'der Apfel', english: 'apple' },
    { german: 'das Auto', english: 'car' },
    { german: 'die Blume', english: 'flower' },
    { german: 'der Ball', english: 'ball' },
    { german: 'der Stuhl', english: 'chair' },
    { german: 'das Buch', english: 'book' },
    { german: 'der Baum', english: 'tree' },
    { german: 'der Schlüssel', english: 'key' },
    { german: 'die Lampe', english: 'lamp' },
    { german: 'das Fenster', english: 'window' },
    { german: 'die Uhr', english: 'clock' },
    { german: 'die Hand', english: 'hand' },
    { german: 'der Computer', english: 'computer' },
    { german: 'das Telefon', english: 'phone' },
    { german: 'das Mädchen', english: 'girl' },
    { german: 'der Junge', english: 'boy' },
    // Continue adding words as needed
    // ...
    { german: 'der Fluss', english: 'river' },
    { german: 'die Brücke', english: 'bridge' },
    { german: 'der Berg', english: 'mountain' },
    { german: 'die Wolke', english: 'cloud' },
    { german: 'der Garten', english: 'garden' },
    { german: 'die Tür', english: 'door' },
    { german: 'die Straße', english: 'street' },
    { german: 'das Zimmer', english: 'room' },
    { german: 'die Farbe', english: 'color' },
    { german: 'der Markt', english: 'market' },
    { german: 'die Tasche', english: 'bag' },
    { german: 'das Tier', english: 'animal' },
    { german: 'die Pflanze', english: 'plant' },
    { german: 'der Freund', english: 'friend' },
    { german: 'die Freundin', english: 'friend (female)' },
    { german: 'das Gesicht', english: 'face' },
    { german: 'der Himmel', english: 'sky' },
    { german: 'die Erde', english: 'earth' },
    { german: 'die Insel', english: 'island' },
    { german: 'der Vogel', english: 'bird' },
    { german: 'die Uhrzeit', english: 'time' },
    { german: 'das Restaurant', english: 'restaurant' },
    { german: 'die Frage', english: 'question' },
    { german: 'die Antwort', english: 'answer' },
    { german: 'die Woche', english: 'week' },
    { german: 'das Jahr', english: 'year' },
    { german: 'das Wetter', english: 'weather' },
    { german: 'die Jahreszeit', english: 'season' },
    { german: 'die Minute', english: 'minute' },
    { german: 'der Moment', english: 'moment' },
    { german: 'der Film', english: 'movie' },
    { german: 'die Musik', english: 'music' },
    { german: 'das Konzert', english: 'concert' },
    { german: 'der Kaffee', english: 'coffee' },
    { german: 'der Tee', english: 'tea' },
    { german: 'das Wasser', english: 'water' },
    { german: 'die Milch', english: 'milk' },
    { german: 'der Saft', english: 'juice' },
    { german: 'das Obst', english: 'fruit' },
    { german: 'das Gemüse', english: 'vegetable' },
    { german: 'die Pizza', english: 'pizza' },
    { german: 'das Eis', english: 'ice cream' },
    { german: 'der Kuchen', english: 'cake' },
    { german: 'der Salat', english: 'salad' },
    { german: 'das Frühstück', english: 'breakfast' },
    { german: 'das Mittagessen', english: 'lunch' },
    { german: 'das Abendessen', english: 'dinner' },
    { german: 'die Arbeit', english: 'work' },
    { german: 'die Schule', english: 'school' },
    { german: 'das Buch', english: 'book' },
    { german: 'der Lehrer', english: 'teacher' },
    { german: 'die Schülerin', english: 'student (female)' },
    { german: 'der Schüler', english: 'student (male)' },
    { german: 'die Universität', english: 'university' },
    { german: 'die Bibliothek', english: 'library' },
    { german: 'das Telefon', english: 'telephone' },
    { german: 'die Kamera', english: 'camera' },
    { german: 'der Computer', english: 'computer' },
    { german: 'das Handy', english: 'mobile phone' },
  { german: 'die Sonnenbrille', english: 'sunglasses' },
  { german: 'der Regen', english: 'rain' },
  { german: 'die Stadtmitte', english: 'downtown' },
  { german: 'die Straßenbahn', english: 'tram' },
  { german: 'die Bank', english: 'bank' },
  { german: 'der Markt', english: 'market' },
  { german: 'der Park', english: 'park' },
  { german: 'die Bibliothek', english: 'library' },
  { german: 'das Museum', english: 'museum' },
  { german: 'der Bahnhof', english: 'train station' },
  { german: 'die Post', english: 'post office' },
  { german: 'der Supermarkt', english: 'supermarket' },
  { german: 'der Strand', english: 'beach' },
  { german: 'der See', english: 'lake' },
  { german: 'die Brille', english: 'glasses' },
  { german: 'der Kühlschrank', english: 'refrigerator' },
  { german: 'der Garten', english: 'garden' },
  { german: 'der Zahnarzt', english: 'dentist' },
  { german: 'die Apotheke', english: 'pharmacy' },
  { german: 'das Krankenhaus', english: 'hospital' },
  ];

  // Create squares for each word
  for (let i = 0; i < words.length; i++) {
    const square = document.createElement('div');
    square.className = 'square';
    square.addEventListener('click', () => {
      if (!isQuestionPending) {
        currentSquareIndex = i;
        askQuestion(words[i]);
      }
    });
    board.appendChild(square);
  }

  socket.on('updateSquare', (data) => {
    const square = document.getElementsByClassName('square')[data.index];
    square.style.backgroundColor = data.color;
  });

  function askQuestion(word) {
    isQuestionPending = true;
    const userAnswer = prompt(`Translate: "${word.english}" to German with an article`);
    
    const isCorrect = isCorrectAnswer(userAnswer, word.german);

    // Check if the answer was correct before emitting the event
    if (isCorrect) {
      socket.emit('squareClick', { index: currentSquareIndex, isCorrect: isCorrect });
    }

    isQuestionPending = false;
    currentSquareIndex = null;
  }

  function isCorrectAnswer(answer, correctAnswer) {
    return answer && answer.toLowerCase() === correctAnswer.toLowerCase();
  }
});

