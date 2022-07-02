import * as express from 'express';
import queues from 'src/queues';
const router = express.Router();

const getPing = async (_req, res) => {
  const body = { message: 'hello' };
  return res.send(body).status(200);
};

const postLog = async (req, res) => {
  const body = { message: req.body.message };
  await queues.log.add(body);
  return res.send(body).status(200);
};

const postEmail = async (req, res) => {
  const body = { message: req.body.message };
  await queues.email.add(body);
  return res.send(body).status(200);
};

const postCandidates = async (req, res) => {
  const body: { 
    partyNumber: number, 
    name: string,
    photo: string
  } = req.body;
  await queues.canidate.add(body);
  return res.send(body).status(200);
};

const postVote = async (req, res) => {
  const body: { 
    partyNumber: number,
  } = req.body;
  await queues.vote.add(body);
  return res.send(body).status(200);
};
 
router.get('/', getPing);
router.post('/log', postLog);
router.post('/email', postEmail);
router.post('/candidates', postCandidates);
router.post('/votes', postVote);

export default router;
