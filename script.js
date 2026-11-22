/**
 * ===================================================================
 * PORTFOLIO - ĐỖ MINH TRÍ
 * Business & AI Agent Builder
 * Interactive Frontend JavaScript & i18n Translation Engine (script.js)
 * ===================================================================
 */

// Global state for active language and open modals
let currentLang = 'vi';
let currentOpenProjectId = null;
let currentOpenActivityId = null;
let currentOpenCertId = null;

document.addEventListener('DOMContentLoaded', () => {
  // Mark JavaScript as enabled
  document.documentElement.classList.add('js-enabled');

  // Initialize Language Switcher (i18n) first
  initLanguageSwitcher();

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
   1. MULTI-LANGUAGE (i18n) TRANSLATION DICTIONARY
------------------------------------------------------------------- */
const translations = {
  vi: {
    // Navigation
    'nav.home': 'Giới thiệu',
    'nav.about': 'Về tôi & Kỹ năng',
    'nav.projects': 'Dự án',
    'nav.achievements': 'Thành tích',
    'nav.certificates': 'Chứng chỉ',
    'nav.activities': 'Hoạt động',
    'nav.contact': 'Liên hệ',
    'nav.cv': 'Tải CV',
    'nav.collaborate': 'Hợp tác ngay',
    'mobile.lang_label': 'Ngôn ngữ / Language:',
    'mobile.contact_now': 'Liên hệ ngay',

    // Hero Section
    'hero.ai_badge_main': 'Website Portfolio cá nhân được xây dựng bằng <strong>AI Agent (Google Antigravity)</strong> 🚀',
    'hero.ai_beta': 'Phiên bản Beta',
    'hero.ai_badge_sub': 'Đang tiếp tục nâng cấp và hoàn thiện mỗi ngày',
    'hero.greeting': 'Xin chào, mình là',
    'hero.motto': 'I never lose. I either win or learn!',
    'hero.role_ai': '<i class="fa-solid fa-robot"></i> Business & Ứng dụng AI Agent',
    'hero.role_mc': '<i class="fa-solid fa-microphone-lines"></i> MC & Nghiên cứu',
    'hero.role_lang': '<i class="fa-solid fa-language"></i> Tiếng Anh & Tiếng Trung',
    'hero.mission_tag': 'Tuyên ngôn cá nhân',
    'hero.mission_text': '“You may know me in many roles, but my true mission is to forge myself, pave the way, and awaken the strength in others.”',
    'hero.description': 'Chào bạn! Mình là Minh Trí (Eric) — một người trẻ mang tinh thần ham học hỏi, yêu thích lĩnh vực Business và đam mê khám phá, ứng dụng AI Agent vào thực tế. Bên cạnh đó, mình còn thích cầm mic nói trước đám đông, nghiên cứu những điều mới mẻ và chinh phục ngoại ngữ. Mình tin rằng việc không ngừng cập nhật tư duy và công nghệ mới chính là chìa khóa để rèn giũa bản thân và tạo ra giá trị tích cực cho cộng đồng.',
    'hero.cta_projects': 'Xem dự án của tôi',
    'hero.cta_contact': 'Liên hệ ngay',
    'hero.cta_cv': 'Xem CV',
    'hero.cta_cv_title': 'Xem trước bản CV',
    'hero.avatar_hint_title': 'Đỗ Minh Trí - Business & AI Agent Builder',
    'hero.badge_ai_sub': 'Ứng dụng AI Agent',
    'hero.badge_lang_title': 'Ngoại ngữ',
    'hero.badge_lang_sub': 'Tiếng Anh & Tiếng Trung',
    'hero.badge_award_title': 'Á Quân Khởi Nghiệp',
    'hero.badge_award_sub': 'Chân Trần Khởi Nghiệp Mùa 3',
    'hero.badge_edu_sub': 'Digital Marketing',

    // About Section
    'about.tag': 'Hành trình & Năng lực',
    'about.title': 'Về Tôi, Học Vấn & Kỹ Năng',
    'about.subtitle': 'Sự kết hợp giữa tư duy Quản trị Kinh doanh (Business), khả năng ứng dụng AI Agent vào xây dựng sản phẩm thực tế, kỹ năng giao tiếp/MC và nền tảng Digital Marketing.',
    'about.edu_title': 'Lộ Trình Học Vấn',
    'about.edu_sub': 'Nền tảng đào tạo chuẩn quốc tế và thực hành chuyên sâu',
    'about.edu_btec_badge': '09/2025 - Hiện tại',
    'about.edu_btec_major': '<i class="fa-solid fa-book-bookmark"></i> Chuyên ngành: <strong>Quản trị Kinh doanh (Business Administration)</strong>',
    'about.edu_btec_desc': 'Tiếp cận chương trình đào tạo chuẩn Anh Quốc Pearson BTEC, tập trung phát triển tư duy kinh doanh hiện đại, quản trị dự án, đổi mới sáng tạo và ứng dụng công nghệ/AI vào giải quyết bài toán thực tế của doanh nghiệp.',
    'about.edu_btec_t1': 'Business Administration',
    'about.edu_btec_t2': 'Tư duy khởi nghiệp',
    'about.edu_btec_t3': 'AI & Đổi mới sáng tạo',
    'about.edu_btec_t4': 'Quản trị dự án',
    'about.edu_poly_badge': '09/2023 - 09/2025',
    'about.edu_poly_pill': 'Tốt nghiệp Xuất Sắc',
    'about.edu_poly_major': '<i class="fa-solid fa-book-bookmark"></i> Chuyên ngành: <strong>Digital Marketing</strong>',
    'about.edu_poly_desc': 'Tốt nghiệp hệ Trung cấp với danh hiệu <strong>Xuất Sắc</strong>. Hoàn thành xuất sắc các đồ án thực tế về Content Marketing, thiết kế đồ họa truyền thông, tối ưu SEO website, chạy quảng cáo đa kênh và biên tập video ngắn.',
    'about.edu_poly_t1': 'Tốt nghiệp Xuất Sắc',
    'about.edu_poly_t2': 'Thực chiến dự án',
    'about.edu_poly_t3': 'Leader đồ án',

    'about.str_title': 'Định Hướng & Thế Mạnh',
    'about.str_sub': 'Cách tôi tạo ra giá trị cho doanh nghiệp',
    'about.str_ai_title': 'Ứng dụng & Điều phối AI Agent',
    'about.str_ai_desc': 'Xây dựng sản phẩm web, game mô phỏng và tối ưu quy trình làm việc tự động hóa bằng AI Coding Agent (Antigravity, GitHub, Netlify, Cloudflare Workers).',
    'about.str_biz_title': 'Tư duy Kinh doanh & Khởi nghiệp',
    'about.str_biz_desc': 'Phân tích bài toán thị trường, lập kế hoạch dự án, phân bổ nguồn lực và điều phối đội nhóm linh hoạt (Á quân Chân Trần Khởi Nghiệp, Bán kết FPT Biz Talent).',
    'about.str_mc_title': 'Thuyết trình, MC & Ngoại ngữ',
    'about.str_mc_desc': 'Tự tin dẫn dắt sân khấu, bảo vệ ý tưởng thuyết phục trước hội đồng chuyên môn và giao tiếp song ngữ chủ động (Tiếng Anh & Tiếng Trung).',
    'about.quote_text': '"Công nghệ và AI là đòn bẩy gia tăng hiệu suất vượt bậc, còn tư duy kinh doanh và thấu hiểu con người chính là gốc rễ tạo nên giá trị bền vững."',

    // Skills Section
    'skills.tag': 'Năng lực thực chiến',
    'skills.title': 'Kỹ Năng Nổi Bật',
    'skills.subtitle': 'Được tôi rèn luyện qua các kỳ học thực hành và đồ án thực tế',
    'skills.hard_title': 'Kỹ Năng Chuyên Môn (Hard Skills)',
    'skills.s1_title': 'Ứng dụng & Điều phối AI Agent',
    'skills.s1_desc': 'Xây dựng sản phẩm web, game mô phỏng và tối ưu quy trình làm việc bằng AI Coding Agent.',
    'skills.s2_title': 'Tư duy Kinh doanh & Khởi nghiệp',
    'skills.s2_desc': 'Phân tích bài toán thị trường, lập kế hoạch dự án, phân bổ nguồn lực và điều phối đội nhóm đạt mục tiêu.',
    'skills.s3_title': 'Thuyết trình, MC & Ngoại ngữ',
    'skills.s3_desc': 'Tự tin dẫn dắt sân khấu, bảo vệ ý tưởng thuyết phục trước đám đông và giao tiếp song ngữ chủ động.',
    'skills.s4_title': 'Quay dựng & Sản xuất Video ngắn',
    'skills.s4_desc': 'Bắt nhịp xu hướng TikTok/Reels, nắm vững cấu trúc Hook - Story - CTA, setup góc quay và xử lý hậu kỳ âm thanh, hình ảnh.',
    'skills.s5_title': 'Thiết kế ấn phẩm truyền thông (Canva)',
    'skills.s5_desc': 'Thiết kế banner truyền thông, infographic, poster quảng cáo và bài đăng đa slide (carousel) đồng bộ nhận diện thương hiệu.',
    'skills.s6_title': 'Sáng tạo nội dung & Copywriting',
    'skills.s6_desc': 'Xây dựng thông điệp nội dung chạm đúng insight người xem, giật tít hấp dẫn kết hợp công thức AIDA / PAS kích thích tương tác và chuyển đổi.',
    
    'skills.soft_title': 'Kỹ Năng Mềm (Soft Skills)',
    'skills.soft1_title': 'Làm việc nhóm & Quản lý thời gian',
    'skills.soft1_desc': 'Kinh nghiệm làm trưởng nhóm trong nhiều đồ án học tập; biết lắng nghe, chia sẻ trách nhiệm và kiểm soát deadline chặt chẽ.',
    'skills.soft2_title': 'Giao tiếp phối hợp linh hoạt',
    'skills.soft2_desc': 'Truyền đạt ý tưởng rõ ràng, dễ hiểu giữa các thành viên và giảng viên; linh hoạt xử lý tình huống phát sinh trong dự án.',
    'skills.soft3_title': 'Tư duy thẩm mỹ & Sáng tạo nội dung',
    'skills.soft3_desc': 'Gu thẩm mỹ hiện đại về màu sắc, bố cục và nhịp điệu video; không ngừng tìm tòi các phong cách thịnh hành mới trên mạng xã hội.',

    // Projects Section
    'projects.tag': 'Sản phẩm thực chiến',
    'projects.title': 'Dự Án Tiêu Biểu',
    'projects.subtitle': 'Các dự án thực tế tôi đã trực tiếp lập kế hoạch, điều phối nhóm và sản xuất ấn phẩm với vai trò <strong>Trưởng Nhóm (Leader)</strong>.',
    'projects.quick_view': 'Xem nhanh',
    'projects.role_leader': 'Trưởng nhóm',
    'projects.btn_detail': 'Xem chi tiết dự án',
    'p1.badge': 'Video Marketing',
    'p1.title': '1. Dự Án Content Marketing & Video Ngắn (Reels/TikTok)',
    'p1.excerpt': 'Xây dựng chuỗi video ngắn định dạng dọc giới thiệu dòng sản phẩm đồ uống/thời trang cho giới trẻ. Trực tiếp lên kịch bản, quay dựng và tối ưu âm thanh bắt trend.',
    'p1.hl1': 'Nghiên cứu thị hiếu Gen Z',
    'p1.hl2': 'Kịch bản 3 giây đầu thu hút (Hook)',
    'p1.hl3': 'Tối ưu tỷ lệ giữ chân người xem (Watch Time)',
    'p2.badge': 'SEO & Research',
    'p2.title': '2. Dự Án SEO & Nghiên Cứu Thị Trường Ngành Hàng',
    'p2.excerpt': 'Phân tích đối thủ cạnh tranh, nghiên cứu bộ từ khóa theo hành trình mua sắm của khách hàng (Buyer\'s Journey) và lập kế hoạch tối ưu cấu trúc nội dung Onpage.',
    'p2.hl1': 'Phân tích Insight & Đối thủ',
    'p2.hl2': 'Lập bộ từ khóa 100+ keywords tiềm năng',
    'p2.hl3': 'Tối ưu bài viết chuẩn SEO & UI/UX',
    'p3.badge': 'Brand Campaign',
    'p3.title': '3. Chiến Dịch Lập Kế Hoạch & Triển Khai Nội Dung Thương Hiệu',
    'p3.excerpt': 'Xây dựng chiến dịch truyền thông đa kênh cho thương hiệu trong dịp lễ/mở bán mới. Thiết lập thông điệp cốt lõi, ma trận nội dung và quản trị tiến độ thực thi.',
    'p3.hl1': 'Lên lịch Content Calendar đa kênh',
    'p3.hl2': 'Thiết kế bộ nhận diện ấn phẩm mạng xã hội',
    'p3.hl3': 'Điều phối 5 thành viên hoàn thành đúng hạn',
    'projects.hint': 'Các thẻ dự án đã có cấu trúc chuẩn bị sẵn. Bạn có thể nhấn vào nút "Xem chi tiết" để xem popup mô tả đầy đủ quy trình và cập nhật hình ảnh sản phẩm thực tế!',

    // Achievements Section
    'achieve.tag': 'Dấu mốc tự hào',
    'achieve.title': 'Thành Tích Nổi Bật',
    'achieve.subtitle': 'Sự ghi nhận cho tinh thần dấn thân, bản lĩnh khởi nghiệp và năng lực chuyên môn xuất sắc qua các đấu trường thực chiến.',
    'ach1.year': 'Mùa 3 - 2025',
    'ach1.title': 'Top 2 Cuộc Thi "Chân Trần Khởi Nghiệp" Mùa 3',
    'ach1.desc': 'Dự án <strong>Smart Mini Storage</strong> — Mô hình dịch vụ lưu trữ đồ bằng thùng thông minh tiện lợi dành cho gia đình, sinh viên và khách du lịch có không gian lưu trữ hạn chế.',
    'ach1.badge': 'Á Quân Khởi Nghiệp',
    'ach2.year': 'Năm 2025',
    'ach2.title': 'Top 35 Toàn Quốc FPT Biz Talent 2025',
    'ach2.desc': 'Vượt qua hàng trăm đội thi tài năng trẻ trên toàn quốc trong cuộc thi kinh doanh và giải quyết bài toán Marketing thực tế cho doanh nghiệp.',
    'ach2.badge': 'Cuộc thi uy tín cấp quốc gia',
    'ach3.year': 'Năm 2025',
    'ach3.title': 'Tham gia MOS World Championship 2025',
    'ach3.desc': 'Đại diện tham gia Vô địch Tin học Văn phòng Thế giới - MOS World Championship, khẳng định kỹ năng xử lý dữ liệu tin học văn phòng quốc tế.',
    'ach3.badge': 'Đấu trường quốc tế',
    'ach4.year': '2023 - 2025',
    'ach4.title': 'Sinh Viên Có Thành Tích Học Tập Xuất Sắc',
    'ach4.desc': 'Liên tục đạt kết quả học tập và rèn luyện xuất sắc tại FPT Polyschool Bình Định; nhận khen thưởng của nhà trường trong các kỳ học.',
    'ach4.badge': 'Danh hiệu học thuật',

    // Certificates Section
    'cert.tag': 'Năng lực công nghệ',
    'cert.title': 'Chứng Chỉ Chuyên Môn',
    'cert.subtitle': 'Minh chứng xác thực cho năng lực tư duy kinh doanh, đổi mới sáng tạo (Business & AI) và kỹ năng chuyên môn qua các chứng chỉ quốc tế cùng những cuộc thi khởi nghiệp uy tín.',
    'cert.btn_detail': 'Xem chi tiết',
    'cert.btn_photo': 'Xem ảnh',
    'cert.zoom_tooltip': 'Bấm vào để phóng to xem rõ chứng nhận',
    'cert.zoom_badge': 'Phóng to chứng nhận',
    'cert.zoom_cert': 'Phóng to chứng chỉ',
    'cert.zoom_sheet': 'Phóng to giấy khen',
    'cert1.badge': 'Top 2 • Á quân',
    'cert1.title': 'Top 2 Chung kết — Cuộc thi Chân Trần Khởi Nghiệp (Mùa 3)',
    'cert2.badge': 'Bán kết Toàn quốc',
    'cert2.org': 'Tập đoàn FPT',
    'cert2.title': 'Vòng Bán kết Toàn quốc — Cuộc thi FPT Biz Talent 2025',
    'cert3.badge': 'Đã xác thực Certiport',
    'cert3.title': 'Microsoft Office Specialist: Excel 2019 Associate',
    'cert4.badge': 'Xuất sắc • Spring 2025',
    'cert4.org': 'FPT Polyschool Bình Định',
    'cert4.title': 'Sinh viên có thành tích học tập xuất sắc',

    // Activities Section
    'act.tag': 'Đóng góp xã hội & Kỹ năng',
    'act.title': 'Hoạt Động & Cộng Đồng',
    'act.subtitle': 'Tích cực tham gia các hoạt động ngoại khóa, phong trào thanh niên và công tác tổ chức sự kiện, thể hiện tinh thần lãnh đạo, trách nhiệm xã hội và khả năng kết nối đội ngũ.',
    'act.zoom_photo': 'Phóng to ảnh',
    'act.zoom_tooltip': 'Bấm vào để phóng to xem rõ',
    'act1.badge': 'Ban Lãnh đạo',
    'act1.title': 'Phó Chủ tịch (Vice President) — Ban Lãnh đạo Nhiệm kỳ I',
    'act2.badge': 'Ban Tổ chức Sự kiện',
    'act2.title': 'Thành viên Ban Tổ chức (Organizing Committee)',
    'act3.badge': 'Thiện nguyện cộng đồng',
    'act3.loc': 'Ngũ Hành Sơn, Đà Nẵng',
    'act3.title': 'Tình nguyện viên đóng góp tích cực',

    // Contact Section
    'contact.tag': 'Kết nối hợp tác',
    'contact.title': 'Thông Tin Liên Hệ',
    'contact.subtitle': 'Tôi luôn sẵn sàng đón nhận các cơ hội Thực tập sinh Marketing, dự án sáng tạo nội dung hoặc trao đổi chuyên môn. Hãy kết nối với tôi!',
    'contact.direct_title': 'Thông Tin Trực Tiếp',
    'contact.lbl_email': 'Email liên hệ:',
    'contact.copy_email': 'Sao chép email',
    'contact.lbl_phone': 'Số điện thoại:',
    'contact.copy_phone': 'Sao chép số điện thoại',
    'contact.lbl_address': 'Địa chỉ hiện tại:',
    'contact.val_address': '152 Phan Thanh, Thanh Khê, TP. Đà Nẵng',
    'contact.btn_call': 'Gọi điện ngay',
    'contact.btn_mail': 'Gửi email',
    'contact.ref_badge': 'Người Tham Chiếu (Reference)',
    'contact.ref_name': 'Cô Nguyễn Thị Thanh Tâm',
    'contact.ref_role': 'Giảng viên bộ môn Digital Marketing',
    'contact.ref_phone': 'SĐT liên hệ: <strong>0937.272.236</strong>',
    'contact.ref_note': 'Giảng viên trực tiếp giảng dạy và đánh giá năng lực học thuật & thái độ làm việc của tôi tại trường.',
    'contact.form_title': 'Gửi Lời Nhắn Nhanh',
    'contact.form_desc': 'Hãy để lại thông tin hoặc yêu cầu tuyển dụng, tôi sẽ phản hồi trong vòng 24 giờ!',
    'contact.lbl_name': 'Họ và tên của bạn',
    'contact.holder_name': 'Ví dụ: Nguyễn Văn A',
    'contact.lbl_email_f': 'Địa chỉ Email',
    'contact.lbl_phone_f': 'Số điện thoại',
    'contact.lbl_subj': 'Mục đích liên hệ',
    'contact.lbl_msg': 'Nội dung tin nhắn',
    'contact.holder_msg': 'Nhập chi tiết yêu cầu, mô tả công việc hoặc lời nhắn của bạn...',
    'contact.opt_placeholder': 'Chọn mục đích liên hệ',
    'contact.opt_intern': 'Cơ hội Thực tập sinh Marketing',
    'contact.opt_video': 'Quay dựng Video ngắn / Freelance',
    'contact.opt_content': 'Sáng tạo nội dung & Quản trị Fanpage/TikTok',
    'contact.opt_other': 'Trao đổi công việc khác',
    'contact.btn_send': 'Gửi tin nhắn ngay',
    'contact.success_title': 'Cảm ơn bạn đã liên hệ!',
    'contact.success_desc': 'Tin nhắn của bạn đã được ghi nhận. Đỗ Minh Trí sẽ kiểm tra email và liên lạc lại với bạn trong thời gian sớm nhất.',
    'contact.btn_reset': 'Gửi tin nhắn khác',

    // Footer
    'footer.bio': 'Đỗ Minh Trí — Thực Tập Sinh Marketing | Quay dựng Video ngắn & Sáng tạo Nội dung. Sẵn sàng mang đến những ý tưởng tươi mới và năng lượng tích cực cho đội ngũ của bạn.',
    'footer.quick_links': 'Liên kết nhanh',
    'footer.docs_title': 'Tài liệu & Hồ sơ',
    'footer.cv_desc': 'Tải bản CV đầy đủ kèm thông tin xác thực quá trình học tập và giải thưởng.',
    'footer.download_cv': 'Tải bản CV hoàn chỉnh',
    'footer.copyright': '© 2026 <strong>Đỗ Minh Trí</strong>. Bản quyền thuộc về tác giả. Thiết kế chuyên nghiệp, tối ưu hóa giao diện người dùng (UI/UX).',
    'footer.back_to_top': 'Về đầu trang',

    // Lightbox
    'lightbox.badge': 'Ảnh minh chứng thực tế',
    'lightbox.download': 'Tải ảnh về máy',
    'lightbox.open_tab': 'Mở tab mới'
  },

  en: {
    // Navigation
    'nav.home': 'About Me',
    'nav.about': 'Profile & Skills',
    'nav.projects': 'Projects',
    'nav.achievements': 'Achievements',
    'nav.certificates': 'Certificates',
    'nav.activities': 'Activities',
    'nav.contact': 'Contact',
    'nav.cv': 'Download CV',
    'nav.collaborate': 'Work Together',
    'mobile.lang_label': 'Language / Ngôn ngữ:',
    'mobile.contact_now': 'Contact Now',

    // Hero Section
    'hero.ai_badge_main': 'Personal Portfolio built with <strong>AI Agent (Google Antigravity)</strong> 🚀',
    'hero.ai_beta': 'Beta Release',
    'hero.ai_badge_sub': 'Continuously upgraded and optimized daily',
    'hero.greeting': 'Hello, I am',
    'hero.motto': 'I never lose. I either win or learn!',
    'hero.role_ai': '<i class="fa-solid fa-robot"></i> Business & AI Agent Solutions',
    'hero.role_mc': '<i class="fa-solid fa-microphone-lines"></i> Public Speaker & Research',
    'hero.role_lang': '<i class="fa-solid fa-language"></i> English & Chinese',
    'hero.mission_tag': 'Personal Mission',
    'hero.mission_text': '“You may know me in many roles, but my true mission is to forge myself, pave the way, and awaken the strength in others.”',
    'hero.description': 'Hello! I\'m Minh Tri (Eric) — an energetic learner passionate about modern Business administration and real-world AI Agent implementations. Beyond tech, I thrive as a public speaker/MC, curious researcher, and language enthusiast. I believe relentless growth and adopting frontier technology are the keys to self-mastery and delivering meaningful social value.',
    'hero.cta_projects': 'Explore My Projects',
    'hero.cta_contact': 'Get In Touch',
    'hero.cta_cv': 'View CV',
    'hero.cta_cv_title': 'Preview Resume',
    'hero.avatar_hint_title': 'Do Minh Tri - Business & AI Agent Builder',
    'hero.badge_ai_sub': 'AI Agent Solutions',
    'hero.badge_lang_title': 'Languages',
    'hero.badge_lang_sub': 'English & Chinese',
    'hero.badge_award_title': 'Startup Runner-Up',
    'hero.badge_award_sub': 'Barefoot Startup Season 3',
    'hero.badge_edu_sub': 'Digital Marketing',

    // About Section
    'about.tag': 'Journey & Capabilities',
    'about.title': 'About Me, Education & Skills',
    'about.subtitle': 'A synergy of Business Administration mindset, hands-on AI Agent application, public speaking/MC skills, and a strong Digital Marketing foundation.',
    'about.edu_title': 'Education Pathway',
    'about.edu_sub': 'International standards and intensive hands-on practice',
    'about.edu_btec_badge': '09/2025 - Present',
    'about.edu_btec_major': '<i class="fa-solid fa-book-bookmark"></i> Major: <strong>Business Administration</strong>',
    'about.edu_btec_desc': 'Enrolled in the Pearson BTEC Higher National curriculum (UK), cultivating modern business acumen, project management, innovation strategies, and applying technology/AI to solve enterprise challenges.',
    'about.edu_btec_t1': 'Business Administration',
    'about.edu_btec_t2': 'Startup Mindset',
    'about.edu_btec_t3': 'AI & Innovation',
    'about.edu_btec_t4': 'Project Management',
    'about.edu_poly_badge': '09/2023 - 09/2025',
    'about.edu_poly_pill': 'High Distinction Honors',
    'about.edu_poly_major': '<i class="fa-solid fa-book-bookmark"></i> Major: <strong>Digital Marketing</strong>',
    'about.edu_poly_desc': 'Graduated with <strong>High Distinction</strong> honors. Successfully delivered practical projects in Content Marketing, visual brand design, SEO architecture, omnichannel advertising, and short-form video production.',
    'about.edu_poly_t1': 'High Distinction',
    'about.edu_poly_t2': 'Hands-on Projects',
    'about.edu_poly_t3': 'Project Team Leader',

    'about.str_title': 'Orientation & Core Strengths',
    'about.str_sub': 'How I deliver sustainable value to organizations',
    'about.str_ai_title': 'AI Agent Solutions & Orchestration',
    'about.str_ai_desc': 'Developing web apps, simulation experiences, and automating workflows using AI Coding Agents (Antigravity, GitHub, Netlify, Cloudflare Workers).',
    'about.str_biz_title': 'Business Acumen & Entrepreneurship',
    'about.str_biz_desc': 'Analyzing market opportunities, formulating project plans, allocating resources, and leading teams effectively (Barefoot Startup Runner-up, FPT Biz Talent Semi-finalist).',
    'about.str_mc_title': 'Public Speaking, MC & Languages',
    'about.str_mc_desc': 'Confidently leading events, pitching ideas persuasively to professional panels, and proactively communicating in bilingual English & Chinese.',
    'about.quote_text': '"Technology and AI are extraordinary catalysts for productivity, while business acumen and human empathy remain the foundation of lasting value."',

    // Skills Section
    'skills.tag': 'Practical Capabilities',
    'skills.title': 'Core Skills & Expertise',
    'skills.subtitle': 'Honed through hands-on coursework and real-world projects',
    'skills.hard_title': 'Technical Skills (Hard Skills)',
    'skills.s1_title': 'AI Agent Solutions & Orchestration',
    'skills.s1_desc': 'Building web apps, simulation experiences, and automating workflows with AI Coding Agents.',
    'skills.s2_title': 'Business Mindset & Entrepreneurship',
    'skills.s2_desc': 'Market analysis, strategic planning, resource allocation, and result-oriented team leadership.',
    'skills.s3_title': 'Public Speaking, MC & Languages',
    'skills.s3_desc': 'Stage hosting, pitching persuasively in front of audiences, and active bilingual communication.',
    'skills.s4_title': 'Short-form Video Production & Editing',
    'skills.s4_desc': 'Trend mastery on TikTok/Reels, Hook-Story-CTA structure, filming setup, and audio-visual post-production.',
    'skills.s5_title': 'Media & Visual Design (Canva)',
    'skills.s5_desc': 'Crafting promotional banners, infographics, posters, and brand-consistent social carousels.',
    'skills.s6_title': 'Content Creation & Copywriting',
    'skills.s6_desc': 'Formulating insight-driven messaging, high-converting hooks, and AIDA/PAS structured copywriting.',
    
    'skills.soft_title': 'Interpersonal Skills (Soft Skills)',
    'skills.soft1_title': 'Teamwork & Time Management',
    'skills.soft1_desc': 'Experienced team leader in academic projects; active listener, responsible delegator, and strict deadline manager.',
    'skills.soft2_title': 'Adaptable Communication',
    'skills.soft2_desc': 'Articulating ideas clearly between team members and instructors; resolving unforeseen project challenges smoothly.',
    'skills.soft3_title': 'Aesthetic Vision & Creative Thinking',
    'skills.soft3_desc': 'Modern aesthetic sense in colors, layout, and video pacing; continuously exploring emerging trends.',

    // Projects Section
    'projects.tag': 'Featured Portfolio',
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Real-world projects personally planned, team-directed, and executed as a <strong>Team Leader</strong>.',
    'projects.quick_view': 'Quick View',
    'projects.role_leader': 'Team Leader',
    'projects.btn_detail': 'View Project Details',
    'p1.badge': 'Video Marketing',
    'p1.title': '1. Content Marketing & Short-form Video Project (Reels/TikTok)',
    'p1.excerpt': 'Producing a vertical short-video campaign for youth lifestyle brands. Spearheaded scriptwriting, video shooting, audio sync, and trend optimization.',
    'p1.hl1': 'Gen Z trend & insight analysis',
    'p1.hl2': 'High-converting 3s hook scripting',
    'p1.hl3': 'Audience retention rate optimization',
    'p2.badge': 'SEO & Research',
    'p2.title': '2. SEO & Market Research Project',
    'p2.excerpt': 'Competitor analysis, keyword mapping across the Buyer\'s Journey, and Onpage content architecture planning.',
    'p2.hl1': 'Competitor & customer insight analysis',
    'p2.hl2': 'Building 100+ high-potential keywords',
    'p2.hl3': 'SEO content & UI/UX optimization',
    'p3.badge': 'Brand Campaign',
    'p3.title': '3. Integrated Brand Content Campaign (IMC)',
    'p3.excerpt': 'Planning and executing an omnichannel campaign for seasonal launch. Establishing key messaging, content matrix, and timeline control.',
    'p3.hl1': 'Multichannel Content Calendar design',
    'p3.hl2': 'Social media visual brand kit design',
    'p3.hl3': 'Coordinating 5 team members to meet KPIs',
    'projects.hint': 'Project cards are interactive. Click "View Project Details" to explore the full methodology, goals, and results!',

    // Achievements Section
    'achieve.tag': 'Milestones & Honors',
    'achieve.title': 'Key Achievements',
    'achieve.subtitle': 'Recognition of entrepreneurial drive, perseverance, and proven competence across competitive arenas.',
    'ach1.year': 'Season 3 - 2025',
    'ach1.title': 'Top 2 Barefoot Startup Competition (Season 3)',
    'ach1.desc': 'Project <strong>Smart Mini Storage</strong> — Smart container storage solution for urban residents, students, and tourists with limited space.',
    'ach1.badge': 'Startup Runner-Up',
    'ach2.year': 'Year 2025',
    'ach2.title': 'Top 35 Nationwide FPT Biz Talent 2025',
    'ach2.desc': 'Selected among hundreds of youth teams nationwide in business strategy and solving real enterprise marketing challenges.',
    'ach2.badge': 'Prestigious National Arena',
    'ach3.year': 'Year 2025',
    'ach3.title': 'Participant - MOS World Championship 2025',
    'ach3.desc': 'Represented institution at the Microsoft Office Specialist World Championship, validating international spreadsheet proficiency.',
    'ach3.badge': 'Global Competition',
    'ach4.year': '2023 - 2025',
    'ach4.title': 'Student of Academic Excellence',
    'ach4.desc': 'Consistently achieved high distinction academic performance at FPT Polyschool Binh Dinh; awarded semester commendations.',
    'ach4.badge': 'Academic Honors',

    // Certificates Section
    'cert.tag': 'Certified Credentials',
    'cert.title': 'Professional Certifications',
    'cert.subtitle': 'Verified credentials demonstrating business acumen, innovation (Business & AI), and technical competencies across international standards and entrepreneurship competitions.',
    'cert.btn_detail': 'View Details',
    'cert.btn_photo': 'View Image',
    'cert.zoom_tooltip': 'Click to enlarge and view verified certificate',
    'cert.zoom_badge': 'Enlarge Certificate',
    'cert.zoom_cert': 'Enlarge Certificate',
    'cert.zoom_sheet': 'Enlarge Commendation',
    'cert1.badge': 'Top 2 • Runner-up',
    'cert1.title': 'Top 2 Barefoot Startup Competition (Season 3)',
    'cert2.badge': 'National Semi-final',
    'cert2.org': 'FPT Corporation',
    'cert2.title': 'National Semi-final — FPT Biz Talent 2025',
    'cert3.badge': 'Certiport Verified',
    'cert3.title': 'Microsoft Office Specialist: Excel 2019 Associate',
    'cert4.badge': 'Excellence • Spring 2025',
    'cert4.org': 'FPT Polyschool Binh Dinh',
    'cert4.title': 'Student of Academic Excellence',

    // Activities Section
    'act.tag': 'Social Impact & Leadership',
    'act.title': 'Activities & Community',
    'act.subtitle': 'Active participation in extracurriculars, youth initiatives, and event operations, demonstrating leadership, community engagement, and team collaboration.',
    'act.zoom_photo': 'Enlarge Photo',
    'act.zoom_tooltip': 'Click to enlarge and view proof',
    'act1.badge': 'Executive Board',
    'act1.title': 'Vice President — Executive Board (Term I)',
    'act2.badge': 'Organizing Committee',
    'act2.title': 'Organizing Committee Member — Graduation 2026',
    'act3.badge': 'Community Volunteer',
    'act3.loc': 'Ngu Hanh Son, Danang',
    'act3.title': 'Active Community Volunteer — Love Journey No. 4',

    // Contact Section
    'contact.tag': 'Get In Touch',
    'contact.title': 'Contact Information',
    'contact.subtitle': 'Open to Marketing Internship opportunities, content creation projects, or professional collaboration. Feel free to connect!',
    'contact.direct_title': 'Direct Contact',
    'contact.lbl_email': 'Email address:',
    'contact.copy_email': 'Copy email',
    'contact.lbl_phone': 'Phone number:',
    'contact.copy_phone': 'Copy phone number',
    'contact.lbl_address': 'Current location:',
    'contact.val_address': '152 Phan Thanh, Thanh Khe, Danang City',
    'contact.btn_call': 'Call Directly',
    'contact.btn_mail': 'Send Email',
    'contact.ref_badge': 'Professional Reference',
    'contact.ref_name': 'Ms. Nguyen Thi Thanh Tam',
    'contact.ref_role': 'Digital Marketing Lecturer',
    'contact.ref_phone': 'Phone: <strong>0937.272.236</strong>',
    'contact.ref_note': 'Direct instructor assessing my academic competence and professional working attitude.',
    'contact.form_title': 'Send a Quick Message',
    'contact.form_desc': 'Leave your message or recruitment opportunity, and I will respond within 24 hours!',
    'contact.lbl_name': 'Your Full Name',
    'contact.holder_name': 'e.g. John Doe',
    'contact.lbl_email_f': 'Email Address',
    'contact.lbl_phone_f': 'Phone Number',
    'contact.lbl_subj': 'Inquiry Purpose',
    'contact.lbl_msg': 'Message Content',
    'contact.holder_msg': 'Enter your message, job description, or inquiry details...',
    'contact.opt_placeholder': 'Select inquiry purpose',
    'contact.opt_intern': 'Marketing Internship Opportunity',
    'contact.opt_video': 'Short-form Video / Freelance',
    'contact.opt_content': 'Content Creation & Channel Management',
    'contact.opt_other': 'Other Business Inquiries',
    'contact.btn_send': 'Send Message Now',
    'contact.success_title': 'Thank You for Reaching Out!',
    'contact.success_desc': 'Your message has been received. Do Minh Tri will review and get back to you shortly.',
    'contact.btn_reset': 'Send Another Message',

    // Footer
    'footer.bio': 'Do Minh Tri — Marketing Intern | Short-form Video Creator & Content Strategist. Ready to bring fresh ideas and energetic execution to your team.',
    'footer.quick_links': 'Quick Links',
    'footer.docs_title': 'Documents & Profile',
    'footer.cv_desc': 'Download the full resume with verified academic credentials and honors.',
    'footer.download_cv': 'Download Full Resume',
    'footer.copyright': '© 2026 <strong>Do Minh Tri</strong>. All rights reserved. Crafted with professional design & optimized UI/UX.',
    'footer.back_to_top': 'Back to Top',

    // Lightbox
    'lightbox.badge': 'Official Evidence',
    'lightbox.download': 'Download Photo',
    'lightbox.open_tab': 'Open in New Tab'
  }
};

/* -------------------------------------------------------------------
   2. INITIALIZE LANGUAGE SWITCHER ENGINE
------------------------------------------------------------------- */
function initLanguageSwitcher() {
  const savedLang = localStorage.getItem('portfolio_lang');
  currentLang = (savedLang === 'en') ? 'en' : 'vi';

  // Attach event listeners to all switcher buttons (desktop & mobile)
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        applyLanguage(targetLang);
      }
    });
  });

  // Apply active language to DOM
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  currentLang = (lang === 'en') ? 'en' : 'vi';
  localStorage.setItem('portfolio_lang', currentLang);
  document.documentElement.lang = currentLang;

  // 1. Update button active states
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 2. Update all data-i18n text
  const i18nElements = document.querySelectorAll('[data-i18n]');
  i18nElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });

  // 3. Update data-i18n-placeholder
  const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.setAttribute('placeholder', translations[currentLang][key]);
    }
  });

  // 4. Update data-i18n-title
  const titleElements = document.querySelectorAll('[data-i18n-title]');
  titleElements.forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.setAttribute('title', translations[currentLang][key]);
    }
  });

  // 5. Update data-i18n-aria-label
  const ariaElements = document.querySelectorAll('[data-i18n-aria-label]');
  ariaElements.forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (translations[currentLang] && translations[currentLang][key]) {
      el.setAttribute('aria-label', translations[currentLang][key]);
    }
  });

  // 6. Live re-render currently active modal if open
  const projectModal = document.getElementById('project-modal');
  if (projectModal && projectModal.classList.contains('active') && currentOpenProjectId) {
    openProjectModal(currentOpenProjectId);
  }

  const activityModal = document.getElementById('activity-modal');
  if (activityModal && activityModal.classList.contains('active') && currentOpenActivityId) {
    openActivityModal(currentOpenActivityId);
  }

  const certModal = document.getElementById('certificate-modal');
  if (certModal && certModal.classList.contains('active') && currentOpenCertId) {
    openCertificateModal(currentOpenCertId);
  }
}

