import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, members, distributionLogs } from '@tcs-network/shared';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'members' });
});

app.get('/api/members', async (req, res) => {
  try {
    const allMembers = await db.select().from(members);
    res.json(allMembers);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

app.get('/api/distributions', async (req, res) => {
  try {
    const distributions = await db.select().from(distributionLogs).limit(100);
    res.json(distributions);
  } catch (error) {
    console.error('Error fetching distributions:', error);
    res.status(500).json({ error: 'Failed to fetch distributions' });
  }
});

app.listen(PORT, () => {
  console.log(`Members API running on port ${PORT}`);
});
