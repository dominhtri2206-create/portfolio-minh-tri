/**
 * ===================================================================
 * PORTFOLIO - ĐỖ MINH TRÍ
 * Digital Marketing & Video Creator
 * Interactive Frontend JavaScript (script.js)
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mark JavaScript as enabled
  document.documentElement.classList.add('js-enabled');

  // Initialize all interactive modules
  initScrollProgress();
  initStickyHeader();
  initMobileMenu();
  initScrollSpy();
  initScrollAnimations();
  initBackToTop();
  initContactForm();
});

/* -------------------------------------------------------------------
   1. SCROLL PROGRESS BAR
------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* -------------------------------------------------------------------
   2. STICKY HEADER WITH BLUR & SHADOW
------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll(); // Run on initial load
}

/* -------------------------------------------------------------------
   3. MOBILE NAVIGATION DRAWER
------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  const closeBtn = document.getElementById('drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-link, .drawer-footer a');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close when clicking any menu link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* -------------------------------------------------------------------
   4. SCROLL SPY (ACTIVE NAV LINK HIGHLIGHTING)
------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], #achievements');
  const desktopLinks = document.querySelectorAll('.nav-menu .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-menu-links .mobile-link');

  if (sections.length === 0) return;

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Desktop
        desktopLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        // Mobile
        mobileLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/* -------------------------------------------------------------------
   5. SCROLL ANIMATIONS (INTERSECTION OBSERVER WITH INSTANT FALLBACK)
------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  
  if (animatedElements.length === 0) return;

  // Immediate reveal for hero elements to make page instantly visible and interactive
  const heroElements = document.querySelectorAll('#hero .reveal-up, #hero .reveal-left, #hero .reveal-right');
  heroElements.forEach(el => el.classList.add('active'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));

    // Safety timeout: ensure all elements become active within 1.5s regardless of scroll
    setTimeout(() => {
      animatedElements.forEach(el => el.classList.add('active'));
    }, 1500);
  } else {
    // If IntersectionObserver is not supported, reveal all immediately
    animatedElements.forEach(el => el.classList.add('active'));
  }
}

/* -------------------------------------------------------------------
   6. BACK TO TOP BUTTON
------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* -------------------------------------------------------------------
   7. PROJECT MODAL POPUP & DATA
------------------------------------------------------------------- */
const projectDetailsData = {
  1: {
    id: 1,
    title: "Dự Án Content Marketing & Video Ngắn (Reels/TikTok)",
    category: "Video Marketing & Social Viral",
    role: "Trưởng nhóm (Team Leader) & Biên tập Video",
    duration: "2 tháng (Học kỳ đồ án thực hành)",
    teamSize: "4 thành viên",
    tools: ["CapCut Pro", "Adobe Premiere Pro", "TikTok Creator Studio", "Canva Pro", "Smartphone 4K & Gimbal"],
    bannerGradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #ff6b35 100%)",
    icon: "fa-brands fa-tiktok",
    overview: "Dự án tập trung vào việc nghiên cứu hành vi tiêu thụ video ngắn của đối tượng khách hàng Gen Z và người trẻ tuổi, từ đó lên kế hoạch sản xuất chuỗi 15 video ngắn định dạng dọc (9:16) cho thương hiệu đồ uống / thời trang trẻ trung.",
    objectives: [
      "Xây dựng định vị hình ảnh thương hiệu năng động, gần gũi và hài hước trên nền tảng TikTok và Instagram Reels.",
      "Thử nghiệm các cấu trúc kịch bản Hook 3s (Tò mò, Đặt câu hỏi, Trước/Sau, Phản ứng bất ngờ) để tối ưu tỷ lệ giữ chân người xem.",
      "Đạt mục tiêu tối thiểu 50.000 lượt xem tự nhiên (organic views) và tỷ lệ tương tác (engagement rate) trên 8%."
    ],
    contributions: [
      "Trực tiếp lên ý tưởng, viết kịch bản phân cảnh chi tiết (Storyboard) cho toàn bộ 15 video.",
      "Phân công vai trò diễn xuất, chuẩn bị đạo cụ, góc quay và setup ánh sáng với gimbal.",
      "Hậu kỳ cắt dựng, chỉnh màu sắc tươi sáng, chèn sound effects (SFX) và chọn nhạc nền thịnh hành (Trending BGM).",
      "Theo dõi dữ liệu phân tích từ TikTok Analytics để tinh chỉnh thời gian đăng bài và hashtag."
    ],
    results: [
      "Chiến dịch đạt hơn 120.000+ lượt xem tích lũy trên cả hai nền tảng.",
      "Video viral nhất đạt 45.000 lượt xem với hơn 3.200 lượt thả tim và 180 lượt chia sẻ.",
      "Được giảng viên bộ môn đánh giá Xuất sắc (Điểm 9.5/10) về chất lượng hình ảnh và thông điệp truyền tải."
    ]
  },
  2: {
    id: 2,
    title: "Dự Án SEO & Nghiên Cứu Thị Trường Ngành Hàng",
    category: "Search Engine Optimization & Market Research",
    role: "Trưởng nhóm (Team Leader) & Phân tích Dữ liệu",
    duration: "2.5 tháng",
    teamSize: "5 thành viên",
    tools: ["Google Search Console", "Google Analytics (GA4)", "Google Keyword Planner", "Ahrefs", "Microsoft Excel MOS"],
    bannerGradient: "linear-gradient(135deg, #065f46 0%, #059669 50%, #0284c7 100%)",
    icon: "fa-solid fa-chart-line",
    overview: "Đồ án nghiên cứu thị trường toàn diện và triển khai chiến lược SEO Onpage & Content Hub cho một website thương mại điện tử chuyên cung cấp sản phẩm phong cách sống.",
    objectives: [
      "Thấu hiểu chân dung khách hàng mục tiêu (Buyer Persona) và hành trình tìm kiếm thông tin của người tiêu dùng.",
      "Phân tích điểm mạnh, điểm yếu của 3 đối thủ cạnh tranh trực tiếp trên bảng xếp hạng Google tìm kiếm.",
      "Xây dựng cấu trúc cây thư mục website (Site Architecture) và bộ từ khóa phủ rộng theo mô hình Topic Cluster."
    ],
    contributions: [
      "Điều phối nhóm lọc bộ từ khóa hơn 150 keywords có lượng tìm kiếm cao và độ cạnh tranh (Keyword Difficulty) phù hợp.",
      "Áp dụng chứng chỉ MOS Excel 2019 để phân loại dữ liệu từ khóa, tính toán Search Volume và tiềm năng chuyển đổi.",
      "Viết bài mẫu chuẩn SEO (1.500+ từ) tối ưu Heading, Meta Description, Alt ảnh và Internal Link.",
      "Đo lường các chỉ số CTR, thời gian trên trang và thứ hạng từ khóa qua Google Search Console."
    ],
    results: [
      "15 từ khóa mục tiêu lọt Top 10 Google Search sau 6 tuần thử nghiệm index bài viết.",
      "Tăng lượng Organic Clicks lên 250% so với giai đoạn thử nghiệm ban đầu.",
      "Được hội đồng chấm đồ án chọn làm bài báo cáo mẫu cho sinh viên khóa sau."
    ]
  },
  3: {
    id: 3,
    title: "Chiến Dịch Lập Kế Hoạch & Triển Khai Nội Dung Thương Hiệu",
    category: "Integrated Marketing Campaign (IMC) & Branding",
    role: "Trưởng nhóm (Team Leader) & Quản lý Chiến dịch",
    duration: "3 tháng",
    teamSize: "5 thành viên",
    tools: ["Notion Project Board", "Canva Pro Brand Kit", "Meta Business Suite", "Google Docs / Sheets", "Trello"],
    bannerGradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #f43f5e 100%)",
    icon: "fa-solid fa-bullseye",
    overview: "Lập kế hoạch truyền thông tích hợp (IMC Plan) cho chiến dịch ra mắt bộ sưu tập theo mùa. Dự án bao gồm việc định hình thông điệp thương hiệu cốt lõi (Key Message), thiết kế bộ nhận diện visual và triển khai lịch nội dung đa kênh xuyên suốt 30 ngày.",
    objectives: [
      "Định hình phong cách thương hiệu nhất quán (Brand Identity Guidelines): Bảng màu, typography và văn phong (Tone & Voice).",
      "Thiết lập ma trận nội dung theo quy tắc 70-20-10: 70% nội dung giá trị/chia sẻ, 20% nội dung tương tác cảm xúc, 10% bán hàng trực tiếp.",
      "Đảm bảo tiến độ đăng bài mỗi ngày không bị trễ hạn thông qua quy trình kiểm duyệt nghiêm ngặt."
    ],
    contributions: [
      "Xây dựng bảng kế hoạch tổng thể trên Notion với lịch biểu chi tiết từng ngày, từng người phụ trách (RACI Model).",
      "Thiết kế hơn 20 mẫu poster, carousel nhiều ảnh trên Canva đảm bảo chuẩn nhận diện thương hiệu.",
      "Tổ chức các buổi họp nhóm hàng tuần để giải quyết khó khăn, truyền động lực và duy trì tinh thần đoàn kết.",
      "Đánh giá và tổng kết hiệu quả chiến dịch bằng báo cáo chi tiết kèm bài học kinh nghiệm rút ra."
    ],
    results: [
      "Chiến dịch hoàn thành 100% KPI về số lượng bài viết và ấn phẩm truyền thông đúng thời hạn.",
      "Tương tác trên Fanpage tăng 180%, tỷ lệ phản hồi tin nhắn khách hàng đạt mức xuất sắc.",
      "Góp phần quan trọng giúp tôi hoàn thành đồ án tốt nghiệp loại Xuất Sắc tại FPT Polyschool."
    ]
  }
};

