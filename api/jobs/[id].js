const jobs = [
  {
    "id": "1",
    "title": "Senior React Developer",
    "type": "Full-Time",
    "location": "Boston, MA",
    "description": "We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript, with experience working with modern JavaScript frameworks such as React or Angular.",
    "salary": "$70K - $80K",
    "company": {
      "name": "NewTek Solutions",
      "description": "NewTek Solutions is a leading technology company specializing in web development and digital solutions. We pride ourselves on delivering high-quality products and services to our clients while fostering a collaborative and innovative work environment.",
      "contactEmail": "contact@teksolutions.com",
      "contactPhone": "555-555-5555"
    }
  },
  {
    "id": "2",
    "title": "Front-End Engineer (React & Redux)",
    "type": "Full-Time",
    "location": "Miami, FL",
    "description": "Join our team as a Front-End Developer in sunny Miami, FL. We are looking for a motivated individual with a passion for crafting beautiful and responsive web applications. Experience with UI/UX design principles and a strong attention to detail are highly desirable.",
    "salary": "$70K - $80K",
    "company": {
      "name": "Veneer Solutions",
      "description": "Veneer Solutions is a creative agency specializing in digital design and development. Our team is dedicated to pushing the boundaries of creativity and innovation to deliver exceptional results for our clients.",
      "contactEmail": "contact@loremipsum.com",
      "contactPhone": "555-555-5555"
    }
  },
  {
    "id": "3",
    "title": "React.js Dev",
    "type": "Full-Time",
    "location": "Brooklyn, NY",
    "description": "Are you passionate about front-end development? Join our team in vibrant Brooklyn, NY, and work on exciting projects that make a difference. We offer competitive compensation and a collaborative work environment where your ideas are valued.",
    "salary": "$70K - $80K",
    "company": {
      "name": "Dolor Cloud",
      "description": "Dolor Cloud is a leading technology company specializing in digital solutions for businesses of all sizes. With a focus on innovation and customer satisfaction, we are committed to delivering cutting-edge products and services.",
      "contactEmail": "contact@dolorsitamet.com",
      "contactPhone": "555-555-5555"
    }
  }
];

module.exports = function handler(req, res) {
  try {
    const { method } = req;
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Job ID is required' });
    }

    const job = jobs.find(job => job.id === id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    switch (method) {
      case 'GET': {
        return res.status(200).json(job);
      }
      case 'PUT':
      case 'DELETE': {
        return res.status(405).json({ 
          message: 'This is a read-only API. Modifications are not supported in this version.' 
        });
      }
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
} 