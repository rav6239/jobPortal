import jobs from '../../src/jobs.json';

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  const job = jobs.find(job => job.id === parseInt(id));

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  switch (method) {
    case 'GET':
      res.status(200).json(job);
      break;
    case 'PUT':
      // Handle update logic here
      res.status(200).json(job);
      break;
    case 'DELETE':
      // Handle delete logic here
      res.status(200).json({ message: 'Job deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 