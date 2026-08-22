const SUPABASE_URL = () => process.env.SUPABASE_URL;
const SUPABASE_KEY = () => process.env.SUPABASE_PUBLISHABLE_KEY;

async function supabaseRequest(path, options = {}) {
  const url = new URL(path, SUPABASE_URL());
  const response = await fetch(url, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY(),
      Authorization: `Bearer ${SUPABASE_KEY()}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = null; }
  return { response, data };
}

function bodyOf(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return req.body;
}

module.exports = async function handler(req, res) {
  if (!SUPABASE_URL() || !SUPABASE_KEY()) {
    return res.status(500).json({ error: "Supabase 환경변수가 설정되지 않았습니다." });
  }

  try {
    if (req.method === "GET") {
      const { response, data } = await supabaseRequest(
        "/rest/v1/anonymous_posts?select=id,nickname,title,content,created_at,updated_at&order=created_at.desc"
      );
      if (!response.ok) return res.status(response.status).json({ error: "게시판을 불러오지 못했습니다." });
      res.setHeader("Cache-Control", "no-store, max-age=0");
      return res.status(200).json(data || []);
    }

    const body = bodyOf(req);
    let path;
    if (req.method === "POST") path = "/rest/v1/rpc/create_anonymous_post";
    else if (req.method === "PATCH") path = "/rest/v1/rpc/update_anonymous_post";
    else if (req.method === "DELETE") path = "/rest/v1/rpc/delete_anonymous_post";
    else {
      res.setHeader("Allow", "GET, POST, PATCH, DELETE");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const rpcBody = req.method === "POST"
      ? { p_nickname: body.nickname, p_title: body.title, p_content: body.content, p_password: body.password }
      : req.method === "PATCH"
        ? { p_id: body.id, p_nickname: body.nickname, p_title: body.title, p_content: body.content, p_password: body.password }
        : { p_id: body.id, p_password: body.password };

    const { response, data } = await supabaseRequest(path, {
      method: "POST",
      body: JSON.stringify(rpcBody),
    });

    if (!response.ok) {
      const message = data?.message || data?.error || "요청을 처리하지 못했습니다.";
      return res.status(response.status >= 400 && response.status < 500 ? response.status : 502).json({ error: message });
    }

    if (req.method === "PATCH" && (!Array.isArray(data) || !data.length)) {
      return res.status(403).json({ error: "비밀번호가 맞지 않거나 글이 없습니다." });
    }
    if (req.method === "DELETE" && data !== true) {
      return res.status(403).json({ error: "비밀번호가 맞지 않거나 글이 없습니다." });
    }

    return res.status(200).json(data);
  } catch {
    return res.status(502).json({ error: "게시판 서버에 연결하지 못했습니다." });
  }
};
