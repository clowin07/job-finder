const jobs = [
  { id: 1, company: "네이버", logo: "N", color: "#20c76f", title: "Tech 체험형 인턴 — Frontend", category: "개발", tags: ["인턴", "React", "신입 가능"], score: 96, days: 3, posted: 2, location: "경기 성남", type: "체험형 인턴", description: "사용자에게 더 빠르고 편리한 웹 경험을 제공할 프론트엔드 인턴을 찾습니다. 실제 서비스 개선 과제에 참여하며 동료 개발자와 함께 성장할 수 있어요." },
  { id: 2, company: "카카오페이", logo: "pay", color: "#22221f", title: "데이터 분석 어시스턴트", category: "데이터", tags: ["인턴", "SQL", "Python"], score: 94, days: 5, posted: 1, location: "경기 성남", type: "인턴", description: "결제 서비스 데이터를 통해 사용자의 행동을 이해하고, 팀의 의사결정을 돕는 분석 업무를 경험합니다. SQL 기초와 논리적인 사고를 중요하게 봅니다." },
  { id: 3, company: "오늘의집", logo: "oh", color: "#35b6ed", title: "콘텐츠 마케팅 인턴", category: "마케팅", tags: ["인턴", "콘텐츠", "SNS"], score: 91, days: 7, posted: 4, location: "서울 서초", type: "인턴", description: "라이프스타일 콘텐츠를 기획하고 브랜드 채널을 운영합니다. 트렌드에 민감하고 직접 콘텐츠를 만들어본 경험이 있다면 좋아요." },
  { id: 4, company: "우아한형제들", logo: "배민", color: "#28b9b7", title: "프로덕트 기획 보조", category: "기획", tags: ["계약직", "서비스 기획", "UX"], score: 89, days: 2, posted: 5, location: "서울 송파", type: "3개월 계약", description: "고객과 사장님의 문제를 발견하고 서비스 개선안을 구체화합니다. 리서치, 데이터 정리, 화면 정책 작성 등 기획 전반을 경험할 수 있습니다." },
  { id: 5, company: "토스", logo: "T", color: "#3478f6", title: "UX Research Assistant", category: "디자인", tags: ["인턴", "리서치", "Figma"], score: 88, days: 10, posted: 3, location: "서울 강남", type: "인턴", description: "사용자 인터뷰와 사용성 테스트를 지원하고 인사이트를 정리합니다. 사람의 행동을 세심하게 관찰하고 기록하는 분을 기다립니다." },
  { id: 6, company: "당근", logo: "당근", color: "#ff6f21", title: "지역생활 커뮤니티 운영 인턴", category: "마케팅", tags: ["인턴", "커뮤니티", "운영"], score: 86, days: 1, posted: 8, location: "서울 서초", type: "인턴", description: "동네의 연결을 더 따뜻하게 만드는 커뮤니티 운영 업무를 함께합니다. 사용자 문의와 콘텐츠 운영을 통해 서비스 감각을 기를 수 있어요." },
  { id: 7, company: "무신사", logo: "M", color: "#161616", title: "Junior Product Designer", category: "디자인", tags: ["신입", "UI/UX", "포트폴리오"], score: 84, days: 12, posted: 6, location: "서울 성동", type: "정규직", description: "패션을 사랑하는 고객을 위한 모바일 경험을 설계합니다. 문제 정의부터 프로토타이핑까지 주도적으로 참여하게 됩니다." },
  { id: 8, company: "야놀자", logo: "Y", color: "#ff3478", title: "서비스 운영 및 데이터 관리", category: "데이터", tags: ["인턴", "Excel", "데이터"], score: 82, days: 6, posted: 7, location: "서울 강남", type: "인턴", description: "여행 상품 데이터를 정확하게 관리하고 운영 효율을 높이는 업무를 맡습니다. 꼼꼼함과 스프레드시트 활용 능력이 필요합니다." },
  { id: 9, company: "뤼튼테크놀로지스", logo: "wr", color: "#6958f5", title: "AI 서비스 기획 인턴", category: "기획", tags: ["인턴", "생성형 AI", "기획"], score: 81, days: 9, posted: 1, location: "서울 서초", type: "인턴", description: "생성형 AI 기반 신규 기능을 탐색하고 사용자 피드백을 제품에 반영합니다. 새로운 도구를 빠르게 실험해보는 분에게 잘 맞습니다." },
  { id: 10, company: "쿠팡", logo: "C", color: "#e4463a", title: "Backend Engineer 신입", category: "개발", tags: ["신입", "Java", "대규모 트래픽"], score: 79, days: 14, posted: 9, location: "서울 송파", type: "정규직", description: "수백만 고객이 사용하는 커머스 플랫폼의 백엔드 시스템을 개발합니다. 탄탄한 자료구조와 문제 해결 역량을 기대합니다." },
  { id: 11, company: "직방", logo: "Z", color: "#7950f2", title: "Business Data Analyst 인턴", category: "데이터", tags: ["인턴", "Tableau", "SQL"], score: 77, days: 4, posted: 2, location: "서울 강남", type: "인턴", description: "부동산 시장과 서비스 데이터를 분석해 비즈니스 인사이트를 도출합니다. 대시보드 제작 경험이 있다면 우대합니다." },
  { id: 12, company: "29CM", logo: "29", color: "#343434", title: "브랜드 마케팅 어시스턴트", category: "마케팅", tags: ["계약직", "브랜딩", "캠페인"], score: 75, days: 8, posted: 10, location: "서울 성동", type: "6개월 계약", description: "감도 높은 브랜드와 고객이 만나는 캠페인을 운영합니다. 제안서 작성, 파트너 소통, 성과 리포트를 담당합니다." }
];