/* -------------------------------------------------------------------
   3. SCROLL PROGRESS BAR
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
   4. STICKY HEADER WITH BLUR & SHADOW
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
   5. MOBILE NAVIGATION DRAWER
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
   6. SCROLL SPY FOR NAVIGATION
------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (sections.length === 0) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120; // Offset for sticky navbar

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        // Desktop nav update
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

        // Mobile drawer nav update
        mobileLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* -------------------------------------------------------------------
   7. SCROLL ANIMATION (INTERSECTION OBSERVER)
------------------------------------------------------------------- */
function initScrollAnimations() {
  const animElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (animElements.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    animElements.forEach(el => el.classList.add('active'));
  }
}

/* -------------------------------------------------------------------
   8. BACK TO TOP BUTTON
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
   9. PROJECT MODAL POPUP & BILINGUAL DATA
------------------------------------------------------------------- */
const projectDetailsData = {
  vi: {
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
      badgeProject: "Đồ Án Thực Tế | FPT Digital Marketing",
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
      badgeProject: "Đồ Án Thực Tế | FPT Digital Marketing",
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
      badgeProject: "Đồ Án Thực Tế | FPT Digital Marketing",
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
  },

  en: {
    1: {
      id: 1,
      title: "Content Marketing & Short-form Video Project (Reels/TikTok)",
      category: "Video Marketing & Social Viral",
      role: "Team Leader & Video Producer",
      duration: "2 months (Coursework Project)",
      teamSize: "4 members",
      tools: ["CapCut Pro", "Adobe Premiere Pro", "TikTok Creator Studio", "Canva Pro", "Smartphone 4K & Gimbal"],
      bannerGradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #ff6b35 100%)",
      icon: "fa-brands fa-tiktok",
      badgeProject: "Academic Project | FPT Digital Marketing",
      overview: "Researched short-video consumption patterns of Gen Z audiences and produced a 15-video vertical campaign (9:16) for modern lifestyle brands.",
      objectives: [
        "Build a vibrant, relatable, and engaging brand persona on TikTok and Instagram Reels.",
        "A/B test 3-second hook variations (Curiosity, Questions, Before/After, Surprises) to maximize viewer retention.",
        "Achieve over 50,000+ organic views and an engagement rate exceeding 8%."
      ],
      contributions: [
        "Conceptualized and wrote detailed storyboards and scripts for all 15 videos.",
        "Managed talent staging, props, cinematography angles, and lighting with gimbal setups.",
        "Edited post-production, color grading, sound design (SFX), and selected trending soundtracks.",
        "Monitored TikTok Analytics to optimize posting schedule and hashtag strategies."
      ],
      results: [
        "Campaign generated over 120,000+ cumulative views across both platforms.",
        "Top viral video achieved 45,000+ views, 3,200+ likes, and 180+ shares.",
        "Awarded an Excellent grade (9.5/10) by faculty for visual execution and narrative storytelling."
      ]
    },
    2: {
      id: 2,
      title: "SEO & Industry Market Research Project",
      category: "Search Engine Optimization & Market Research",
      role: "Team Leader & Data Analyst",
      duration: "2.5 months",
      teamSize: "5 members",
      tools: ["Google Search Console", "Google Analytics (GA4)", "Google Keyword Planner", "Ahrefs", "Microsoft Excel MOS"],
      bannerGradient: "linear-gradient(135deg, #065f46 0%, #059669 50%, #0284c7 100%)",
      icon: "fa-solid fa-chart-line",
      badgeProject: "Academic Project | FPT Digital Marketing",
      overview: "Conducted comprehensive market research and executed Onpage SEO & Content Hub strategy for an e-commerce lifestyle brand.",
      objectives: [
        "Identify Buyer Personas and search intent journeys across key stages.",
        "Analyze strengths and weaknesses of top 3 direct organic search competitors on Google.",
        "Develop website information architecture and extensive keyword mapping via Topic Clusters."
      ],
      contributions: [
        "Led team in filtering 150+ high-volume keywords with balanced Keyword Difficulty.",
        "Leveraged MOS Excel 2019 data processing to segment search volume and conversion potential.",
        "Authored SEO-standard pillar articles (1,500+ words) optimizing Headings, Meta, Alt, and Internal Links.",
        "Tracked CTR, dwell time, and keyword rankings via Google Search Console."
      ],
      results: [
        "15 target keywords reached Google Top 10 within 6 weeks post-indexing.",
        "Increased organic clicks by 250% compared to baseline benchmark.",
        "Selected by the academic evaluation board as a showcase report for future cohorts."
      ]
    },
    3: {
      id: 3,
      title: "Integrated Brand Content Planning & Execution Campaign",
      category: "Integrated Marketing Campaign (IMC) & Branding",
      role: "Team Leader & Campaign Manager",
      duration: "3 months",
      teamSize: "5 members",
      tools: ["Notion Project Board", "Canva Pro Brand Kit", "Meta Business Suite", "Google Docs / Sheets", "Trello"],
      bannerGradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #f43f5e 100%)",
      icon: "fa-solid fa-bullseye",
      badgeProject: "Academic Project | FPT Digital Marketing",
      overview: "Formulated an Integrated Marketing Communications (IMC) plan for a seasonal collection launch, defining Key Message, visual brand identity, and a 30-day multichannel content calendar.",
      objectives: [
        "Define brand style guidelines: color palette, typography, and Brand Tone & Voice.",
        "Deploy 70-20-10 content matrix: 70% value-driven, 20% emotional engagement, 10% direct conversion.",
        "Ensure daily publication schedule without bottlenecks through structured review workflows."
      ],
      contributions: [
        "Structured master planning board on Notion with daily schedules and RACI model assignments.",
        "Designed 20+ social media banners and carousel templates on Canva aligned with brand guidelines.",
        "Facilitated weekly team meetings to unblock issues, motivate members, and maintain team cohesion.",
        "Conducted end-of-campaign post-mortem analysis and performance reporting."
      ],
      results: [
        "Achieved 100% KPI completion across all creative assets and editorial posts on schedule.",
        "Page engagement surged by 180% with outstanding customer message response rates.",
        "Directly contributed to earning a High Distinction graduation grade at FPT Polyschool."
      ]
    }
  }
};

