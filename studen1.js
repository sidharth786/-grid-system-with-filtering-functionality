const express = require('express');

// Create an Express app
const app = express();

// Define a sample student data array
const students = [
  { id: 1, name: 'sidharth', totalMarks: 87 },
  { id: 2, name: 'rahul', totalMarks: 90 },
  { id: 3, name: 'mohit', totalMarks: 80 },
  // Add more student objects as needed
];

// Define an API endpoint for loading student details with pagination
app.get('/api/students', (req, res) => {
  // Parse pagination parameters from the request query
  const { page, pageSize } = req.query;
  const pageNumber = parseInt(page);
  const limit = parseInt(pageSize);

  // Calculate the start and end index for pagination
  const startIndex = (pageNumber - 1) * limit;
  const endIndex = startIndex + limit;

  // Retrieve the subset of student details based on pagination
  const paginatedStudents = students.slice(startIndex, endIndex);

  // Return the paginated student data as the API response
  res.json(paginatedStudents);
});

// Define an API endpoint for server-side filtering of student details
app.get('/api/students/filter', (req, res) => {
  // Parse filter parameters from the request query
  const { column, value } = req.query;

  // Filter the student data based on the provided column and value
  const filteredStudents = students.filter(student => {
    if (column === 'id') {
      return student.id === parseInt(value);
    } else if (column === 'name') {
      return student.name.toLowerCase().includes(value.toLowerCase());
    } else if (column === 'totalMarks') {
      return student.totalMarks >= parseInt(value);
    }
    return false;
  });

  // Return the filtered student data as the API response
  res.json(filteredStudents);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});