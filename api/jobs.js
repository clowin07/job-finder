module.exports = async function handler(req, res) {
  if (req.method && req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const projectUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!projectUrl || !publishableKey) {
    return res.status(500).json({ error: "Supabase 환경변수가 설정되지 않았습니다." });
  }

  const url = new URL("/rest/v1/jobs", projectUrl);
  url.searchParams.set("select", "*");
  url.searchParams.set("order", "recrut_pblnt_sn.asc");

  try {
    const response = await fetch(url, {
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: "Supabase 조회에 실패했습니다." });
    }

    res.setHeader("Cache-Control", "no-store, max-age=0");
    return res.status(200).json(data);
  } catch {
    return res.status(502).json({ error: "Supabase 연결에 실패했습니다." });
  }
};