/**
 * Open Project Details Modal
 */
function openProjectModal(projectId) {
  currentOpenProjectId = projectId;
  const langData = projectDetailsData[currentLang] || projectDetailsData['vi'];
  const data = langData[projectId];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('project-modal-backdrop');
  const container = document.getElementById('modal-content-container');

  if (!modal || !backdrop || !container) return;

  const isEn = (currentLang === 'en');

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
          ${data.badgeProject}
        </span>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #ffffff;">${data.title}</h3>
      </div>
    </div>

    <div class="modal-grid">
      <!-- Main Content Column -->
      <div class="modal-main-col">
        <div class="modal-section-title">
          <i class="fa-solid fa-circle-info text-primary-color"></i>
          <span>${isEn ? 'Project Overview' : 'Tổng quan dự án'}</span>
        </div>
        <p class="modal-text">${data.overview}</p>

        <div class="modal-section-title">
          <i class="fa-solid fa-bullseye text-orange-color"></i>
          <span>${isEn ? 'Campaign Objectives' : 'Mục tiêu chiến dịch'}</span>
        </div>
        <ul class="modal-list">
          ${objectivesHtml}
        </ul>

        <div class="modal-section-title">
          <i class="fa-solid fa-list-check text-primary-color"></i>
          <span>${isEn ? 'Key Contributions & Responsibilities' : 'Đóng góp & Trách nhiệm cá nhân'}</span>
        </div>
        <ul class="modal-list">
          ${contributionsHtml}
        </ul>

        <div class="modal-section-title">
          <i class="fa-solid fa-trophy text-orange-color"></i>
          <span>${isEn ? 'Key Results & Takeaways' : 'Kết quả đạt được & Bài học'}</span>
        </div>
        <ul class="modal-list modal-list-results">
          ${resultsHtml}
        </ul>
      </div>

      <!-- Sidebar Metadata Column -->
      <div class="modal-side-col">
        <div class="modal-info-card">
          <h4 class="modal-info-card-title">${isEn ? 'Project Specifications' : 'Thông Tin Đồ Án'}</h4>

          <div class="modal-info-item">
            <span class="info-label"><i class="fa-regular fa-clock"></i> ${isEn ? 'Duration:' : 'Thời gian thực hiện:'}</span>
            <span class="info-val">${data.duration}</span>
          </div>

          <div class="modal-info-item">
            <span class="info-label"><i class="fa-solid fa-users"></i> ${isEn ? 'Team Size:' : 'Quy mô đội nhóm:'}</span>
            <span class="info-val">${data.teamSize}</span>
          </div>

          <div class="modal-info-item">
            <span class="info-label"><i class="fa-solid fa-user-check"></i> ${isEn ? 'Assigned Role:' : 'Vai trò đảm nhận:'}</span>
            <span class="info-val"><strong>${data.role}</strong></span>
          </div>

          <div class="modal-info-item">
            <span class="info-label"><i class="fa-solid fa-screwdriver-wrench"></i> ${isEn ? 'Tools & Technologies:' : 'Công nghệ & Công cụ:'}</span>
            <div class="skill-tools mt-2">
              ${toolsHtml}
            </div>
          </div>
        </div>

        <div class="modal-info-card mt-3">
          <h4 class="modal-info-card-title">${isEn ? 'Explore Real Artifacts' : 'Trải nghiệm sản phẩm thực tế'}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
            ${isEn ? 'Click the button below to view live deliverables, reports, or videos:' : 'Nhấp vào nút bên dưới để mở liên kết sản phẩm, tài liệu phân tích hoặc video hoàn chỉnh:'}
          </p>
          <a href="#contact" class="btn btn-primary btn-sm w-100" onclick="closeProjectModal()">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span>${isEn ? 'Open Project Demo' : 'Mở liên kết dự án (Demo)'}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Modal Footer Actions -->
    <div class="modal-actions" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end;">
      <button type="button" class="btn btn-ghost btn-sm" onclick="closeProjectModal()">
        <i class="fa-solid fa-xmark"></i> ${isEn ? 'Close' : 'Đóng'}
      </button>
      <a href="#contact" class="btn btn-primary btn-sm" onclick="closeProjectModal()">
        <i class="fa-solid fa-comments"></i> ${isEn ? 'Discuss this project' : 'Trao đổi về dự án này'}
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
  currentOpenProjectId = null;
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('project-modal-backdrop');

  if (modal) modal.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  
  const activityModal = document.getElementById('activity-modal');
  const certModal = document.getElementById('certificate-modal');
  const lightbox = document.getElementById('image-lightbox');
  const isOtherOpen = (activityModal && activityModal.classList.contains('active')) ||
                      (certModal && certModal.classList.contains('active')) ||
                      (lightbox && lightbox.classList.contains('active'));
  if (!isOtherOpen) {
    document.body.style.overflow = '';
  }
}