const state = { category: "전체", query: "", sort: "recommend", visible: 6, saved: new Set(JSON.parse(localStorage.getItem("careerpin-saved") || "[]")), view: "grid", savedOnly: false };
const grid = document.querySelector("#jobGrid");
const count = document.querySelector("#resultCount");
const empty = document.querySelector("#emptyState");
const loadMore = document.querySelector("#loadMore");
const searchInput = document.querySelector("#searchInput");
const modal = document.querySelector("#modalBackdrop");
let toastTimer;

function filteredJobs() {
  const q = state.query.trim().toLowerCase();
  const result = jobs.filter(job => {
    const categoryMatch = state.category === "전체" || job.category === state.category;
    const searchMatch = !q || [job.company, job.title, job.category, ...job.tags].join(" ").toLowerCase().includes(q);
    const savedMatch = !state.savedOnly || state.saved.has(job.id);
    return categoryMatch && searchMatch && savedMatch;
  });
  return result.sort((a, b) => state.sort === "deadline" ? a.days - b.days : state.sort === "newest" ? a.posted - b.posted : b.score - a.score);
}

function render() {
  const result = filteredJobs();
  const visibleJobs = result.slice(0, state.visible);
  count.textContent = result.length;
  grid.className = `job-grid ${state.view === "list" ? "list-view" : ""}`;
  grid.innerHTML = visibleJobs.map((job, index) => `
    <article class="job-card" tabindex="0" data-id="${job.id}" style="animation-delay:${index * 35}ms">
      <div class="job-card-top">
        <span class="company-logo" style="background:${job.color}">${job.logo}</span>
        <button class="bookmark ${state.saved.has(job.id) ? "saved" : ""}" data-save="${job.id}" aria-label="${state.saved.has(job.id) ? "저장 취소" : "공고 저장"}">
          <svg viewBox="0 0 24 24"><path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.7L6 21V4.8Z"/></svg>
        </button>
      </div>
      <div class="job-card-body">
        <p class="company-name">${job.company}</p>
        <h3 class="job-title">${job.title}</h3>
        <div class="job-tags">${job.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
      </div>
      <div class="job-card-footer">
        <span class="match-score">MATCH ${job.score}%</span>
        <span class="deadline ${job.days <= 3 ? "soon" : ""}">D-${job.days}</span>
      </div>
    </article>`).join("");
  empty.hidden = result.length > 0;
  grid.hidden = result.length === 0;
  loadMore.hidden = result.length === 0 || state.visible >= result.length;
  document.querySelector(".saved-count").textContent = state.saved.size;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function toggleSave(id) {
  state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
  localStorage.setItem("careerpin-saved", JSON.stringify([...state.saved]));
  render();
  showToast(state.saved.has(id) ? "관심 공고에 저장했어요." : "관심 공고에서 삭제했어요.");
}

function openJob(id) {
  const job = jobs.find(item => item.id === id);
  if (!job) return;
  document.querySelector("#modalContent").innerHTML = `
    <div class="modal-company"><span class="company-logo" style="background:${job.color}">${job.logo}</span><div><b>${job.company}</b><p>${job.location}</p></div></div>
    <h2 id="modalTitle">${job.title}</h2>
    <div class="job-tags">${job.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    <div class="modal-summary"><div><span>고용 형태</span><b>${job.type}</b></div><div><span>근무 지역</span><b>${job.location}</b></div><div><span>접수 마감</span><b>D-${job.days}</b></div></div>
    <section class="modal-section"><h3>이 공고가 잘 맞는 이유</h3><p>프로필의 관심 직무 및 보유 역량과 <b>${job.score}%</b> 일치해요. 특히 ${job.tags.slice(1).join(", ")} 관련 경험을 쌓기에 좋은 기회예요.</p></section>
    <section class="modal-section"><h3>주요 업무</h3><p>${job.description}</p></section>
    <button class="apply-button" data-apply="${job.id}">지원 준비하기</button>`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.querySelector(".modal-close").focus();
}

function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
function runSearch() { state.query = searchInput.value; state.visible = 6; state.savedOnly = false; render(); document.querySelector("#jobs").scrollIntoView({ behavior: "smooth" }); }
function resetAll() { state.category = "전체"; state.query = ""; state.sort = "recommend"; state.visible = 6; state.savedOnly = false; searchInput.value = ""; document.querySelector("#sortSelect").value = "recommend"; document.querySelectorAll(".filter-pill").forEach(btn => btn.classList.toggle("active", btn.dataset.category === "전체")); render(); }

document.querySelector("#categoryFilters").addEventListener("click", event => {
  const button = event.target.closest(".filter-pill"); if (!button) return;
  state.category = button.dataset.category; state.visible = 6; state.savedOnly = false;
  document.querySelectorAll(".filter-pill").forEach(btn => btn.classList.toggle("active", btn === button)); render();
});
document.querySelector("#sortSelect").addEventListener("change", event => { state.sort = event.target.value; render(); });
document.querySelector("#searchButton").addEventListener("click", runSearch);
searchInput.addEventListener("keydown", event => { if (event.key === "Enter") runSearch(); });
document.querySelectorAll(".popular-searches button").forEach(button => button.addEventListener("click", () => { searchInput.value = button.textContent; runSearch(); }));
document.querySelectorAll(".view-btn").forEach(button => button.addEventListener("click", () => { state.view = button.dataset.view; document.querySelectorAll(".view-btn").forEach(btn => btn.classList.toggle("active", btn === button)); render(); }));
grid.addEventListener("click", event => { const save = event.target.closest("[data-save]"); if (save) { event.stopPropagation(); toggleSave(Number(save.dataset.save)); return; } const card = event.target.closest(".job-card"); if (card) openJob(Number(card.dataset.id)); });
grid.addEventListener("keydown", event => { if ((event.key === "Enter" || event.key === " ") && event.target.classList.contains("job-card")) openJob(Number(event.target.dataset.id)); });
loadMore.addEventListener("click", () => { state.visible += 3; render(); });
document.querySelector("#resetFilters").addEventListener("click", resetAll);
document.querySelector("#emptyReset").addEventListener("click", resetAll);
document.querySelector(".saved-button").addEventListener("click", () => { state.savedOnly = !state.savedOnly; state.visible = 99; render(); document.querySelector("#jobs").scrollIntoView({ behavior: "smooth" }); showToast(state.savedOnly ? "저장한 공고만 보고 있어요." : "전체 공고를 표시합니다."); });
document.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); const apply = event.target.closest("[data-apply]"); if (apply) showToast("지원 체크리스트를 준비했어요!"); });
document.addEventListener("keydown", event => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

render();
