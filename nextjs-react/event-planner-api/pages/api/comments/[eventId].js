import {
  connectDB,
  getAllDocuments,
  insertDocument,
} from '../../../helpers/db-util';

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ message: 'DB connection failed' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email.includes('@') || !name || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: 'Successfully added a comment', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Data insert failed' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch comments' });
    }
  }
  client.close();
};

export default handler;