/* -------------------------------------------------------------------
   10. ACTIVITY DETAILS MODAL POPUP & BILINGUAL DATA
------------------------------------------------------------------- */
const activityDetailsData = {
  vi: {
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
  },

  en: {
    1: {
      id: 1,
      title: "BBE Pegasus Chapter — Executive Board Term I",
      role: "Vice President — Executive Board (Term I)",
      organization: "BBE Pegasus Chapter",
      eventOrg: "BBE Pegasus Chapter",
      timeLocation: "01/02/2026 – 30/09/2026",
      badgeType: "Executive Board",
      badgeClass: "badge-leader",
      mainImage: "act-pegasus.jpg",
      description: "Demonstrated strong leadership, operational coordination, and successfully fulfilled executive responsibilities as Vice President during Term I.",
      subPlaceholder1: "Operational meetings & internal activities",
      subPlaceholder2: "Workshops & skill-sharing sessions",
      tasks: [
        "Coordinated team members, delegated operational duties, and supervised milestone delivery.",
        "Standardized chapter operations, meeting protocols, and maintained disciplined execution.",
        "Chaired practical skill-sharing workshops and facilitated team bonding experiences."
      ],
      result: "Maintained high team cohesion throughout Term I, honing executive leadership and strengthening organizational culture."
    },
    2: {
      id: 2,
      title: "BTEC FPT Graduation Ceremony 2026",
      role: "Organizing Committee Member",
      organization: "BTEC FPT",
      eventOrg: "BTEC FPT Graduation Ceremony 2026",
      timeLocation: "25/10/2026 in Danang City",
      badgeType: "Event Organizing Committee",
      badgeClass: "badge-event",
      mainImage: "act-graduation.jpg",
      description: "Directly contributed to orchestrating a high-profile commencement ceremony, ensuring a seamless experience for graduates, VIPs, and families.",
      subPlaceholder1: "Stage setup & technical rehearsals",
      subPlaceholder2: "VIP reception & graduate coordination",
      tasks: [
        "Collaborated on logistics, AV technical setups, and stage blocking control.",
        "Guided and escorted VIPs, faculty, parents, and new graduates throughout the ceremony flow.",
        "Promptly resolved live contingencies on the main stage and guest circulation corridors."
      ],
      result: "The ceremony concluded smoothly and received praise from leadership; cultivated agility and composure under high-pressure event execution."
    },
    3: {
      id: 3,
      title: "Community Charity Project \"Love Journey - Vol. 4\"",
      role: "Active Volunteer Contributor",
      organization: "BTEC FPT & Fusion Club",
      eventOrg: "Love Journey Vol. 4 Project",
      timeLocation: "Ngu Hanh Son, Danang City",
      badgeType: "Community Volunteering",
      badgeClass: "badge-volunteer",
      mainImage: "act-thien-nguyen.jpg",
      description: "Co-organized and delivered compassionate support and meaningful donations to children at Mai Am Tinh Thuong Shelter in Danang.",
      subPlaceholder1: "Donation sorting & packaging",
      subPlaceholder2: "Interactive games & activities with children",
      tasks: [
        "Mobilized, received, and systematically packaged essential donation packages.",
        "Facilitated engaging, safe group games and artistic performances with children.",
        "Connected with children personally, provided companionship, and supported site logistics."
      ],
      result: "Fostered empathy, community connection, and active civic responsibility among student volunteers."
    }
  }
};

