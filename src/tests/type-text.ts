import { TaskFunction } from 'puppeteer-cluster/dist/Cluster.js';

const EDITOR_SELECTOR = '.cm-content.cm-lineWrapping';
const targetText =
  `Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent tincidunt eu imperdiet nam dolor porta congue, odio ridiculus. 
Lacinia posuere pretium donec amet sociosqu suspendisse egestas. Torquent taciti metus tincidunt molestie at eros rhoncus volutpat. 
Pretium senectus turpis dis magna penatibus; dui felis molestie. Viverra senectus maecenas, primis tellus eget facilisi.
Enim posuere auctor eleifend odio praesent porta taciti massa.

`.repeat(10);

export const runTypeTextTest: TaskFunction<string, void> = async ({
  page,
  data: url,
}) => {
  await page.goto(url); // Move to URL

  await page.waitForSelector(EDITOR_SELECTOR); // Wait for the editor ready
  await page.click(EDITOR_SELECTOR); // Click editor

  // Add spaces between the other crawlers
  const enterCount = 5;
  for (let i = 0; i < enterCount; i++) {
    await page.keyboard.press('Enter');
  }

  // Wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Type one by one
  for (const c of targetText) {
    await page.keyboard.type(c, { delay: 300 });
  }
};