/**
 * Open Project Details Modal
 */
function openProjectModal(projectId) {
  const data = projectDetailsData[projectId];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('project-modal-backdrop');
  const container = document.getElementById('modal-content-container');

  if (!modal || !backdrop || !container) return;

  // Build tools HTML
  const toolsHtml = data.tools.map(tool => `<span class="tool-pill">${tool}</span>`).join(' ');

  // Build objectives HTML
  const objectivesHtml = data.objectives.map(item => `
    <li class="modal-list-item">
      <i class="fa-solid fa-circle-check"></i>
      <span>${item}</span>
    </li>
  `).join('');

  // Build contributions HTML
  const contributionsHtml = data.contributions.map(item => `
    <li class="modal-list-item">
      <i class="fa-solid fa-check text-primary-color"></i>
      <span>${item}</span>
    </li>
  `).join('');

  // Build results HTML
  const resultsHtml = data.results.map(item => `
    <li class="modal-list-item">
      <i class="fa-solid fa-star text-orange-color"></i>
      <span><strong>${item}</strong></span>
    </li>
  `).join('');

  // Render modal content
  container.innerHTML = `
    <div class="modal-project-header">
      <div class="modal-meta-row">
        <span class="role-badge"><i class="fa-solid fa-crown"></i> ${data.role}</span>
        <span class="platform-badge">${data.category}</span>
      </div>
      <h2 class="modal-title" id="modal-title">${data.title}</h2>
    </div>

    <div class="modal-banner-box" style="background: ${data.bannerGradient};">
      <i class="${data.icon} project-watermark" style="font-size: 6rem; color: rgba(255,255,255,0.2);"></i>
      <div style="position: relative; z-index: 2; text-align: center; color: #ffffff; padding: 20px;">
        <span style="display: inline-block; background: rgba(0,0,0,0.3); backdrop-filter: blur(4px); padding: 6px 16px; border-radius: 9999px; font-weight: 700; font-size: 0.85rem; margin-bottom: 8px;">
          Đồ Án Thực Tế | FPT Digital Marketing
        </span>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #ffffff;">${data.title}</h3>
      </div>
    </div>

    <div class="modal-grid">
      <!-- Main Content Column -->
      <div class="modal-main-col">
        <div class="modal-section-title">
          <i class="fa-solid fa-circle-info text-primary-color"></i>
          <span>Tổng quan dự án</span>
        </div>
        <p class="modal-text">${data.overview}</p>

        <div class="modal-section-title">
          <i class="fa-solid fa-bullseye text-orange-color"></i>
          <span>Mục tiêu chiến dịch</span>
        </div>
        <ul class="modal-list">
          ${objectivesHtml}
        </ul>

        <div class="modal-section-title">
          <i class="fa-solid fa-user-gear text-primary-color"></i>
          <span>Nhiệm vụ trực tiếp thực hiện</span>
        </div>
        <ul class="modal-list">
          ${contributionsHtml}
        </ul>

        <div class="modal-section-title">
          <i class="fa-solid fa-trophy text-orange-color"></i>
          <span>Kết quả đạt được</span>
        </div>
        <ul class="modal-list">
          ${resultsHtml}
        </ul>
      </div>

      <!-- Sidebar Info Column -->
      <div class="modal-side-col">
        <div class="modal-side-card">
          <div class="modal-side-item">
            <span class="modal-side-label">Vai trò chính</span>
            <span class="modal-side-val text-primary-color">${data.role}</span>
          </div>

          <div class="modal-side-item">
            <span class="modal-side-label">Thời gian thực hiện</span>
            <span class="modal-side-val">${data.duration}</span>
          </div>

          <div class="modal-side-item">
            <span class="modal-side-label">Quy mô nhóm</span>
            <span class="modal-side-val">${data.teamSize}</span>
          </div>

          <div class="modal-side-item">
            <span class="modal-side-label">Công cụ & Ứng dụng</span>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
              ${toolsHtml}
            </div>
          </div>
        </div>

        <div style="margin-top: 20px; background: #fff2ed; border: 1px solid #ffd8cc; border-radius: 12px; padding: 16px;">
          <h5 style="color: #c2410c; font-size: 0.9rem; font-weight: 700; margin-bottom: 6px;">
            <i class="fa-solid fa-lightbulb"></i> Ghi chú sản phẩm thật
          </h5>
          <p style="font-size: 0.82rem; color: #9a3412; line-height: 1.5;">
            Bạn có thể dễ dàng thêm link video TikTok, tài liệu báo cáo hoặc file thiết kế Canva thật vào nút bên dưới để nhà tuyển dụng xem trực tiếp!
          </p>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn btn-ghost btn-sm" onclick="closeProjectModal()">
        <i class="fa-solid fa-xmark"></i> Đóng
      </button>
      <a href="#contact" class="btn btn-primary btn-sm" onclick="closeProjectModal()">
        <i class="fa-solid fa-paper-plane"></i> Trao đổi về dự án này
      </a>
    </div>
  `;

  // Show modal
  backdrop.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Close Project Details Modal
 */
function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('project-modal-backdrop');

  if (modal) modal.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  
  const activityModal = document.getElementById('activity-modal');
  const lightbox = document.getElementById('image-lightbox');
  const isOtherOpen = (activityModal && activityModal.classList.contains('active')) ||
                      (lightbox && lightbox.classList.contains('active'));
  if (!isOtherOpen) {
    document.body.style.overflow = '';
  }
}

