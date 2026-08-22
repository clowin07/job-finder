const fs = require('node:fs');

const API_URL = 'https://apis.data.go.kr/1051000/recruitment/list';
const OUTPUT_FILE = 'jobs.json';
const PAGE_SIZE = 100;
const MAX_JOBS = 300;
const NEW_RECRUITMENT_CODE = 'R2010';
const YOUTH_INTERNSHIP_CODES = new Set(['R1060', 'R1070']);

function loadEnvValue(name) {
  const envPath = '.env';
  if (!fs.existsSync(envPath)) throw new Error('.env 파일을 찾을 수 없습니다.');
  const line = fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .find((item) => item.trim().startsWith(`${name}=`));
  if (!line) throw new Error(`${name} 값이 .env에 없습니다.`);
  return line.slice(line.indexOf('=') + 1).trim();
}

function splitCodes(value) {
  return String(value || '').split(',').map((code) => code.trim()).filter(Boolean);
}

function isTargetJob(job) {
  const recruitmentCodes = splitCodes(job.recrutSe);
  const employmentCodes = splitCodes(job.hireTypeLst);
  return recruitmentCodes.includes(NEW_RECRUITMENT_CODE)
    || employmentCodes.some((code) => YOUTH_INTERNSHIP_CODES.has(code));
}

function removeContactFields(value) {
  if (Array.isArray(value)) return value.map(removeContactFields);
  if (!value || typeof value !== 'object') return value;

  return Object.fromEntries(Object.entries(value)
    .filter(([key]) => !/(담당|charger|contact.*(name|person)|tel|phone|email|e-mail|mail)/i.test(key))
    .map(([key, item]) => [key, removeContactFields(item)]));
}

async function fetchPage(serviceKey, pageNo) {
  // The portal key stored in .env is already URL-encoded. Keep it raw to avoid double encoding.
  const query = new URLSearchParams({
    resultType: 'json',
    ongoingYn: 'Y',
    numOfRows: String(PAGE_SIZE),
    pageNo: String(pageNo),
  });
  const url = `${API_URL}?${query.toString()}&serviceKey=${serviceKey}`;

  const response = await fetch(url);
  const body = await response.json();
  if (!response.ok || body?.OpenAPI_ServiceResponse?.cmmMsgHeader) {
    const message = body?.OpenAPI_ServiceResponse?.cmmMsgHeader?.returnAuthMsg
      || body?.resultMsg
      || `HTTP ${response.status}`;
    throw new Error(`채용정보 API 호출 실패: ${message}`);
  }
  return body;
}

async function main() {
  const serviceKey = loadEnvValue('RECRUITMENT_API_KEY');
  const collected = [];
  const seen = new Set();
  let pageNo = 1;
  let totalCount = Infinity;

  while (collected.length < MAX_JOBS && (pageNo - 1) * PAGE_SIZE < totalCount) {
    const body = await fetchPage(serviceKey, pageNo);
    const rows = Array.isArray(body.result) ? body.result : [];
    totalCount = Number(body.totalCount || totalCount);

    for (const row of rows) {
      const id = String(row.recrutPblntSn ?? `${pageNo}-${collected.length}`);
      if (isTargetJob(row) && !seen.has(id)) {
        seen.add(id);
        collected.push(removeContactFields(row));
        if (collected.length === MAX_JOBS) break;
      }
    }

    if (rows.length < PAGE_SIZE) break;
    pageNo += 1;
  }

  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(collected, null, 2)}\n`, { encoding: 'utf8' });
  console.log(`저장 완료: ${collected.length}건`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
