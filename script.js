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
  
  const lightbox = document.getElementById('image-lightbox');
  if (!lightbox || !lightbox.classList.contains('active')) {
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
  if (!projectModal || !projectModal.classList.contains('active')) {
    document.body.style.overflow = '';
  }
}

// Close modals on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
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