/* -------------------------------------------------------------------
   7B. ACTIVITY DETAILS MODAL POPUP & DATA
------------------------------------------------------------------- */
const activityDetailsData = {
  1: {
    id: 1,
    title: "BBE Pegasus Chapter — Ban Lãnh Đạo Nhiệm Kỳ I",
    role: "Phó Chủ tịch (Vice President) — Ban Lãnh đạo Nhiệm kỳ I",
    organization: "BBE Pegasus Chapter",
    eventOrg: "BBE Pegasus Chapter",
    timeLocation: "01/02/2026 – 30/09/2026",
    badgeType: "Ban Lãnh đạo",
    badgeClass: "badge-leader",
    mainImage: "act-pegasus.jpg",
    description: "Thể hiện tinh thần trách nhiệm cao, điều phối đội ngũ và hoàn thành xuất sắc nhiệm vụ trong vai trò Phó Chủ tịch nhiệm kỳ I.",
    subPlaceholder1: "Ảnh hậu trường sinh hoạt & họp điều hành",
    subPlaceholder2: "Ảnh tổ chức workshop & chia sẻ kỹ năng",
    tasks: [
      "Điều phối thành viên, phân công công việc cụ thể và giám sát tiến độ hoạt động trong ban lãnh đạo.",
      "Xây dựng quy trình sinh hoạt định kỳ, chuẩn hóa tài liệu và duy trì kỷ luật sinh hoạt chuyên nghiệp.",
      "Chủ trì tổ chức các buổi chia sẻ kỹ năng thực chiến và các hoạt động kết nối tinh thần đồng đội."
    ],
    result: "Duy trì độ gắn kết đội ngũ cao trong suốt nhiệm kỳ I, củng cố năng lực điều hành và xây dựng văn hóa đội nhóm vững mạnh."
  },
  2: {
    id: 2,
    title: "Lễ Tốt Nghiệp BTEC FPT 2026",
    role: "Thành viên Ban Tổ chức (Organizing Committee)",
    organization: "BTEC FPT",
    eventOrg: "Lễ Tốt nghiệp BTEC FPT 2026",
    timeLocation: "25/10/2026 tại Đà Nẵng",
    badgeType: "Ban Tổ chức Sự kiện",
    badgeClass: "badge-event",
    mainImage: "act-graduation.jpg",
    description: "Trực tiếp đóng góp và phối hợp vận hành sự kiện trọng đại cấp trường, đảm bảo trải nghiệm chuyên nghiệp cho sinh viên và khách mời.",
    subPlaceholder1: "Ảnh hậu trường setup & vận hành sân khấu",
    subPlaceholder2: "Ảnh điều phối tân cử nhân & đón tiếp khách mời",
    tasks: [
      "Phối hợp chuẩn bị công tác hậu cần, kỹ thuật âm thanh, ánh sáng và kiểm soát bố cục sân khấu lễ tốt nghiệp.",
      "Trực tiếp hướng dẫn, điều phối hàng ngũ khách mời danh dự, phụ huynh và tân cử nhân trong suốt buổi lễ.",
      "Xử lý nhanh nhạy và kịp thời các tình huống phát sinh tại khu vực sân khấu chính và luồng di chuyển."
    ],
    result: "Sự kiện diễn ra suôn sẻ, chỉn chu và để lại ấn tượng tốt đẹp trong lòng sinh viên cùng khách mời; rèn luyện khả năng ứng biến dưới áp lực cao."
  },
  3: {
    id: 3,
    title: "Dự Án Thiện Nguyện \"Hành Trình Yêu Thương - Số Thứ 4\"",
    role: "Tình nguyện viên đóng góp tích cực",
    organization: "BTEC FPT & Fusion Club",
    eventOrg: "Dự án thiện nguyện \"Hành Trình Yêu Thương - Số thứ 4\"",
    timeLocation: "Ngũ Hành Sơn, Đà Nẵng",
    badgeType: "Thiện nguyện cộng đồng",
    badgeClass: "badge-volunteer",
    mainImage: "act-thien-nguyen.jpg",
    description: "Tham gia tổ chức và lan tỏa giá trị tích cực tại Mái Ấm Tình Thương (Ngũ Hành Sơn, Đà Nẵng).",
    subPlaceholder1: "Ảnh chuẩn bị & phân loại quà tặng thiện nguyện",
    subPlaceholder2: "Ảnh sinh hoạt, giao lưu trò chơi cùng các em nhỏ",
    tasks: [
      "Lên kế hoạch vận động, tiếp nhận và phân loại chu đáo các phần quà tặng gửi tới Mái Ấm Tình Thương.",
      "Tổ chức hoạt động giao lưu văn nghệ, trò chơi tập thể sôi nổi, an toàn và kết nối cùng các em nhỏ.",
      "Trực tiếp kết nối, lắng nghe, chăm sóc các em nhỏ tại Mái Ấm Tình Thương và hỗ trợ công tác hậu cần."
    ],
    result: "Lan tỏa tinh thần sẻ chia và gắn kết cộng đồng sinh viên; nuôi dưỡng lòng trắc ẩn và tinh thần trách nhiệm xã hội."
  }
};

