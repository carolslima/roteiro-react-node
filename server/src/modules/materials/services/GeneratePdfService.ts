import { injectable } from 'tsyringe';
import puppeteer from 'puppeteer';

import AppError from '@shared/errors/AppError';

interface IRequest {
  year: string;
  month: string;
  day: string;
  selectorUser: string;
  selectorPass: string;
  selectorSubmit: string;
}

@injectable()
class GeneratePdfService {
  async execute({
    year,
    month,
    day,
    selectorUser,
    selectorPass,
    selectorSubmit,
  }: IRequest): Promise<Buffer> {
    if (!year && !month && !day) {
      throw new AppError('Unauthorized', 401);
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const page2 = await browser.newPage();

    await page.goto(`${process.env.APP_WEB_URL}`);
    await page.click(selectorUser);
    await page.keyboard.type(`${process.env.BOT_PDF_USER}`);
    await page.click(selectorPass);
    await page.keyboard.type(`${process.env.BOT_PDF_PASS}`);
    await page.click(selectorSubmit);
    await page.waitForNavigation();

    await page2.goto(
      `${process.env.APP_WEB_URL}/print/${year}/${month}/${day}`,
      {
        waitUntil: 'networkidle0',
      },
    );

    const pdf = await page2.pdf({
      printBackground: true,
      format: 'letter',
    });

    await browser.close();

    return pdf;
  }
}

export default GeneratePdfService;
