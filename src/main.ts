import { Cluster } from 'puppeteer-cluster';
import { runTypeTextTest } from './tests/type-text.js';

// CodePair Share URL
const DOCUMENT_URL = `http://localhost:5173/devleejb/671b7aba1bbee1535b53518d/share?token=xscexh`;

const main = async (): Promise<void> => {
  // # of Users
  const maxConcurrency = 30;

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency,
    puppeteerOptions: {
      headless: true, // If true, the browser is not shown
      args: [`--window-size=${1680},${970}`],
    },
    timeout: 999999999,
  });

  for (let i = 0; i < maxConcurrency; i++) {
    await cluster.queue(DOCUMENT_URL, runTypeTextTest);
  }

  await cluster.idle();
  await cluster.close();
};

main();
