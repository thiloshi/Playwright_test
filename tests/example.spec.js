// @ts-check
import { test, expect } from '@playwright/test';

// ✅ Run ONLY on WebKit
test.use({ browserName: 'webkit' });

const url = 'https://www.swifttranslator.com/';
const inputBox = 'textarea';
const outputBox =
  'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap.overflow-y-auto';

// ----------------------------------------------------
// ALL TEST INPUTS (NO MANUAL POS / NEG)
// ----------------------------------------------------

const allInputs = [
  'samaavenna mama late vunaa',
  'Issarahata yanna',
  'vaessa vunoth api gedhara innavaa',
  'mata apple kg dhekak oonee',
  'mama dhaen phone eka use karanavaa',
  'karunaakara nimalta message ekak yavanna',
  'api heta yanne naehae',
  'meeting eka patan gannavaa',
  'hari mama balannam',
  'ammaa hospital yanna hadhannee',
  'oyaa enavanam mama balaa innavaa',
  'mata OTP eka evanna',
  'mama office yanna kalin email ekak check karanavaa',
  'eyaa gedhara giyaa',
  'ela machan',
  'api trip eka kandy valata yamudha',
  'hari hari',
  'aayuboovan',
  'mata nidhimathayi',
  'vahaama enna',
  'Zoom meeting ekak thiyennee',
  'parissamen yanna',
  'mata poddak kathaa karanna puluvandha',
  'traffic eka thibboth mama late venavaa',

  // tricky / invalid
  '<p>mama gedhara yanavaa</p>',
  'mama g#dhara yanavaa',
  'please call me later',
  'mama-gedhara-yanavaa',
  'visit https://abc.com',
  'mama gedhara யனavaa',
  '123456',
  '2+2 hari lesa',
  'Call me @ 5pm',
  'mmata Rs.5000 vitharai thiyennee'
];

// ----------------------------------------------------
// AUTO CLASSIFICATION RULE
// ----------------------------------------------------

// @ts-ignore
function isNegativeInput(text) {
  const hasNumber = /\d/.test(text);
  const hasSymbol = /[^a-zA-Z\s]/.test(text);
  const hasUrl = /https?:\/\//i.test(text);
  const hasEnglishSentence = /call me|please|visit/i.test(text);
  const hasNonLatin = /[^\x00-\x7F]/.test(text);

  return hasNumber || hasSymbol || hasUrl || hasEnglishSentence || hasNonLatin;
}

// ----------------------------------------------------
// AUTO-GENERATED TESTS
// ----------------------------------------------------

for (const sentence of allInputs) {
  if (isNegativeInput(sentence)) {
    test(`NEG (auto) - Invalid input: "${sentence}"`, async ({ page }) => {
      await page.goto(url);
      await page.locator(inputBox).fill(sentence);

      await expect(page.locator(outputBox))
        .toHaveText('', { timeout: 15000 });
    });
  } else {
    test(`POS (auto) - Valid input: "${sentence}"`, async ({ page }) => {
      await page.goto(url);
      await page.locator(inputBox).fill(sentence);

      await expect(page.locator(outputBox)).toBeVisible();
    });
  }
}

// ----------------------------------------------------
// UI TEST
// ----------------------------------------------------

test('UI - Textarea accepts typing', async ({ page }) => {
  await page.goto(url);

  await page.locator(inputBox).type('mama gedhara yanavaa');

  await expect(page.locator(inputBox))
    .toHaveValue(/mama gedhara/);
});