function openActivityModal(activityId) {
  const data = activityDetailsData[activityId];
  if (!data) return;

  const modal = document.getElementById('activity-modal');
  const backdrop = document.getElementById('activity-modal-backdrop');
  const container = document.getElementById('act-modal-content-container');

  if (!modal || !backdrop || !container) return;

  const tasksHtml = data.tasks.map(item => `
    <li class="modal-list-item">
      <i class="fa-solid fa-circle-check text-primary-color"></i>
      <span>${item}</span>
    </li>
  `).join('');

  container.innerHTML = `
    <div class="modal-activity-header">
      <div class="modal-meta-row">
        <span class="act-floating-badge ${data.badgeClass}" style="position: static; display: inline-flex;">
          <i class="fa-solid fa-crown"></i> ${data.badgeType}
        </span>
        <span class="act-org-tag">${data.organization}</span>
      </div>
      <h2 class="modal-title" id="act-modal-title">${data.title}</h2>
      <div class="modal-subtitle-row">
        <div class="modal-role-highlight">
          <i class="fa-solid fa-user-tie text-primary-color"></i>
          <span><strong>Vai trò:</strong> ${data.role}</span>
        </div>
        <div class="modal-time-highlight">
          <i class="fa-regular fa-calendar-check text-orange-color"></i>
          <span><strong>Thời gian & Địa điểm:</strong> ${data.timeLocation}</span>
        </div>
      </div>
    </div>

    <!-- Hộp thông tin chi tiết: Đơn vị/Sự kiện, Thời gian & Địa điểm, Mô tả tổng quan -->
    <div class="act-modal-overview-box">
      <div class="act-modal-overview-grid">
        <div class="act-modal-overview-item">
          <span class="act-overview-label"><i class="fa-solid fa-building text-primary-color"></i> ĐƠN VỊ / SỰ KIỆN</span>
          <span class="act-overview-value">${data.eventOrg}</span>
        </div>
        <div class="act-modal-overview-item">
          <span class="act-overview-label"><i class="fa-regular fa-calendar-check text-orange-color"></i> THỜI GIAN & ĐỊA ĐIỂM</span>
          <span class="act-overview-value">${data.timeLocation}</span>
        </div>
      </div>
      <div class="act-modal-overview-desc">
        <span class="act-overview-label"><i class="fa-solid fa-circle-info text-primary-color"></i> MÔ TẢ ĐÓNG GÓP & TRÁCH NHIỆM</span>
        <p class="act-overview-desc-text">${data.description}</p>
      </div>
    </div>

    <!-- Khung trưng bày hình ảnh -->
    <div class="act-modal-gallery">
      <div class="act-gallery-main" onclick="openLightbox('${data.mainImage}', '${data.title}')" title="Nhấp vào để phóng to xem rõ ảnh chứng nhận">
        <img src="${data.mainImage}" alt="${data.title}" class="act-modal-main-img">
        <div class="act-gallery-overlay">
          <span class="gallery-zoom-pill">
            <i class="fa-solid fa-magnifying-glass-plus"></i>
            <span>Phóng to ảnh chứng nhận</span>
          </span>
        </div>
        <span class="gallery-badge-main">
          <i class="fa-solid fa-certificate"></i> Ảnh chứng nhận chính
        </span>
      </div>

      <div class="act-gallery-sub-grid">
        <div class="act-sub-placeholder">
          <div class="placeholder-icon"><i class="fa-solid fa-camera"></i></div>
          <div class="placeholder-text">
            <strong>${data.subPlaceholder1}</strong>
            <span>Khu vực chờ cập nhật ảnh hậu trường</span>
          </div>
        </div>
        <div class="act-sub-placeholder">
          <div class="placeholder-icon"><i class="fa-solid fa-images"></i></div>
          <div class="placeholder-text">
            <strong>${data.subPlaceholder2}</strong>
            <span>Khu vực chờ cập nhật ảnh hậu trường</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Nội dung chi tiết: Nhiệm vụ & Kết quả -->
    <div class="act-modal-details-grid">
      <div class="act-details-section">
        <div class="modal-section-title">
          <i class="fa-solid fa-list-check text-primary-color"></i>
          <span>Nhiệm vụ & Đóng góp chính</span>
        </div>
        <ul class="modal-list">
          ${tasksHtml}
        </ul>
      </div>

      <div class="act-details-section">
        <div class="modal-section-title">
          <i class="fa-solid fa-award text-orange-color"></i>
          <span>Kết quả / Bài học rút ra</span>
        </div>
        <div class="act-result-card">
          <p class="result-text">${data.result}</p>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      <button type="button" class="btn btn-outline btn-sm" onclick="openLightbox('${data.mainImage}', '${data.title}')">
        <i class="fa-solid fa-expand"></i> Phóng to ảnh chứng nhận
      </button>
      <button type="button" class="btn btn-ghost btn-sm" onclick="closeActivityModal()">
        <i class="fa-solid fa-xmark"></i> Đóng
      </button>
    </div>
  `;

  backdrop.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeActivityModal() {
  const modal = document.getElementById('activity-modal');
  const backdrop = document.getElementById('activity-modal-backdrop');

  if (modal) modal.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');

  const projectModal = document.getElementById('project-modal');
  const lightbox = document.getElementById('image-lightbox');
  const isOtherOpen = (projectModal && projectModal.classList.contains('active')) ||
                      (lightbox && lightbox.classList.contains('active'));

  if (!isOtherOpen) {
    document.body.style.overflow = '';
  }
}

/**
 * Image Lightbox Modal for Activities & Certificates
 */
function openLightbox(src, title) {
  const lightbox = document.getElementById('image-lightbox');
  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const dlLink = document.getElementById('lightbox-download-link');
  const extLink = document.getElementById('lightbox-external-link');

  if (!lightbox || !img) return;

  img.src = src;
  img.alt = title || 'Ảnh minh chứng phóng to';
  if (titleEl) titleEl.textContent = title || 'Ảnh minh chứng';
  if (dlLink) {
    dlLink.href = src;
    dlLink.setAttribute('download', src.split('/').pop());
  }
  if (extLink) {
    extLink.href = src;
  }

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
  }

  const projectModal = document.getElementById('project-modal');
  const activityModal = document.getElementById('activity-modal');
  const isOtherOpen = (projectModal && projectModal.classList.contains('active')) ||
                      (activityModal && activityModal.classList.contains('active'));

  if (!isOtherOpen) {
    document.body.style.overflow = '';
  }
}

