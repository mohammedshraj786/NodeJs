const studentForm = document.getElementById('studentForm');

const studentsList = document.getElementById('students');

const apiUrl = 'http://localhost:3000'; 




studentForm.addEventListener('submit', async (event) => 
{
  event.preventDefault();

  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);

  try {
    const response = await fetch(`${apiUrl}/students`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, age })
    });

    if (response.status === 200)
     {
      const newStudent = await response.json();
      appendStudentToList(newStudent);
      studentForm.reset();
    }
  } 
  catch (error)
   {
    console.error('Error adding student:', error);
  }
});

//for getting the json data and store in list
async function fetchStudents() {
  try {
    const response = await fetch(`${apiUrl}/students`);
    console.log(response);
    const studentsData = await response.json();
    console.log(studentsData);

    studentsList.innerHTML = '';
    for (const studentId in studentsData) {
      if (studentsData.hasOwnProperty(studentId)) 
      {
        const student = studentsData[studentId];
        appendStudentToList(student);
      }
    }
  } 
  catch (error)
   {
    console.error('Error fetching students:', error);
  }
}


function appendStudentToList(student) 
{
  const li = document.createElement('li');

  li.textContent = `Name:  ${student.name}       - Age:  ${student.age} `;
 const button = document.createElement("button");
//  const update=document.createElement("button");
 button.textContent='Delete';
//  button.textContent='update';
 const h1=document.createElement("h1");
  studentsList.append(li,button,h1);
}

document.getElementById('downloadAll').addEventListener('click', async () => 
{
  try {
    const response = await fetch(`${apiUrl}/students`);
    const studentsData = await response.json();
    const studentsDataArray = Object.values(studentsData); 
    console.log(studentsDataArray);
    const studentsDataFormatted = JSON.stringify(studentsDataArray, null, 2);
    console.log(studentsDataFormatted);
    // downloadFile('all_students.json', studentsDataArray);
    downloadFile('all_students.json', studentsDataFormatted);

  } 
  catch (error) 
  {
    console.error('Error downloading students data:', error);
  }
});

function downloadFile(filename, data) 
{
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

fetchStudents();




// for deleting the particualar student via the student id