function openActivityModal(activityId) {
  currentOpenActivityId = activityId;
  const langData = activityDetailsData[currentLang] || activityDetailsData['vi'];
  const data = langData[activityId];
  if (!data) return;

  const modal = document.getElementById('activity-modal');
  const backdrop = document.getElementById('activity-modal-backdrop');
  const container = document.getElementById('act-modal-content-container');

  if (!modal || !backdrop || !container) return;

  const isEn = (currentLang === 'en');

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
          <span><strong>${isEn ? 'Role:' : 'Vai trò:'}</strong> ${data.role}</span>
        </div>
        <div class="modal-time-highlight">
          <i class="fa-regular fa-calendar-check text-orange-color"></i>
          <span><strong>${isEn ? 'Time & Location:' : 'Thời gian & Địa điểm:'}</strong> ${data.timeLocation}</span>
        </div>
      </div>
    </div>

    <!-- Overview Box -->
    <div class="act-modal-overview-box">
      <div class="act-modal-overview-grid">
        <div class="act-modal-overview-item">
          <span class="act-overview-label"><i class="fa-solid fa-building text-primary-color"></i> ${isEn ? 'ORGANIZATION / EVENT' : 'ĐƠN VỊ / SỰ KIỆN'}</span>
          <span class="act-overview-value">${data.eventOrg}</span>
        </div>
        <div class="act-modal-overview-item">
          <span class="act-overview-label"><i class="fa-regular fa-calendar-check text-orange-color"></i> ${isEn ? 'TIME & LOCATION' : 'THỜI GIAN & ĐỊA ĐIỂM'}</span>
          <span class="act-overview-value">${data.timeLocation}</span>
        </div>
      </div>
      <div class="act-modal-overview-desc">
        <span class="act-overview-label"><i class="fa-solid fa-circle-info text-primary-color"></i> ${isEn ? 'DESCRIPTION & RESPONSIBILITIES' : 'MÔ TẢ ĐÓNG GÓP & TRÁCH NHIỆM'}</span>
        <p class="act-overview-desc-text">${data.description}</p>
      </div>
    </div>

    <!-- Gallery Box -->
    <div class="act-modal-gallery">
      <div class="act-gallery-main" onclick="openLightbox('${data.mainImage}', '${data.title}')" title="${isEn ? 'Click to enlarge evidence photo' : 'Nhấp vào để phóng to xem rõ ảnh chứng nhận'}">
        <img src="${data.mainImage}" alt="${data.title}" class="act-modal-main-img">
        <div class="act-gallery-overlay">
          <span class="gallery-zoom-pill">
            <i class="fa-solid fa-magnifying-glass-plus"></i>
            <span>${isEn ? 'Enlarge evidence photo' : 'Phóng to ảnh chứng nhận'}</span>
          </span>
        </div>
        <span class="gallery-badge-main">
          <i class="fa-solid fa-certificate"></i> ${isEn ? 'Primary Evidence Photo' : 'Ảnh chứng nhận chính'}
        </span>
      </div>

      <div class="act-gallery-sub-grid">
        <div class="act-sub-placeholder">
          <div class="placeholder-icon"><i class="fa-solid fa-camera"></i></div>
          <div class="placeholder-text">
            <strong>${data.subPlaceholder1}</strong>
            <span>${isEn ? 'Pending backstage updates' : 'Khu vực chờ cập nhật ảnh hậu trường'}</span>
          </div>
        </div>
        <div class="act-sub-placeholder">
          <div class="placeholder-icon"><i class="fa-solid fa-images"></i></div>
          <div class="placeholder-text">
            <strong>${data.subPlaceholder2}</strong>
            <span>${isEn ? 'Pending backstage updates' : 'Khu vực chờ cập nhật ảnh hậu trường'}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tasks & Results -->
    <div class="act-modal-details-grid">
      <div class="act-details-section">
        <div class="modal-section-title">
          <i class="fa-solid fa-list-check text-primary-color"></i>
          <span>${isEn ? 'Key Responsibilities' : 'Nhiệm vụ & Đóng góp chính'}</span>
        </div>
        <ul class="modal-list">
          ${tasksHtml}
        </ul>
      </div>

      <div class="act-details-section">
        <div class="modal-section-title">
          <i class="fa-solid fa-award text-orange-color"></i>
          <span>${isEn ? 'Outcomes & Takeaways' : 'Kết quả / Bài học rút ra'}</span>
        </div>
        <div class="act-result-card">
          <p class="result-text">${data.result}</p>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      <button type="button" class="btn btn-outline btn-sm" onclick="openLightbox('${data.mainImage}', '${data.title}')">
        <i class="fa-solid fa-expand"></i> ${isEn ? 'Enlarge Photo' : 'Phóng to ảnh chứng nhận'}
      </button>
      <button type="button" class="btn btn-ghost btn-sm" onclick="closeActivityModal()">
        <i class="fa-solid fa-xmark"></i> ${isEn ? 'Close' : 'Đóng'}
      </button>
    </div>
  `;

  backdrop.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeActivityModal() {
  currentOpenActivityId = null;
  const modal = document.getElementById('activity-modal');
  const backdrop = document.getElementById('activity-modal-backdrop');

  if (modal) modal.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');

  const projectModal = document.getElementById('project-modal');
  const certModal = document.getElementById('certificate-modal');
  const lightbox = document.getElementById('image-lightbox');
  const isOtherOpen = (projectModal && projectModal.classList.contains('active')) ||
                      (certModal && certModal.classList.contains('active')) ||
                      (lightbox && lightbox.classList.contains('active'));

  if (!isOtherOpen) {
    document.body.style.overflow = '';
  }
}

/* -------------------------------------------------------------------
   11. CERTIFICATE DETAILS MODAL POPUP & BILINGUAL DATA
------------------------------------------------------------------- */
const certificateDetailsData = {
  vi: {
    1: {
      id: 1,
      title: "Top 2 Chung kết — Cuộc thi Chân Trần Khởi Nghiệp (Mùa 3)",
      award: "Á quân (Top 2 Chung kết Toàn quốc)",
      organization: "BTEC FPT Đà Nẵng & DNES",
      timeLocation: "14/08/2026 tại Đà Nẵng",
      badgeType: "Top 2 • Á quân",
      badgeClass: "badge-trophy",
      badgeStyle: "background: linear-gradient(135deg, #10b981 0%, #059669 100%);",
      mainImage: "cert-chan-tran-khoi-nghiep.jpg",
      downloadName: "ChungNhan_ChanTranKhoiNghiep_DoMinhTri.jpg",
      externalUrl: "https://dnes.vn",
      externalTitle: "Vườn ươm Doanh nghiệp Đà Nẵng DNES",
      externalIcon: "fa-solid fa-arrow-up-right-from-square",
      externalText: "Đơn vị DNES",
      description: "Thành viên đội Smart Mini Storage — xuất sắc đạt thành tích Top 2 tại Vòng Chung kết Cuộc thi Chân Trần Khởi Nghiệp (Mùa 3), xây dựng dự án ứng dụng tư duy đổi mới sáng tạo, AI và phát triển bền vững để giải quyết vấn đề thực tế và tạo ra giá trị cho cộng đồng.",
      metaItems: [
        { label: "Người nhận chứng nhận", val: "Đỗ Minh Trí (Do Minh Tri)" },
        { label: "Đơn vị tổ chức & Chuyên môn", val: "BTEC FPT Đà Nẵng & DNES" },
        { label: "Ngày Chung kết", val: "14 / 08 / 2026" },
        { label: "Thành tích / Dự án", val: "Smart Mini Storage Team", isHighlight: true }
      ],
      tags: ["Đổi mới sáng tạo", "Ứng dụng AI", "Phát triển bền vững", "Top 2 Chung kết"],
      tasks: [
        "Nghiên cứu thị trường và khảo sát thực tế nhu cầu lưu trữ mini thông minh (Smart Mini Storage) của giới trẻ và khách du lịch.",
        "Ứng dụng tư duy công nghệ AI và mô hình phát triển bền vững để xây dựng giải pháp tối ưu hóa chi phí vận hành.",
        "Hoàn thiện mô hình kinh doanh và trực tiếp thuyết trình, phản biện tự tin trước hội đồng giám khảo và cố vấn doanh nghiệp."
      ],
      result: "Xuất sắc giành giải Top 2 Chung kết (Á quân), chứng minh năng lực đổi mới sáng tạo, tinh thần khởi nghiệp thực chiến và khả năng ứng dụng AI vào giải quyết vấn đề kinh doanh thực tế."
    },
    2: {
      id: 2,
      title: "Vòng Bán kết Toàn quốc — Cuộc thi FPT Biz Talent 2025",
      award: "Bán kết Toàn quốc (Top đội thi xuất sắc)",
      organization: "Tập đoàn FPT — Ban Công tác Học đường",
      timeLocation: "15/08/2025",
      badgeType: "Bán kết Toàn quốc",
      badgeClass: "badge-fpt",
      badgeStyle: "background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);",
      mainImage: "cert-fpt-biz-talent.jpg",
      downloadName: "ChungNhan_FPT_Biz_Talent_DoMinhTri.jpg",
      externalUrl: "https://fpt.edu.vn",
      externalTitle: "Tập đoàn FPT - Khối Giáo dục",
      externalIcon: "fa-solid fa-shield-halved",
      externalText: "FPT Education",
      description: "Bằng chứng nhận do Ban Công tác Học đường, Tập đoàn FPT trao tặng, ghi nhận nỗ lực vượt bậc và thành tích xuất sắc của đại diện đội The Culinary AI (FPT Polyschool Bình Định) tại vòng Bán kết toàn quốc cuộc thi khởi nghiệp kinh doanh FPT Biz Talent 2025.",
      metaItems: [
        { label: "Người nhận chứng nhận", val: "Đỗ Minh Trí (Do Minh Tri)" },
        { label: "Đơn vị tổ chức", val: "Ban Công tác Học đường, Tập đoàn FPT" },
        { label: "Thời gian trao giải", val: "15 / 08 / 2025" },
        { label: "Đại diện đội thi", val: "The Culinary AI", isHighlight: true }
      ],
      tags: ["FPT Biz Talent", "Ý tưởng kinh doanh", "Ứng dụng AI ngành ẩm thực", "Bán kết toàn quốc"],
      tasks: [
        "Nghiên cứu giải pháp kinh doanh ngành F&B kết hợp AI nhằm nâng cao trải nghiệm khách hàng và tối ưu hiệu suất ẩm thực.",
        "Xây dựng kế hoạch tài chính, phân tích điểm hòa vốn và dự báo doanh thu cho mô hình The Culinary AI.",
        "Đại diện đội thi thuyết trình và bảo vệ ý tưởng kinh doanh trước hội đồng chuyên môn cấp Tập đoàn FPT."
      ],
      result: "Đạt thành tích Vòng Bán kết Toàn quốc cuộc thi khởi nghiệp FPT Biz Talent 2025; củng cố tư duy quản trị tài chính, mô hình kinh doanh và tầm nhìn công nghệ phục vụ đời sống."
    },
    3: {
      id: 3,
      title: "Microsoft Office Specialist: Excel 2019 Associate",
      award: "Chứng chỉ Chuẩn Quốc tế Microsoft Certified",
      organization: "Microsoft & Certiport",
      timeLocation: "20/04/2025",
      badgeType: "Đã xác thực Certiport",
      badgeClass: "badge-ms",
      badgeStyle: "background: linear-gradient(135deg, #0056b3 0%, #0369a1 100%);",
      mainImage: "certificate-mos-excel.jpg",
      downloadName: "ChungChi_MOS_Excel_2019_DoMinhTri.jpg",
      externalUrl: "https://verify.certiport.com",
      externalTitle: "Cổng xác thực quốc tế Certiport (Mã: 2NPb-XM8H)",
      externalIcon: "fa-solid fa-square-check",
      externalText: "Xác thực Certiport",
      description: "Chứng chỉ quốc tế do Microsoft và tổ chức khảo thí Certiport cấp, xác nhận trình độ chuyên sâu trong việc xây dựng mô hình dữ liệu, phân tích số liệu tài chính & marketing, tự động hóa tính toán và trực quan hóa báo cáo.",
      metaItems: [
        { label: "Người nhận chứng chỉ", val: "Do Minh Tri (Đỗ Minh Trí)" },
        { label: "Mã định danh học viên", val: "052208008929" },
        { label: "Ngày cấp chứng nhận", val: "20 / 04 / 2025" },
        { label: "Mã xác thực Certiport", val: "2NPb-XM8H", isHighlight: true }
      ],
      tags: ["MOS Excel 2019", "Xử lý & Phân tích Dữ liệu", "Báo cáo KPI Marketing", "Chuẩn quốc tế"],
      tasks: [
        "Thành thạo cấu trúc dữ liệu, các hàm nâng cao (VLOOKUP, XLOOKUP, INDEX/MATCH, hàm logic & thống kê).",
        "Xây dựng Dashboard động, báo cáo phân tích số liệu kinh doanh chuyên nghiệp bằng PivotTable & Slicer trực quan.",
        "Tự động hóa tác vụ tính toán, xử lý làm sạch dữ liệu lớn và kiểm soát tính toàn vẹn của bảng tính."
      ],
      result: "Sở hữu chứng chỉ quốc tế trọn đời có giá trị toàn cầu từ Microsoft; chứng minh năng lực tư duy dữ liệu sắc bén, sẵn sàng đảm nhiệm các vị trí phân tích số liệu và Marketing chuyên sâu."
    },
    4: {
      id: 4,
      title: "Sinh viên có thành tích học tập xuất sắc — Học kỳ Spring 2025",
      award: "Khen thưởng Sinh viên Xuất sắc",
      organization: "FPT Polyschool — Cơ sở Bình Định",
      timeLocation: "Học kỳ Spring 2025 • Bình Định",
      badgeType: "Xuất sắc • Spring 2025",
      badgeClass: "badge-academic",
      badgeStyle: "background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);",
      mainImage: "cert-sv-xuat-sac-2025.jpg",
      downloadName: "GiayKhen_SinhVienXuatSac_Spring2025_DoMinhTri.jpg",
      externalUrl: "https://fpt.edu.vn",
      externalTitle: "FPT Polyschool — Khối Giáo dục FPT",
      externalIcon: "fa-solid fa-graduation-cap",
      externalText: "FPT Polyschool",
      description: "Được Giám đốc cơ sở Bình Định (FPT Polyschool) vinh danh nhờ thành tích học tập xuất sắc trong học kỳ Spring 2025, khẳng định tinh thần kỷ luật và tư duy học tập chủ động.",
      metaItems: [
        { label: "Người nhận khen thưởng", val: "Đỗ Minh Trí (Do Minh Tri)" },
        { label: "Đơn vị cấp quyết định", val: "FPT Polyschool — Cơ sở Bình Định" },
        { label: "Thời gian vinh danh", val: "Học kỳ Spring 2025" },
        { label: "Danh hiệu khen thưởng", val: "Sinh viên Xuất sắc (Academic Excellence)", isHighlight: true }
      ],
      tags: ["Thành tích học tập", "Sinh viên xuất sắc", "FPT Polyschool", "Spring 2025", "Kỷ luật & Tự học"],
      tasks: [
        "Hoàn thành xuất sắc toàn bộ khối lượng kiến thức và môn học chuyên ngành trong học kỳ Spring 2025 với kết quả học tập vượt trội.",
        "Chủ động nghiên cứu, vận dụng kiến thức lý thuyết vào các dự án môn học thực tế và tích cực dẫn dắt làm việc nhóm.",
        "Duy trì tinh thần tự giác, chấp hành tốt nội quy học đường và đạt tiêu chuẩn khen thưởng của Ban Giám hiệu nhà trường."
      ],
      result: "Được Giám đốc cơ sở Bình Định chính thức trao tặng giấy khen Sinh viên Xuất sắc, là minh chứng cho tinh thần kiên trì, thái độ học tập nghiêm túc và nền tảng chuyên môn vững vàng."
    }
  },

  en: {
    1: {
      id: 1,
      title: "Top 2 Barefoot Startup Competition (Season 3)",
      award: "Runner-up (National Finals Top 2)",
      organization: "BTEC FPT Danang & DNES",
      timeLocation: "14/08/2026 in Danang City",
      badgeType: "Top 2 • Runner-up",
      badgeClass: "badge-trophy",
      badgeStyle: "background: linear-gradient(135deg, #10b981 0%, #059669 100%);",
      mainImage: "cert-chan-tran-khoi-nghiep.jpg",
      downloadName: "Certificate_Barefoot_Startup_DoMinhTri.jpg",
      externalUrl: "https://dnes.vn",
      externalTitle: "Danang Entrepreneurship Support Incubator DNES",
      externalIcon: "fa-solid fa-arrow-up-right-from-square",
      externalText: "DNES Incubator",
      description: "Core member of Smart Mini Storage — achieving Top 2 honors at the Barefoot Startup Competition (Season 3), building sustainable solutions integrating innovation, AI, and social value.",
      metaItems: [
        { label: "Awardee", val: "Do Minh Tri (Đỗ Minh Trí)" },
        { label: "Organizers & Mentors", val: "BTEC FPT Danang & DNES" },
        { label: "Finals Date", val: "14 / 08 / 2026" },
        { label: "Team / Project", val: "Smart Mini Storage Team", isHighlight: true }
      ],
      tags: ["Innovation", "AI Solutions", "Sustainability", "Top 2 Finals"],
      tasks: [
        "Executed field surveys and market validation for smart micro-storage needs among urban youth and travelers.",
        "Incorporated AI technology and circular economy principles to streamline operational expenses.",
        "Finalized business model canvas and pitched before the judging panel and venture mentors."
      ],
      result: "Awarded National Runner-up (Top 2), validating entrepreneurial grit, innovation capability, and AI-driven commercial problem-solving."
    },
    2: {
      id: 2,
      title: "National Semi-final — FPT Biz Talent 2025",
      award: "National Semi-finalist (Top Venture Teams)",
      organization: "FPT Corporation — Student Affairs",
      timeLocation: "15/08/2025",
      badgeType: "National Semi-final",
      badgeClass: "badge-fpt",
      badgeStyle: "background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);",
      mainImage: "cert-fpt-biz-talent.jpg",
      downloadName: "Certificate_FPT_Biz_Talent_DoMinhTri.jpg",
      externalUrl: "https://fpt.edu.vn",
      externalTitle: "FPT Corporation - Education Division",
      externalIcon: "fa-solid fa-shield-halved",
      externalText: "FPT Education",
      description: "Awarded by FPT Corporation Student Affairs Division, honoring exceptional business acumen and innovative performance of The Culinary AI team at the national semi-finals.",
      metaItems: [
        { label: "Awardee", val: "Do Minh Tri (Đỗ Minh Trí)" },
        { label: "Organizing Body", val: "FPT Corporation Student Affairs" },
        { label: "Award Date", val: "15 / 08 / 2025" },
        { label: "Representing Team", val: "The Culinary AI", isHighlight: true }
      ],
      tags: ["FPT Biz Talent", "Venture Model", "AI in Gastronomy", "National Semi-finals"],
      tasks: [
        "Formulated AI-integrated F&B business model enhancing customer personalization and culinary productivity.",
        "Constructed financial statements, break-even projections, and unit economics.",
        "Represented team in pitching and defensing business viability before corporate leadership."
      ],
      result: "Ranked among National Semi-finalists of FPT Biz Talent 2025, sharpening financial management, business structuring, and technology vision."
    },
    3: {
      id: 3,
      title: "Microsoft Office Specialist: Excel 2019 Associate",
      award: "Microsoft Certified International Credential",
      organization: "Microsoft & Certiport",
      timeLocation: "20/04/2025",
      badgeType: "Certiport Verified",
      badgeClass: "badge-ms",
      badgeStyle: "background: linear-gradient(135deg, #0056b3 0%, #0369a1 100%);",
      mainImage: "certificate-mos-excel.jpg",
      downloadName: "Certificate_MOS_Excel_2019_DoMinhTri.jpg",
      externalUrl: "https://verify.certiport.com",
      externalTitle: "Certiport Global Verification Portal (Code: 2NPb-XM8H)",
      externalIcon: "fa-solid fa-square-check",
      externalText: "Verify on Certiport",
      description: "International certification issued by Microsoft and Certiport, validating expertise in data modeling, marketing/financial analysis, formula automation, and dynamic reporting.",
      metaItems: [
        { label: "Candidate Name", val: "Do Minh Tri (Đỗ Minh Trí)" },
        { label: "Candidate ID", val: "052208008929" },
        { label: "Issue Date", val: "20 / 04 / 2025" },
        { label: "Certiport Verification Code", val: "2NPb-XM8H", isHighlight: true }
      ],
      tags: ["MOS Excel 2019", "Data Analytics", "Marketing Reporting", "Global Standard"],
      tasks: [
        "Mastered advanced data structures and formulas (VLOOKUP, XLOOKUP, INDEX/MATCH, logic & stats).",
        "Constructed dynamic dashboards and KPI reports utilizing PivotTables and interactive Slicers.",
        "Automated data hygiene workflows and maintained spreadsheet data integrity."
      ],
      result: "Earned lifetime globally recognized Microsoft credential; proven data processing and analytical competencies ready for business analysis roles."
    },
    4: {
      id: 4,
      title: "Student of Academic Excellence — Spring 2025 Semester",
      award: "Academic Commendation of Excellence",
      organization: "FPT Polyschool — Binh Dinh Campus",
      timeLocation: "Spring Semester 2025 • Binh Dinh",
      badgeType: "Excellence • Spring 2025",
      badgeClass: "badge-academic",
      badgeStyle: "background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);",
      mainImage: "cert-sv-xuat-sac-2025.jpg",
      downloadName: "Commendation_Excellence_Spring2025_DoMinhTri.jpg",
      externalUrl: "https://fpt.edu.vn",
      externalTitle: "FPT Polyschool — FPT Education",
      externalIcon: "fa-solid fa-graduation-cap",
      externalText: "FPT Polyschool",
      description: "Commended by the Campus Director of FPT Polyschool for outstanding academic performance during Spring 2025, demonstrating discipline and proactive self-learning.",
      metaItems: [
        { label: "Awardee", val: "Do Minh Tri (Đỗ Minh Trí)" },
        { label: "Issuing Authority", val: "FPT Polyschool — Binh Dinh Campus" },
        { label: "Commendation Period", val: "Spring 2025 Semester" },
        { label: "Academic Honor", val: "Student of Academic Excellence", isHighlight: true }
      ],
      tags: ["Academic Honors", "Excellence", "FPT Polyschool", "Spring 2025", "Discipline"],
      tasks: [
        "Achieved outstanding marks across all core professional curriculum modules in Spring 2025.",
        "Actively researched and bridged classroom theory into hands-on coursework projects.",
        "Maintained exemplary self-discipline and met all honor roll standards of the board."
      ],
      result: "Officially awarded Campus Commendation of Academic Excellence, demonstrating relentless dedication, rigorous work ethic, and solid academic foundation."
    }
  }
};

function openCertificateModal(certId) {
  currentOpenCertId = certId;
  const langData = certificateDetailsData[currentLang] || certificateDetailsData['vi'];
  const data = langData[certId];
  if (!data) return;

  const modal = document.getElementById('certificate-modal');
  const backdrop = document.getElementById('certificate-modal-backdrop');
  const container = document.getElementById('cert-modal-content-container');

  if (!modal || !backdrop || !container) return;

  const isEn = (currentLang === 'en');

  const metaGridHtml = data.metaItems.map(item => `
    <div class="act-modal-overview-item">
      <span class="act-overview-label"><i class="fa-solid fa-check text-primary-color"></i> ${item.label.toUpperCase()}</span>
      <span class="act-overview-value ${item.isHighlight ? 'code-highlight' : ''}">${item.val}</span>
    </div>
  `).join('');

  const tagsHtml = data.tags.map(tag => `
    <span class="cert-tag"><i class="fa-solid fa-check"></i> ${tag}</span>
  `).join('');

  const tasksHtml = data.tasks.map(item => `
    <li class="modal-list-item">
      <i class="fa-solid fa-circle-check text-primary-color"></i>
      <span>${item}</span>
    </li>
  `).join('');

  container.innerHTML = `
    <div class="modal-activity-header">
      <div class="modal-meta-row">
        <span class="act-floating-badge ${data.badgeClass}" style="position: static; display: inline-flex; ${data.badgeStyle}">
          <i class="fa-solid fa-award"></i> ${data.badgeType}
        </span>
        <span class="act-org-tag"><i class="fa-solid fa-building"></i> ${data.organization}</span>
      </div>
      <h2 class="modal-title" id="cert-modal-title">${data.title}</h2>
      <div class="modal-subtitle-row">
        <div class="modal-role-highlight">
          <i class="fa-solid fa-trophy text-primary-color"></i>
          <span><strong>${isEn ? 'Achievement / Honor:' : 'Thành tích / Danh hiệu:'}</strong> ${data.award}</span>
        </div>
        <div class="modal-time-highlight">
          <i class="fa-regular fa-calendar-check text-orange-color"></i>
          <span><strong>${isEn ? 'Time & Organization:' : 'Thời gian & Đơn vị:'}</strong> ${data.timeLocation}</span>
        </div>
      </div>
    </div>

    <!-- Overview Box -->
    <div class="act-modal-overview-box">
      <div class="act-modal-overview-grid">
        ${metaGridHtml}
      </div>
      <div class="act-modal-overview-desc">
        <span class="act-overview-label"><i class="fa-solid fa-circle-info text-primary-color"></i> ${isEn ? 'DETAILED DESCRIPTION' : 'MÔ TẢ CHI TIẾT'}</span>
        <p class="act-overview-desc-text">${data.description}</p>
      </div>
      <div class="cert-skills-tags" style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border-color); margin-bottom: 0;">
        ${tagsHtml}
      </div>
    </div>

    <!-- Main Certificate Preview Frame -->
    <div class="cert-modal-view-frame" onclick="openLightbox('${data.mainImage}', '${data.title}')" title="${isEn ? 'Click to enlarge certificate' : 'Nhấp vào để phóng to xem rõ chứng nhận'}">
      <img src="${data.mainImage}" alt="${data.title}" class="cert-modal-img">
      <div class="cert-modal-img-overlay">
        <span class="gallery-zoom-pill">
          <i class="fa-solid fa-magnifying-glass-plus"></i>
          <span>${isEn ? 'Enlarge certificate' : 'Phóng to ảnh chứng nhận'}</span>
        </span>
      </div>
      <span class="gallery-badge-main">
        <i class="fa-solid fa-certificate"></i> ${isEn ? 'Primary Certificate Evidence' : 'Ảnh chứng nhận gốc'}
      </span>
    </div>

    <!-- Content breakdown: Tasks & Result -->
    <div class="act-modal-details-grid" style="margin-top: 20px;">
      <div class="act-details-section">
        <div class="modal-section-title">
          <i class="fa-solid fa-list-check text-primary-color"></i>
          <span>${isEn ? 'Key Content & Focus Areas' : 'Nhiệm vụ & Nội dung trọng tâm'}</span>
        </div>
        <ul class="modal-list">
          ${tasksHtml}
        </ul>
      </div>

      <div class="act-details-section">
        <div class="modal-section-title">
          <i class="fa-solid fa-award text-orange-color"></i>
          <span>${isEn ? 'Value & Recognition Achieved' : 'Giá trị & Ý nghĩa đạt được'}</span>
        </div>
        <div class="act-result-card">
          <p class="result-text">${data.result}</p>
        </div>
      </div>
    </div>

    <!-- Modal Actions -->
    <div class="modal-actions" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end;">
      <button type="button" class="btn btn-primary btn-sm" onclick="openLightbox('${data.mainImage}', '${data.title}')">
        <i class="fa-solid fa-expand"></i> ${isEn ? 'Enlarge Image' : 'Phóng to ảnh'}
      </button>
      <a href="${data.mainImage}" download="${data.downloadName}" class="btn btn-outline btn-sm">
        <i class="fa-solid fa-download"></i> ${isEn ? 'Download Image' : 'Tải ảnh về máy'}
      </a>
      <a href="${data.externalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" title="${data.externalTitle}">
        <i class="${data.externalIcon}"></i> ${data.externalText}
      </a>
      <button type="button" class="btn btn-ghost btn-sm" onclick="closeCertificateModal()">
        <i class="fa-solid fa-xmark"></i> ${isEn ? 'Close' : 'Đóng'}
      </button>
    </div>
  `;

  backdrop.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
  currentOpenCertId = null;
  const modal = document.getElementById('certificate-modal');
  const backdrop = document.getElementById('certificate-modal-backdrop');

  if (modal) modal.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');

  const projectModal = document.getElementById('project-modal');
  const activityModal = document.getElementById('activity-modal');
  const lightbox = document.getElementById('image-lightbox');
  const isOtherOpen = (projectModal && projectModal.classList.contains('active')) ||
                      (activityModal && activityModal.classList.contains('active')) ||
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

  const isEn = (currentLang === 'en');

  img.src = src;
  img.alt = title || (isEn ? 'Enlarged evidence photo' : 'Ảnh minh chứng phóng to');
  if (titleEl) titleEl.textContent = title || (isEn ? 'Evidence Photo' : 'Ảnh minh chứng');
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
  const certModal = document.getElementById('certificate-modal');
  const isOtherOpen = (projectModal && projectModal.classList.contains('active')) ||
                      (activityModal && activityModal.classList.contains('active')) ||
                      (certModal && certModal.classList.contains('active'));

  if (!isOtherOpen) {
    document.body.style.overflow = '';
  }
}

// Close modals on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeActivityModal();
    closeCertificateModal();
    closeLightbox();
  }
});

/* -------------------------------------------------------------------
   12. COPY TO CLIPBOARD & TOAST SYSTEM
------------------------------------------------------------------- */
function copyToClipboard(text, successMessage) {
  const isEn = (currentLang === 'en');
  const msg = successMessage || (isEn ? 'Copied to clipboard!' : 'Đã sao chép vào bộ nhớ tạm!');

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast(msg);
      })
      .catch(() => {
        fallbackCopyText(text, msg);
      });
  } else {
    fallbackCopyText(text, msg);
  }
}

function fallbackCopyText(text, successMessage) {
  const isEn = (currentLang === 'en');
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  tempInput.style.position = 'fixed';
  tempInput.style.left = '-9999px';
  document.body.appendChild(tempInput);
  tempInput.focus();
  tempInput.select();

  try {
    document.execCommand('copy');
    showToast(successMessage || (isEn ? 'Copied to clipboard!' : 'Đã sao chép vào bộ nhớ tạm!'));
  } catch (err) {
    showToast(isEn ? 'Could not copy automatically. Please try again!' : 'Không thể sao chép tự động. Vui lòng thử lại!');
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
   13. CONTACT FORM INTERACTION
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
}

function resetContactForm() {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success-message');
  if (form) {
    form.reset();
    form.style.display = 'block';
  }
  if (successBox) {
    successBox.style.display = 'none';
  }
}
