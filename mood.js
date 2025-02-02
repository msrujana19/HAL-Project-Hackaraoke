const insights = document.getElementById("insights");
const moodHistoryTable = document.getElementById("mood-history").getElementsByTagName('tbody')[0];

const moodMessages = {
  happy: "You're feeling joyful today! Keep smiling! 😊",
  calm: "You're at peace. Breathe and enjoy the moment. 😌",
  anxious: "It's okay to feel anxious. You are strong, and this will pass. 😰",
  sad: "You're not alone. It's okay to feel sad, and better days are coming. 😢",
  angry: "Take a deep breath. You are in control of your emotions. 😡"
};

const moodEmojis = {
  happy: "😊",
  calm: "😌",
  anxious: "😰",
  sad: "😢",
  angry: "😡"
};

// Load mood history from localStorage
let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];

function trackMood() {
  const mood = document.getElementById("mood").value;
  const energy = document.getElementById("energy").value;
  const gratitude = document.getElementById("gratitude").value.trim();
  const reflection = document.getElementById("reflection").value.trim();
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format

  if (!energy || energy <= 0 || energy > 5) {
    insights.textContent = "Please enter a valid energy level (1-5).";
    return;
  }

  // Create new mood entry
  const moodEntry = {
    date: dateString,
    mood: moodEmojis[mood], 
    energy: energy,
    gratitude: gratitude || "No gratitude noted",
    reflection: reflection || "No reflection",
    remarks: moodMessages[mood]
  };

  // Add to history
  moodHistory.push(moodEntry);
  localStorage.setItem('moodHistory', JSON.stringify(moodHistory));

  insights.textContent = moodMessages[mood];
  updateMoodHistoryTable();
}

function deleteMoodEntry(index) {
  moodHistory.splice(index, 1);
  localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  updateMoodHistoryTable();
}

function updateMoodHistoryTable() {
  moodHistoryTable.innerHTML = '';

  moodHistory.forEach((entry, index) => {
    const row = moodHistoryTable.insertRow();
    row.insertCell(0).textContent = entry.date;
    row.insertCell(1).textContent = entry.mood;
    row.insertCell(2).textContent = entry.energy;
    row.insertCell(3).textContent = entry.gratitude;
    row.insertCell(4).textContent = entry.reflection;
    row.insertCell(5).textContent = entry.remarks;

    // Create delete button
    const deleteCell = row.insertCell(6);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "🗑️ Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => deleteMoodEntry(index);
    deleteCell.appendChild(deleteButton);
  });
}

// Initialize table on page load
updateMoodHistoryTable();