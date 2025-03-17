import jobsData from '../../src/jobs.json';

export default function handler(req, res) {
  try {
    const { method } = req;
    let response;

    switch (method) {
      case 'GET': {
        const { _limit } = req.query;
        if (_limit) {
          response = jobsData.jobs.slice(0, parseInt(_limit));
        } else {
          response = jobsData.jobs;
        }
        return res.status(200).json(response);
      }
      case 'POST': {
        const newJob = req.body;
        const newId = String(jobsData.jobs.length + 1);
        const jobWithId = { ...newJob, id: newId };
        jobsData.jobs.push(jobWithId);
        return res.status(201).json(jobWithId);
      }
      case 'PUT': {
        const updatedJob = req.body;
        const index = jobsData.jobs.findIndex(job => job.id === updatedJob.id);
        if (index !== -1) {
          jobsData.jobs[index] = updatedJob;
          return res.status(200).json(updatedJob);
        }
        return res.status(404).json({ message: 'Job not found' });
      }
      case 'DELETE': {
        const { id } = req.query;
        const jobIndex = jobsData.jobs.findIndex(job => job.id === id);
        if (jobIndex !== -1) {
          jobsData.jobs.splice(jobIndex, 1);
          return res.status(200).json({ message: 'Job deleted' });
        }
        return res.status(404).json({ message: 'Job not found' });
      }
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
} 