// Close modals on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeActivityModal();
    closeLightbox();
  }
});

/* -------------------------------------------------------------------
   8. COPY TO CLIPBOARD & TOAST SYSTEM
------------------------------------------------------------------- */
function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast(successMessage || 'Đã sao chép vào bộ nhớ tạm!');
      })
      .catch(() => {
        fallbackCopyText(text, successMessage);
      });
  } else {
    fallbackCopyText(text, successMessage);
  }
}

function fallbackCopyText(text, successMessage) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  tempInput.style.position = 'fixed';
  tempInput.style.left = '-9999px';
  document.body.appendChild(tempInput);
  tempInput.focus();
  tempInput.select();

  try {
    document.execCommand('copy');
    showToast(successMessage || 'Đã sao chép vào bộ nhớ tạm!');
  } catch (err) {
    showToast('Không thể sao chép tự động. Vui lòng thử lại!');
  }

  document.body.removeChild(tempInput);
}

function showToast(message, duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.1rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

/* -------------------------------------------------------------------
   9. CONTACT FORM INTERACTION (NETLIFY FORMS READY)
------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Real-time simple input feedback for required fields
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.style.borderColor = '#ef4444';
      } else {
        input.style.borderColor = '';
      }
    });
  });

  // Netlify Forms: Native submit is allowed without preventDefault
  // to ensure Netlify servers receive real form submissions.
}

/* -------------------------------------------------------------------
   10. CERTIFICATE DETAILS COLLAPSE TOGGLE
------------------------------------------------------------------- */
/**
 * Toggle Collapsible Certificate Details (Xem thêm / Thu gọn thông tin)
 */
function toggleCertMeta(button) {
  if (!button) return;
  const wrapper = button.closest('.cert-meta-toggle-wrapper');
  if (!wrapper) return;
  const collapseEl = wrapper.querySelector('.cert-meta-collapse');
  const toggleText = button.querySelector('.toggle-text');
  if (!collapseEl) return;

  const isExpanded = button.classList.contains('active');

  if (isExpanded) {
    button.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
    collapseEl.classList.remove('active');
    if (toggleText) toggleText.textContent = 'Xem thêm thông tin';
  } else {
    button.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    collapseEl.classList.add('active');
    if (toggleText) toggleText.textContent = 'Thu gọn thông tin';
  }
}
