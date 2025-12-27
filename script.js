// Load Data on Startup
document.addEventListener('DOMContentLoaded', () => {
   updateWorkoutUI();

   // Load saved theme
   if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
      document.getElementById('themeicon').classList.replace('fa-moon', 'fa-sun');
   }
});

// BMI Calculation
function calculateBMI() {
   const weight = document.getElementById('weight').value;
   const height = document.getElementById('height').value / 100;
   const BMIValue = document.getElementById('bmi-value');
   const Health = document.getElementById('bmi-status');

   if (weight > 0 && height > 0) {
      const bmi = (weight / (height * height)).toFixed(2);
      BMIValue.innerText = bmi;

      if (bmi < 18.5) { Health.innerText = "Underweight"; BMIValue.style.color = "orange"; }
      else if (bmi < 25) { Health.innerText = "Healthy"; BMIValue.style.color = "#00ff88"; }
      else { Health.innerText = "Overweight"; BMIValue.style.color = "#ff4b2b"; }
   }
}

// Workout card setting
const workoutForm = document.getElementById('workoutform');

workoutForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const workout = {
      id: Date.now(),
      name: document.getElementById('excercise').value,
      sets: document.getElementById('sets').value,
      reps: document.getElementById('reps').value,
      cat: document.getElementById('category').value
   };

   let list = JSON.parse(localStorage.getItem('workouts')) || [];
   list.push(workout);
   localStorage.setItem('workouts', JSON.stringify(list));

   workoutForm.reset();
   updateWorkoutUI();
});

function updateWorkoutUI() {
   const list = JSON.parse(localStorage.getItem('workouts')) || [];
   const container = document.getElementById('pastworkouts');
   container.innerHTML = "";

   list.forEach(item => {
      const el = document.createElement('div');
      el.className = 'pastworkouts';
      el.innerHTML = 
      `<div>
            <strong>${item.name}</strong>
            <br>
            <small>${item.sets} x ${item.reps} (${item.cat})</small>
         </div>
       <button onclick="deleteWorkout(${item.id})" style="color:red; background:none; border:none; cursor:pointer;">Delete</button>`;
      container.appendChild(el);
   });

   document.getElementById('total-count').innerText = list.length;

// Update Progress Bar (Goal = 5)
   const goal = 5;
   const percent = Math.min((list.length / goal) * 100, 100);
   document.querySelector('.progress').style.width = percent + "%";
   document.querySelector('.percent').innerText = Math.floor(percent) + "%";
}

function deleteWorkout(id) {
   let list = JSON.parse(localStorage.getItem('workouts')).filter(i => i.id !== id);
   localStorage.setItem('workouts', JSON.stringify(list));
   updateWorkoutUI();
}

// Theme button
function toggleTheme() {
   const body = document.body;
   const icon = document.getElementById('themeicon');
   body.classList.toggle('light-mode');

   const isLight = body.classList.contains('light-mode');
   icon.classList.replace(isLight ? 'fa-moon' : 'fa-sun', isLight ? 'fa-sun' : 'fa-moon');
   localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
// Habit tab
function initHabits() {
   // Water consumption
   const water = localStorage.getItem('waterCount') || 0;
   document.getElementById('water-count').innerText = water;

   //Habits
   const habits = ['habit1', 'habit2', 'habit3', 'habit4' ];
   habits.forEach(id => {
      const status = localStorage.getItem(id) === 'true';
      document.getElementById(id).checked = status;
   });
}

// Water consumption
function changeWater(amount) {
   let current = parseInt(localStorage.getItem('waterCount')) || 0;
   current = Math.max(0, current + amount); // Prevent negative numbers
   localStorage.setItem('waterCount', current);
   document.getElementById('water-count').innerText = current;
}

// Habits
function toggleHabit(id) {
   const isChecked = document.getElementById(id).checked;
   localStorage.setItem(id, isChecked);
}

document.addEventListener('DOMContentLoaded', () => {
   initHabits();
});

function updateGoalProgress() {
   const workouts = JSON.parse(localStorage.getItem('workouts')) || [];

   const dailyGoal = 5;

   // Calculate percentage (capped at 100)
   const percentage = Math.min((workouts.length / dailyGoal) * 100, 100);

   // Change in UI
   const bar = document.getElementById('goalbar');
   const text = document.getElementById('goalpercent');

   if (bar && text) {
      bar.style.width = percentage + "%";
      text.innerText = Math.floor(percentage) + "%";

      if (percentage >= 100) {
         bar.style.background = "var(--greencol)";
      }
   }
}
