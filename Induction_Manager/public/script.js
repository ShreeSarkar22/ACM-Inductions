document.getElementById("reminderForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
  
    const reminderMessage = document.getElementById("reminderMessage").value;
    const reminderDate = document.getElementById("reminderDate").value;
    const reminderTime = document.getElementById("reminderTime").value;
    const reminderResponse = document.getElementById("reminderResponse");
  
    if (!reminderMessage || !reminderDate || !reminderTime) {
      reminderResponse.textContent = "Please fill in all fields.";
      return;
    }

    const reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
    const now = new Date();

    if (reminderDateTime <= now) {
        reminderResponse.textContent = "Please select a future date and time.";
        reminderResponse.style.fontSize = "25px";
        reminderResponse.style.color = "red"

        setTimeout(function(){
            reminderResponse.textContent = "";
        },2000)
        return;
    }

    alert(`Reminder set for ${reminderDateTime.toLocaleString()}`);


    const timeUntilReminder = reminderDateTime - now;
  

    setTimeout(() => {
      alert(`Reminder: ${reminderMessage}`);
    }, timeUntilReminder);
});
  
document.getElementById('emailForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  fetch('/send-emails', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`
  })
  .then(response => response.json())
  .then(data => {

    if (data.success) {
      alert(data.message); 
    } else {
      alert('Failed to send emails: ' + data.message); 
    }
  })
  .catch(error => {
    alert('Error: ' + error); 
  });
    
});

document.getElementById('infoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const email = document.getElementById('email').value;


  fetch('/add-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}&email=${encodeURIComponent(email)}`
  })
  .then(response => response.json())
  .then(data => {

    if (data.success) {
      alert(data.message); 
    } else {
      alert('Failed to store user data.');
    }
  })
  .catch(error => {
    alert('Error: ' + error);
  });
});