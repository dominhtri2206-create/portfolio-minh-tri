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
let portfolioData = null;

// Embedded fallback data (in case data.json is blocked by local file:// CORS)
const DEFAULT_PORTFOLIO_DATA = {
  "profile": {
    "name": {
      "vi": "Đỗ Minh Trí",
      "en": "Do Minh Tri"
    },
    "alias": "(Eric Do)",
    "headline": {
      "vi": "Business & Digital Marketing | Ứng dụng AI Agent",
      "en": "Business & Digital Marketing | AI Agent Solutions"
    },
    "statusBadge": {
      "vi": "Sẵn sàng hợp tác • Business & Digital Marketing × AI Agent",
      "en": "Open to Opportunities • Business & Digital Marketing × AI Agent"
    },
    "avatar": "avatar.jpg",
    "cvUrl": "CV_DoMinhTri.pdf",
    "motto": {
      "vi": "I never lose. I either win or learn!",
      "en": "I never lose. I either win or learn!"
    },
    "roles": [
      {
        "icon": "fa-solid fa-chart-line",
        "text": {
          "vi": "Business & Digital Marketing",
          "en": "Business & Digital Marketing"
        }
      },
      {
        "icon": "fa-solid fa-robot",
        "text": {
          "vi": "Ứng dụng AI Agent",
          "en": "AI Agent Solutions"
        }
      },
      {
        "icon": "fa-solid fa-microphone-lines",
        "text": {
          "vi": "MC & Song ngữ Anh - Trung",
          "en": "Public Speaker & EN - ZH"
        }
      }
    ],
    "mission": {
      "tag": {
        "vi": "Tuyên ngôn cá nhân",
        "en": "Personal Mission"
      },
      "text": {
        "vi": "“You may know me in many roles, but my true mission is to forge myself, pave the way, and awaken the strength in others.”",
        "en": "“You may know me in many roles, but my true mission is to forge myself, pave the way, and awaken the strength in others.”"
      }
    },
    "bio": {
      "vi": "Chào bạn! Mình là Minh Trí (Eric) — một người trẻ mang tinh thần ham học hỏi, yêu thích lĩnh vực Business và đam mê khám phá, ứng dụng AI Agent vào thực tế. Bên cạnh đó, mình còn thích cầm mic nói trước đám đông, nghiên cứu những điều mới mẻ và chinh phục ngoại ngữ. Mình tin rằng việc không ngừng cập nhật tư duy và công nghệ mới chính là chìa khóa để rèn giũa bản thân và tạo ra giá trị tích cực cho cộng đồng.",
      "en": "Hello! I am Minh Tri (Eric) — a passionate learner keen on Business and enthusiastic about exploring and applying practical AI Agent solutions. Additionally, I enjoy public speaking & MCing, continuous research, and mastering foreign languages. I believe that constantly updating our mindset and embracing emerging technologies is key to self-refinement and creating positive value for our community."
    },
    "contact": {
      "email": "dominhtri2206@gmail.com",
      "phone": "0934 454 099",
      "zalo": "0934454099",
      "linkedin": "",
      "address": {
        "vi": "Đà Nẵng, Việt Nam",
        "en": "Danang, Vietnam"
      },
      "reference": {
        "name": "Cô Nguyễn Thị Thanh Tâm",
        "role": {
          "vi": "Giảng viên bộ môn Digital Marketing",
          "en": "Digital Marketing Lecturer"
        },
        "phone": "Thông tin người tham chiếu sẽ được cung cấp khi có yêu cầu",
        "note": {
          "vi": "Thông tin liên hệ chi tiết của người tham chiếu sẽ được cung cấp khi có yêu cầu từ nhà tuyển dụng.",
          "en": "Detailed referee contact information will be provided upon formal request."
        }
      }
    }
  },
  "analytics": {
    "gaMeasurementId": "",
    "umamiWebsiteId": "",
    "umamiScriptUrl": "https://cloud.umami.is/script.js"
  },
  "experiences": [
    {
      "id": 1,
      "period": { "vi": "02/2026 – 09/2026", "en": "02/2026 – 09/2026" },
      "role": { "vi": "Phó Chủ tịch (Vice President) — Ban Lãnh đạo Nhiệm kỳ I", "en": "Vice President — Executive Board (Term I)" },
      "organization": { "vi": "BBE Pegasus Chapter", "en": "BBE Pegasus Chapter" },
      "badge": { "vi": "Lãnh đạo & Điều hành", "en": "Executive Leadership" },
      "isCurrent": true,
      "summary": {
        "vi": "Điều hành hoạt động đối nội, chuẩn hóa quy trình làm việc của Ban Lãnh đạo và phát triển năng lực thành viên.",
        "en": "Directed internal operations, standardized executive workflows, and led member capability development."
      },
      "highlights": [
        { "vi": "Điều phối đội ngũ, phân công nhiệm vụ và giám sát 100% tiến độ hoạt động nhiệm kỳ I", "en": "Coordinated cross-functional teams, delegated duties, and tracked 100% milestone delivery" },
        { "vi": "Chủ trì tổ chức chuỗi workshop chia sẻ kỹ năng thực chiến và gắn kết văn hóa CLB", "en": "Chaired practical skill-sharing workshops and strengthened organizational cohesion" }
      ],
      "tags": ["Executive Leadership", "Team Operations", "Public Speaking", "Workshop Host"]
    },
    {
      "id": 2,
      "period": { "vi": "09/2023 – 09/2025", "en": "09/2023 – 09/2025" },
      "role": { "vi": "Trưởng nhóm Dự án Marketing Thực chiến (Team Leader)", "en": "Marketing Project Team Leader" },
      "organization": { "vi": "FPT Polyschool — Chuyên ngành Digital Marketing", "en": "FPT Polyschool — Digital Marketing Department" },
      "badge": { "vi": "Dự án Thực chiến", "en": "Hands-on Projects" },
      "isCurrent": false,
      "summary": {
        "vi": "Trực tiếp dẫn dắt nhóm 4–5 thành viên lập kế hoạch truyền thông đa kênh (IMC), tối ưu SEO và sản xuất video ngắn TikTok/Reels.",
        "en": "Led 4–5 member teams across omnichannel IMC campaigns, SEO research, and short-form TikTok/Reels video production."
      },
      "highlights": [
        { "vi": "Tăng +180% tương tác tự nhiên trên Fanpage và thiết kế 20+ ấn phẩm chuẩn Brand Kit", "en": "Boosted organic Fanpage engagement by +180% and designed 20+ brand-aligned visual assets" },
        { "vi": "Sản xuất chuỗi 15 video ngắn đạt 120.000+ lượt xem tích lũy (video top đạt 45.000+ views)", "en": "Produced 15 vertical short videos generating 120,000+ cumulative views (top video 45,000+ views)" },
        { "vi": "Hoàn thành 100% KPI đúng hạn, góp phần đạt danh hiệu Tốt nghiệp Xuất Sắc", "en": "Delivered 100% of campaign KPIs on time, graduating with High Distinction honors" }
      ],
      "tags": ["IMC Strategy", "TikTok & Reels", "SEO & Content", "Team Leader (5 người)"]
    },
    {
      "id": 3,
      "period": { "vi": "10/2026", "en": "10/2026" },
      "role": { "vi": "Thành viên Ban Tổ chức Sự kiện (Organizing Committee)", "en": "Event Organizing Committee Member" },
      "organization": { "vi": "Cao đẳng Anh Quốc BTEC FPT Đà Nẵng", "en": "BTEC FPT British College Danang" },
      "badge": { "vi": "Vận hành Sự kiện", "en": "Event Operations" },
      "isCurrent": false,
      "summary": {
        "vi": "Phối hợp vận hành Lễ Tốt nghiệp BTEC FPT 2026 quy mô toàn cơ sở, đảm bảo trải nghiệm trang trọng cho hàng trăm tân cử nhân và khách mời.",
        "en": "Co-orchestrated the campus-wide BTEC FPT 2026 Graduation Ceremony for hundreds of graduates, VIPs, and families."
      },
      "highlights": [
        { "vi": "Kiểm soát hậu cần, âm thanh ánh sáng sân khấu và luồng di chuyển trực tiếp tại sự kiện", "en": "Managed stage AV logistics, blocking, and live guest flow operations" },
        { "vi": "Ứng biến và xử lý tức thời các tình huống phát sinh tại khu vực lễ đài chính", "en": "Resolved live on-stage contingencies under high-pressure timelines" }
      ],
      "tags": ["Event Operations", "Stage Coordination", "VIP Reception", "Problem Solving"]
    }
  ],
  "highlights": [
    {
      "id": 1,
      "icon": "fa-solid fa-trophy",
      "iconColor": "icon-gold",
      "title": { "vi": "Top 2 Chung Kết", "en": "Top 2 National Finalist" },
      "subtitle": { "vi": "Á Quân Chân Trần Khởi Nghiệp Mùa 3", "en": "Runner-Up Barefoot Startup S3" },
      "isDark": true
    },
    {
      "id": 2,
      "icon": "fa-solid fa-medal",
      "iconColor": "icon-orange",
      "title": { "vi": "Top 35 Toàn Quốc", "en": "Top 35 Nationwide" },
      "subtitle": { "vi": "Bán kết FPT Biz Talent 2025", "en": "FPT Biz Talent 2025 Semi-finalist" },
      "isDark": false
    },
    {
      "id": 3,
      "icon": "fa-solid fa-graduation-cap",
      "iconColor": "icon-cyan",
      "title": { "vi": "Tốt Nghiệp Xuất Sắc", "en": "High Distinction" },
      "subtitle": { "vi": "Digital Marketing • BTEC & FPT", "en": "Digital Marketing • BTEC & FPT" },
      "isDark": false
    },
    {
      "id": 4,
      "icon": "fa-solid fa-chart-line",
      "iconColor": "icon-blue",
      "title": { "vi": "+180% Tương Tác", "en": "+180% Engagement" },
      "subtitle": { "vi": "100% KPI Chiến dịch & MOS Quốc tế", "en": "100% Campaign KPI & MOS Certified" },
      "isDark": false
    }
  ],
  "projects": [
    {
      "id": 1,
      "badge": {
        "vi": "Video Marketing",
        "en": "Video Marketing"
      },
      "role": {
        "vi": "Trưởng nhóm",
        "en": "Team Leader"
      },
      "roleDetail": {
        "vi": "Trưởng nhóm (Team Leader) & Biên tập Video",
        "en": "Team Leader & Video Producer"
      },
      "platform": {
        "icon": "fa-brands fa-instagram",
        "text": "Reels & TikTok"
      },
      "title": {
        "vi": "1. Dự Án Content Marketing & Video Ngắn (Reels/TikTok)",
        "en": "1. Content Marketing & Short-form Video Project (Reels/TikTok)"
      },
      "excerpt": {
        "vi": "Xây dựng chuỗi video ngắn định dạng dọc giới thiệu dòng sản phẩm đồ uống/thời trang cho giới trẻ. Trực tiếp lên kịch bản, quay dựng và tối ưu âm thanh bắt trend.",
        "en": "Producing a vertical short-video campaign for youth lifestyle brands. Spearheaded scriptwriting, video shooting, audio sync, and trend optimization."
      },
      "highlights": [
        {
          "vi": "Nghiên cứu thị hiếu Gen Z",
          "en": "Gen Z trend & insight analysis"
        },
        {
          "vi": "Kịch bản 3 giây đầu thu hút (Hook)",
          "en": "High-converting 3s hook scripting"
        },
        {
          "vi": "Tối ưu tỷ lệ giữ chân người xem (Watch Time)",
          "en": "Audience retention rate optimization"
        }
      ],
      "tags": [
        "CapCut Pro",
        "Premiere",
        "TikTok Trends",
        "Canva"
      ],
      "thumbClass": "thumb-gradient-1",
      "watermarkIcon": "fa-brands fa-tiktok",
      "category": {
        "vi": "Video Marketing & Social Viral",
        "en": "Video Marketing & Social Viral"
      },
      "duration": {
        "vi": "2 tháng (Học kỳ đồ án thực hành)",
        "en": "2 months (Coursework Project)"
      },
      "teamSize": {
        "vi": "4 thành viên",
        "en": "4 members"
      },
      "tools": [
        "CapCut Pro",
        "Adobe Premiere Pro",
        "TikTok Creator Studio",
        "Canva Pro",
        "Smartphone 4K & Gimbal"
      ],
      "bannerGradient": "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #ff6b35 100%)",
      "badgeProject": {
        "vi": "Đồ Án Thực Tế | FPT Digital Marketing",
        "en": "Academic Project | FPT Digital Marketing"
      },
      "overview": {
        "vi": "Dự án tập trung vào việc nghiên cứu hành vi tiêu thụ video ngắn của đối tượng khách hàng Gen Z và người trẻ tuổi, từ đó lên kế hoạch sản xuất chuỗi 15 video ngắn định dạng dọc (9:16) cho thương hiệu đồ uống / thời trang trẻ trung.",
        "en": "Researched short-video consumption patterns of Gen Z audiences and produced a 15-video vertical campaign (9:16) for modern lifestyle brands."
      },
      "objectives": [
        {
          "vi": "Xây dựng định vị hình ảnh thương hiệu năng động, gần gũi và hài hước trên nền tảng TikTok và Instagram Reels.",
          "en": "Build a vibrant, relatable, and engaging brand persona on TikTok and Instagram Reels."
        },
        {
          "vi": "Thử nghiệm các cấu trúc kịch bản Hook 3s (Tò mò, Đặt câu hỏi, Trước/Sau, Phản ứng bất ngờ) để tối ưu tỷ lệ giữ chân người xem.",
          "en": "A/B test 3-second hook variations (Curiosity, Questions, Before/After, Surprises) to maximize viewer retention."
        },
        {
          "vi": "Đạt mục tiêu tối thiểu 50.000 lượt xem tự nhiên (organic views) và tỷ lệ tương tác (engagement rate) trên 8%.",
          "en": "Achieve over 50,000+ organic views and an engagement rate exceeding 8%."
        }
      ],
      "contributions": [
        {
          "vi": "Trực tiếp lên ý tưởng, viết kịch bản phân cảnh chi tiết (Storyboard) cho toàn bộ 15 video.",
          "en": "Conceptualized and wrote detailed storyboards and scripts for all 15 videos."
        },
        {
          "vi": "Phân công vai trò diễn xuất, chuẩn bị đạo cụ, góc quay và setup ánh sáng với gimbal.",
          "en": "Managed talent staging, props, cinematography angles, and lighting with gimbal setups."
        },
        {
          "vi": "Hậu kỳ cắt dựng, chỉnh màu sắc tươi sáng, chèn sound effects (SFX) và chọn nhạc nền thịnh hành (Trending BGM).",
          "en": "Edited post-production, color grading, sound design (SFX), and selected trending soundtracks."
        },
        {
          "vi": "Theo dõi dữ liệu phân tích từ TikTok Analytics để tinh chỉnh thời gian đăng bài và hashtag.",
          "en": "Monitored TikTok Analytics to optimize posting schedule and hashtag strategies."
        }
      ],
      "results": [
        {
          "vi": "Chiến dịch đạt hơn 120.000+ lượt xem tích lũy trên cả hai nền tảng.",
          "en": "Campaign generated over 120,000+ cumulative views across both platforms."
        },
        {
          "vi": "Video viral nhất đạt 45.000 lượt xem với hơn 3.200 lượt thả tim và 180 lượt chia sẻ.",
          "en": "Top viral video achieved 45,000+ views, 3,200+ likes, and 180+ shares."
        },
        {
          "vi": "Được giảng viên bộ môn đánh giá Xuất sắc (Điểm 9.5/10) về chất lượng hình ảnh và thông điệp truyền tải.",
          "en": "Awarded an Excellent grade (9.5/10) by faculty for visual execution and narrative storytelling."
        }
      ]
    },
    {
      "id": 2,
      "badge": {
        "vi": "SEO & Research",
        "en": "SEO & Research"
      },
      "role": {
        "vi": "Trưởng nhóm",
        "en": "Team Leader"
      },
      "roleDetail": {
        "vi": "Trưởng nhóm (Team Leader) & Phân tích Dữ liệu",
        "en": "Team Leader & Data Analyst"
      },
      "platform": {
        "icon": "fa-solid fa-globe",
        "text": "SEO & Analytics"
      },
      "title": {
        "vi": "2. Dự Án SEO & Nghiên Cứu Thị Trường Ngành Hàng",
        "en": "2. SEO & Industry Market Research Project"
      },
      "excerpt": {
        "vi": "Phân tích đối thủ cạnh tranh, nghiên cứu bộ từ khóa theo hành trình mua sắm của khách hàng (Buyer's Journey) và lập kế hoạch tối ưu cấu trúc nội dung Onpage.",
        "en": "Competitor analysis, keyword mapping across the Buyer's Journey, and Onpage content architecture planning."
      },
      "highlights": [
        {
          "vi": "Phân tích Insight & Đối thủ",
          "en": "Competitor & customer insight analysis"
        },
        {
          "vi": "Lập bộ từ khóa 100+ keywords tiềm năng",
          "en": "Building 100+ high-potential keywords"
        },
        {
          "vi": "Tối ưu bài viết chuẩn SEO & UI/UX",
          "en": "SEO content & UI/UX optimization"
        }
      ],
      "tags": [
        "Google Search Console",
        "GA4",
        "Keyword Planner",
        "Excel MOS"
      ],
      "thumbClass": "thumb-gradient-2",
      "watermarkIcon": "fa-solid fa-chart-line",
      "category": {
        "vi": "Search Engine Optimization & Market Research",
        "en": "Search Engine Optimization & Market Research"
      },
      "duration": {
        "vi": "2.5 tháng",
        "en": "2.5 months"
      },
      "teamSize": {
        "vi": "5 thành viên",
        "en": "5 members"
      },
      "tools": [
        "Google Search Console",
        "Google Analytics (GA4)",
        "Google Keyword Planner",
        "Ahrefs",
        "Microsoft Excel MOS"
      ],
      "bannerGradient": "linear-gradient(135deg, #065f46 0%, #059669 50%, #0284c7 100%)",
      "badgeProject": {
        "vi": "Đồ Án Thực Tế | FPT Digital Marketing",
        "en": "Academic Project | FPT Digital Marketing"
      },
      "overview": {
        "vi": "Đồ án nghiên cứu thị trường toàn diện và triển khai chiến lược SEO Onpage & Content Hub cho một website thương mại điện tử chuyên cung cấp sản phẩm phong cách sống.",
        "en": "Conducted comprehensive market research and executed Onpage SEO & Content Hub strategy for an e-commerce lifestyle brand."
      },
      "objectives": [
        {
          "vi": "Thấu hiểu chân dung khách hàng mục tiêu (Buyer Persona) và hành trình tìm kiếm thông tin của người tiêu dùng.",
          "en": "Identify Buyer Personas and search intent journeys across key stages."
        },
        {
          "vi": "Phân tích điểm mạnh, điểm yếu của 3 đối thủ cạnh tranh trực tiếp trên bảng xếp hạng Google tìm kiếm.",
          "en": "Analyze strengths and weaknesses of top 3 direct organic search competitors on Google."
        },
        {
          "vi": "Xây dựng cấu trúc cây thư mục website (Site Architecture) và bộ từ khóa phủ rộng theo mô hình Topic Cluster.",
          "en": "Develop website information architecture and extensive keyword mapping via Topic Clusters."
        }
      ],
      "contributions": [
        {
          "vi": "Điều phối nhóm lọc bộ từ khóa hơn 150 keywords có lượng tìm kiếm cao và độ cạnh tranh (Keyword Difficulty) phù hợp.",
          "en": "Led team in filtering 150+ high-volume keywords with balanced Keyword Difficulty."
        },
        {
          "vi": "Áp dụng chứng chỉ MOS Excel 2019 để phân loại dữ liệu từ khóa, tính toán Search Volume và tiềm năng chuyển đổi.",
          "en": "Leveraged MOS Excel 2019 data processing to segment search volume and conversion potential."
        },
        {
          "vi": "Viết bài mẫu chuẩn SEO (1.500+ từ) tối ưu Heading, Meta Description, Alt ảnh và Internal Link.",
          "en": "Authored SEO-standard pillar articles (1,500+ words) optimizing Headings, Meta, Alt, and Internal Links."
        },
        {
          "vi": "Đo lường các chỉ số CTR, thời gian trên trang và thứ hạng từ khóa qua Google Search Console.",
          "en": "Tracked CTR, dwell time, and keyword rankings via Google Search Console."
        }
      ],
      "results": [
        {
          "vi": "15 từ khóa mục tiêu lọt Top 10 Google Search sau 6 tuần thử nghiệm index bài viết.",
          "en": "15 target keywords reached Google Top 10 within 6 weeks post-indexing."
        },
        {
          "vi": "Tăng lượng Organic Clicks lên 250% so với giai đoạn thử nghiệm ban đầu.",
          "en": "Increased organic clicks by 250% compared to baseline benchmark."
        },
        {
          "vi": "Được hội đồng chấm đồ án chọn làm bài báo cáo mẫu cho sinh viên khóa sau.",
          "en": "Selected by the academic evaluation board as a showcase report for future cohorts."
        }
      ]
    },
    {
      "id": 3,
      "badge": {
        "vi": "Brand Campaign",
        "en": "Brand Campaign"
      },
      "role": {
        "vi": "Trưởng nhóm",
        "en": "Team Leader"
      },
      "roleDetail": {
        "vi": "Trưởng nhóm (Team Leader) & Quản lý Chiến dịch",
        "en": "Team Leader & Campaign Manager"
      },
      "platform": {
        "icon": "fa-solid fa-bullseye",
        "text": "Chiến dịch IMC"
      },
      "title": {
        "vi": "3. Chiến Dịch Lập Kế Hoạch & Triển Khai Nội Dung Thương Hiệu",
        "en": "3. Integrated Brand Content Planning & Execution Campaign"
      },
      "excerpt": {
        "vi": "Xây dựng chiến dịch truyền thông đa kênh cho thương hiệu trong dịp lễ/mở bán mới. Thiết lập thông điệp cốt lõi, ma trận nội dung và quản trị tiến độ thực thi.",
        "en": "Planning and executing an omnichannel campaign for seasonal launch. Establishing key messaging, content matrix, and timeline control."
      },
      "highlights": [
        {
          "vi": "Lên lịch Content Calendar đa kênh",
          "en": "Multichannel Content Calendar design"
        },
        {
          "vi": "Thiết kế bộ nhận diện ấn phẩm mạng xã hội",
          "en": "Social media visual brand kit design"
        },
        {
          "vi": "Điều phối 5 thành viên hoàn thành đúng hạn",
          "en": "Coordinating 5 team members to meet KPIs"
        }
      ],
      "tags": [
        "Notion Planning",
        "Canva Brand Kit",
        "Meta Suite",
        "Content Matrix"
      ],
      "thumbClass": "thumb-gradient-3",
      "watermarkIcon": "fa-solid fa-bullseye",
      "category": {
        "vi": "Integrated Marketing Campaign (IMC) & Branding",
        "en": "Integrated Marketing Campaign (IMC) & Branding"
      },
      "duration": {
        "vi": "3 tháng",
        "en": "3 months"
      },
      "teamSize": {
        "vi": "5 thành viên",
        "en": "5 members"
      },
      "tools": [
        "Notion Project Board",
        "Canva Pro Brand Kit",
        "Meta Business Suite",
        "Google Docs / Sheets",
        "Trello"
      ],
      "bannerGradient": "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #f43f5e 100%)",
      "badgeProject": {
        "vi": "Đồ Án Thực Tế | FPT Digital Marketing",
        "en": "Academic Project | FPT Digital Marketing"
      },
      "overview": {
        "vi": "Lập kế hoạch truyền thông tích hợp (IMC Plan) cho chiến dịch ra mắt bộ sưu tập theo mùa. Dự án bao gồm việc định hình thông điệp thương hiệu cốt lõi (Key Message), thiết kế bộ nhận diện visual và triển khai lịch nội dung đa kênh xuyên suốt 30 ngày.",
        "en": "Formulated an Integrated Marketing Communications (IMC) plan for a seasonal collection launch, defining Key Message, visual brand identity, and a 30-day multichannel content calendar."
      },
      "objectives": [
        {
          "vi": "Định hình phong cách thương hiệu nhất quán (Brand Identity Guidelines): Bảng màu, typography và văn phong (Tone & Voice).",
          "en": "Define brand style guidelines: color palette, typography, and Brand Tone & Voice."
        },
        {
          "vi": "Thiết lập ma trận nội dung theo quy tắc 70-20-10: 70% nội dung giá trị/chia sẻ, 20% nội dung tương tác cảm xúc, 10% bán hàng trực tiếp.",
          "en": "Deploy 70-20-10 content matrix: 70% value-driven, 20% emotional engagement, 10% direct conversion."
        },
        {
          "vi": "Đảm bảo tiến độ đăng bài mỗi ngày không bị trễ hạn thông qua quy trình kiểm duyệt nghiêm ngặt.",
          "en": "Ensure daily publication schedule without bottlenecks through structured review workflows."
        }
      ],
      "contributions": [
        {
          "vi": "Xây dựng bảng kế hoạch tổng thể trên Notion với lịch biểu chi tiết từng ngày, từng người phụ trách (RACI Model).",
          "en": "Structured master planning board on Notion with daily schedules and RACI model assignments."
        },
        {
          "vi": "Thiết kế hơn 20 mẫu poster, carousel nhiều ảnh trên Canva đảm bảo chuẩn nhận diện thương hiệu.",
          "en": "Designed 20+ social media banners and carousel templates on Canva aligned with brand guidelines."
        },
        {
          "vi": "Tổ chức các buổi họp nhóm hàng tuần để giải quyết khó khăn, truyền động lực và duy trì tinh thần đoàn kết.",
          "en": "Facilitated weekly team meetings to unblock issues, motivate members, and maintain team cohesion."
        },
        {
          "vi": "Đánh giá và tổng kết hiệu quả chiến dịch bằng báo cáo chi tiết kèm bài học kinh nghiệm rút ra.",
          "en": "Conducted end-of-campaign post-mortem analysis and performance reporting."
        }
      ],
      "results": [
        {
          "vi": "Chiến dịch hoàn thành 100% KPI về số lượng bài viết và ấn phẩm truyền thông đúng thời hạn.",
          "en": "Achieved 100% KPI completion across all creative assets and editorial posts on schedule."
        },
        {
          "vi": "Tương tác trên Fanpage tăng 180%, tỷ lệ phản hồi tin nhắn khách hàng đạt mức xuất sắc.",
          "en": "Page engagement surged by 180% with outstanding customer message response rates."
        },
        {
          "vi": "Góp phần quan trọng giúp tôi hoàn thành đồ án tốt nghiệp loại Xuất Sắc tại FPT Polyschool.",
          "en": "Directly contributed to earning a High Distinction graduation grade at FPT Polyschool."
        }
      ]
    }
  ],
  "certificates": [
    {
      "id": 1,
      "title": {
        "vi": "Top 2 Chung kết — Cuộc thi Chân Trần Khởi Nghiệp (Mùa 3)",
        "en": "Top 2 Barefoot Startup Competition (Season 3)"
      },
      "award": {
        "vi": "Á quân (Top 2 Chung kết Toàn quốc)",
        "en": "Runner-up (National Finals Top 2)"
      },
      "organization": {
        "vi": "BTEC FPT & DNES",
        "en": "BTEC FPT Danang & DNES"
      },
      "orgIcon": "fa-solid fa-lightbulb",
      "timeLocation": {
        "vi": "14/08/2026 tại Đà Nẵng",
        "en": "14/08/2026 in Danang City"
      },
      "badgeType": {
        "vi": "Top 2 • Á quân",
        "en": "Top 2 • Runner-up"
      },
      "badgeClass": "badge-trophy",
      "badgeStyle": "background: linear-gradient(135deg, #10b981 0%, #059669 100%);",
      "badgeIcon": "fa-solid fa-trophy",
      "mainImage": "cert-chan-tran-khoi-nghiep.jpg",
      "downloadName": "ChungNhan_ChanTranKhoiNghiep_DoMinhTri.jpg",
      "externalUrl": "https://dnes.vn",
      "externalTitle": "Vườn ươm Doanh nghiệp Đà Nẵng DNES",
      "externalIcon": "fa-solid fa-arrow-up-right-from-square",
      "externalText": "Đơn vị DNES",
      "description": {
        "vi": "Thành viên đội Smart Mini Storage — xuất sắc đạt thành tích Top 2 tại Vòng Chung kết Cuộc thi Chân Trần Khởi Nghiệp (Mùa 3), xây dựng dự án ứng dụng tư duy đổi mới sáng tạo, AI và phát triển bền vững để giải quyết vấn đề thực tế và tạo ra giá trị cho cộng đồng.",
        "en": "Core member of Smart Mini Storage — achieving Top 2 honors at the Barefoot Startup Competition (Season 3), building sustainable solutions integrating innovation, AI, and social value."
      },
      "metaItems": [
        {
          "label": {
            "vi": "Người nhận chứng nhận",
            "en": "Awardee"
          },
          "val": "Đỗ Minh Trí (Do Minh Tri)"
        },
        {
          "label": {
            "vi": "Đơn vị tổ chức & Chuyên môn",
            "en": "Organizers & Mentors"
          },
          "val": "BTEC FPT Đà Nẵng & DNES"
        },
        {
          "label": {
            "vi": "Ngày Chung kết",
            "en": "Finals Date"
          },
          "val": "14 / 08 / 2026"
        },
        {
          "label": {
            "vi": "Thành tích / Dự án",
            "en": "Team / Project"
          },
          "val": "Smart Mini Storage Team",
          "isHighlight": true
        }
      ],
      "tags": [
        "Đổi mới sáng tạo",
        "Ứng dụng AI",
        "Phát triển bền vững",
        "Top 2 Chung kết"
      ],
      "tasks": [
        {
          "vi": "Nghiên cứu thị trường và khảo sát thực tế nhu cầu lưu trữ mini thông minh (Smart Mini Storage) của giới trẻ và khách du lịch.",
          "en": "Executed field surveys and market validation for smart micro-storage needs among urban youth and travelers."
        },
        {
          "vi": "Ứng dụng tư duy công nghệ AI và mô hình phát triển bền vững để xây dựng giải pháp tối ưu hóa chi phí vận hành.",
          "en": "Incorporated AI technology and circular economy principles to streamline operational expenses."
        },
        {
          "vi": "Hoàn thiện mô hình kinh doanh và trực tiếp thuyết trình, phản biện tự tin trước hội đồng giám khảo và cố vấn doanh nghiệp.",
          "en": "Finalized business model canvas and pitched before the judging panel and venture mentors."
        }
      ],
      "result": {
        "vi": "Xuất sắc giành giải Top 2 Chung kết (Á quân), chứng minh năng lực đổi mới sáng tạo, tinh thần khởi nghiệp thực chiến và khả năng ứng dụng AI vào giải quyết vấn đề kinh doanh thực tế.",
        "en": "Awarded National Runner-up (Top 2), validating entrepreneurial grit, innovation capability, and AI-driven commercial problem-solving."
      }
    },
    {
      "id": 2,
      "title": {
        "vi": "Vòng Bán kết Toàn quốc — Cuộc thi FPT Biz Talent 2025",
        "en": "National Semi-final — FPT Biz Talent 2025"
      },
      "award": {
        "vi": "Bán kết Toàn quốc (Top đội thi xuất sắc)",
        "en": "National Semi-finalist (Top Venture Teams)"
      },
      "organization": {
        "vi": "Tập đoàn FPT — Ban Công tác Học đường",
        "en": "FPT Corporation — Student Affairs"
      },
      "orgIcon": "fa-solid fa-building-flag",
      "timeLocation": {
        "vi": "15/08/2025",
        "en": "15/08/2025"
      },
      "badgeType": {
        "vi": "Bán kết Toàn quốc",
        "en": "National Semi-final"
      },
      "badgeClass": "badge-fpt",
      "badgeStyle": "background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);",
      "badgeIcon": "fa-solid fa-medal",
      "mainImage": "cert-fpt-biz-talent.jpg",
      "downloadName": "ChungNhan_FPT_Biz_Talent_DoMinhTri.jpg",
      "externalUrl": "https://fpt.edu.vn",
      "externalTitle": "Tập đoàn FPT - Khối Giáo dục",
      "externalIcon": "fa-solid fa-shield-halved",
      "externalText": "FPT Education",
      "description": {
        "vi": "Bằng chứng nhận do Ban Công tác Học đường, Tập đoàn FPT trao tặng, ghi nhận nỗ lực vượt bậc và thành tích xuất sắc của đại diện đội The Culinary AI (FPT Polyschool Bình Định) tại vòng Bán kết toàn quốc cuộc thi khởi nghiệp kinh doanh FPT Biz Talent 2025.",
        "en": "Awarded by FPT Corporation Student Affairs Division, honoring exceptional business acumen and innovative performance of The Culinary AI team at the national semi-finals."
      },
      "metaItems": [
        {
          "label": {
            "vi": "Người nhận chứng nhận",
            "en": "Awardee"
          },
          "val": "Đỗ Minh Trí (Do Minh Tri)"
        },
        {
          "label": {
            "vi": "Đơn vị tổ chức",
            "en": "Organizing Body"
          },
          "val": "Ban Công tác Học đường, Tập đoàn FPT"
        },
        {
          "label": {
            "vi": "Thời gian trao giải",
            "en": "Award Date"
          },
          "val": "15 / 08 / 2025"
        },
        {
          "label": {
            "vi": "Đại diện đội thi",
            "en": "Representing Team"
          },
          "val": "The Culinary AI",
          "isHighlight": true
        }
      ],
      "tags": [
        "FPT Biz Talent",
        "Ý tưởng kinh doanh",
        "Ứng dụng AI ngành ẩm thực",
        "Bán kết toàn quốc"
      ],
      "tasks": [
        {
          "vi": "Nghiên cứu giải pháp kinh doanh ngành F&B kết hợp AI nhằm nâng cao trải nghiệm khách hàng và tối ưu hiệu suất ẩm thực.",
          "en": "Formulated AI-integrated F&B business model enhancing customer personalization and culinary productivity."
        },
        {
          "vi": "Xây dựng kế hoạch tài chính, phân tích điểm hòa vốn và dự báo doanh thu cho mô hình The Culinary AI.",
          "en": "Constructed financial statements, break-even projections, and unit economics."
        },
        {
          "vi": "Đại diện đội thi thuyết trình và bảo vệ ý tưởng kinh doanh trước hội đồng chuyên môn cấp Tập đoàn FPT.",
          "en": "Represented team in pitching and defensing business viability before corporate leadership."
        }
      ],
      "result": {
        "vi": "Đạt thành tích Vòng Bán kết Toàn quốc cuộc thi khởi nghiệp FPT Biz Talent 2025; củng cố tư duy quản trị tài chính, mô hình kinh doanh và tầm nhìn công nghệ phục vụ đời sống.",
        "en": "Ranked among National Semi-finalists of FPT Biz Talent 2025, sharpening financial management, business structuring, and technology vision."
      }
    },
    {
      "id": 3,
      "title": {
        "vi": "Microsoft Office Specialist: Excel 2019 Associate",
        "en": "Microsoft Office Specialist: Excel 2019 Associate"
      },
      "award": {
        "vi": "Chứng chỉ Chuẩn Quốc tế Microsoft Certified",
        "en": "Microsoft Certified International Credential"
      },
      "organization": {
        "vi": "Microsoft & Certiport",
        "en": "Microsoft & Certiport"
      },
      "orgIcon": "fa-brands fa-microsoft",
      "timeLocation": {
        "vi": "20/04/2025",
        "en": "20/04/2025"
      },
      "badgeType": {
        "vi": "Đã xác thực Certiport",
        "en": "Certiport Verified"
      },
      "badgeClass": "badge-ms",
      "badgeStyle": "background: linear-gradient(135deg, #0056b3 0%, #0369a1 100%);",
      "badgeIcon": "fa-solid fa-circle-check",
      "mainImage": "certificate-mos-excel.jpg",
      "downloadName": "ChungChi_MOS_Excel_2019_DoMinhTri.jpg",
      "externalUrl": "https://verify.certiport.com",
      "externalTitle": "Cổng xác thực quốc tế Certiport (Mã: 2NPb-XM8H)",
      "externalIcon": "fa-solid fa-square-check",
      "externalText": "Xác thực Certiport",
      "description": {
        "vi": "Chứng chỉ quốc tế do Microsoft và tổ chức khảo thí Certiport cấp, xác nhận trình độ chuyên sâu trong việc xây dựng mô hình dữ liệu, phân tích số liệu tài chính & marketing, tự động hóa tính toán và trực quan hóa báo cáo.",
        "en": "International certification issued by Microsoft and Certiport, validating expertise in data modeling, marketing/financial analysis, formula automation, and dynamic reporting."
      },
      "metaItems": [
        {
          "label": {
            "vi": "Người nhận chứng chỉ",
            "en": "Candidate Name"
          },
          "val": "Do Minh Tri (Đỗ Minh Trí)"
        },
        {
          "label": {
            "vi": "Mã định danh học viên",
            "en": "Candidate ID"
          },
          "val": "052208008929"
        },
        {
          "label": {
            "vi": "Ngày cấp chứng nhận",
            "en": "Issue Date"
          },
          "val": "20 / 04 / 2025"
        },
        {
          "label": {
            "vi": "Mã xác thực Certiport",
            "en": "Certiport Verification Code"
          },
          "val": "2NPb-XM8H",
          "isHighlight": true
        }
      ],
      "tags": [
        "MOS Excel 2019",
        "Xử lý & Phân tích Dữ liệu",
        "Báo cáo KPI Marketing",
        "Chuẩn quốc tế"
      ],
      "tasks": [
        {
          "vi": "Thành thạo cấu trúc dữ liệu, các hàm nâng cao (VLOOKUP, XLOOKUP, INDEX/MATCH, hàm logic & thống kê).",
          "en": "Mastered advanced data structures and formulas (VLOOKUP, XLOOKUP, INDEX/MATCH, logic & stats)."
        },
        {
          "vi": "Xây dựng Dashboard động, báo cáo phân tích số liệu kinh doanh chuyên nghiệp bằng PivotTable & Slicer trực quan.",
          "en": "Constructed dynamic dashboards and KPI reports utilizing PivotTables and interactive Slicers."
        },
        {
          "vi": "Tự động hóa tác vụ tính toán, xử lý làm sạch dữ liệu lớn và kiểm soát tính toàn vẹn của bảng tính.",
          "en": "Automated data hygiene workflows and maintained spreadsheet data integrity."
        }
      ],
      "result": {
        "vi": "Sở hữu chứng chỉ quốc tế trọn đời có giá trị toàn cầu từ Microsoft; chứng minh năng lực tư duy dữ liệu sắc bén, sẵn sàng đảm nhiệm các vị trí phân tích số liệu và Marketing chuyên sâu.",
        "en": "Earned lifetime globally recognized Microsoft credential; proven data processing and analytical competencies ready for business analysis roles."
      }
    },
    {
      "id": 4,
      "title": {
        "vi": "Sinh viên có thành tích học tập xuất sắc — Học kỳ Spring 2025",
        "en": "Student of Academic Excellence — Spring 2025 Semester"
      },
      "award": {
        "vi": "Khen thưởng Sinh viên Xuất sắc",
        "en": "Academic Commendation of Excellence"
      },
      "organization": {
        "vi": "FPT Polyschool — Cơ sở Bình Định",
        "en": "FPT Polyschool — Binh Dinh Campus"
      },
      "orgIcon": "fa-solid fa-graduation-cap",
      "timeLocation": {
        "vi": "Học kỳ Spring 2025 • Bình Định",
        "en": "Spring Semester 2025 • Binh Dinh"
      },
      "badgeType": {
        "vi": "Xuất sắc • Spring 2025",
        "en": "Excellence • Spring 2025"
      },
      "badgeClass": "badge-academic",
      "badgeStyle": "background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);",
      "badgeIcon": "fa-solid fa-graduation-cap",
      "mainImage": "cert-sv-xuat-sac-2025.jpg",
      "downloadName": "GiayKhen_SinhVienXuatSac_Spring2025_DoMinhTri.jpg",
      "externalUrl": "https://fpt.edu.vn",
      "externalTitle": "FPT Polyschool — Khối Giáo dục FPT",
      "externalIcon": "fa-solid fa-graduation-cap",
      "externalText": "FPT Polyschool",
      "description": {
        "vi": "Được Giám đốc cơ sở Bình Định (FPT Polyschool) vinh danh nhờ thành tích học tập xuất sắc trong học kỳ Spring 2025, khẳng định tinh thần kỷ luật và tư duy học tập chủ động.",
        "en": "Commended by the Campus Director of FPT Polyschool for outstanding academic performance during Spring 2025, demonstrating discipline and proactive self-learning."
      },
      "metaItems": [
        {
          "label": {
            "vi": "Người nhận khen thưởng",
            "en": "Awardee"
          },
          "val": "Đỗ Minh Trí (Do Minh Tri)"
        },
        {
          "label": {
            "vi": "Đơn vị cấp quyết định",
            "en": "Issuing Authority"
          },
          "val": "FPT Polyschool — Cơ sở Bình Định"
        },
        {
          "label": {
            "vi": "Thời gian vinh danh",
            "en": "Commendation Period"
          },
          "val": "Học kỳ Spring 2025"
        },
        {
          "label": {
            "vi": "Danh hiệu khen thưởng",
            "en": "Academic Honor"
          },
          "val": "Sinh viên Xuất sắc (Academic Excellence)",
          "isHighlight": true
        }
      ],
      "tags": [
        "Thành tích học tập",
        "Sinh viên xuất sắc",
        "FPT Polyschool",
        "Spring 2025",
        "Kỷ luật & Tự học"
      ],
      "tasks": [
        {
          "vi": "Hoàn thành xuất sắc toàn bộ khối lượng kiến thức và môn học chuyên ngành trong học kỳ Spring 2025 với kết quả học tập vượt trội.",
          "en": "Achieved outstanding marks across all core professional curriculum modules in Spring 2025."
        },
        {
          "vi": "Chủ động nghiên cứu, vận dụng kiến thức lý thuyết vào các dự án môn học thực tế và tích cực dẫn dắt làm việc nhóm.",
          "en": "Actively researched and bridged classroom theory into hands-on coursework projects."
        },
        {
          "vi": "Duy trì tinh thần tự giác, chấp hành tốt nội quy học đường và đạt tiêu chuẩn khen thưởng của Ban Giám hiệu nhà trường.",
          "en": "Maintained exemplary self-discipline and met all honor roll standards of the board."
        }
      ],
      "result": {
        "vi": "Được Giám đốc cơ sở Bình Định chính thức trao tặng giấy khen Sinh viên Xuất sắc, là minh chứng cho tinh thần kiên trì, thái độ học tập nghiêm túc và nền tảng chuyên môn vững vàng.",
        "en": "Officially awarded Campus Commendation of Academic Excellence, demonstrating relentless dedication, rigorous work ethic, and solid academic foundation."
      }
    }
  ],
  "activities": [
    {
      "id": 1,
      "title": {
        "vi": "BBE Pegasus Chapter — Ban Lãnh Đạo Nhiệm Kỳ I",
        "en": "BBE Pegasus Chapter — Executive Board Term I"
      },
      "role": {
        "vi": "Phó Chủ tịch (Vice President) — Ban Lãnh đạo Nhiệm kỳ I",
        "en": "Vice President — Executive Board (Term I)"
      },
      "organization": "BBE Pegasus Chapter",
      "orgIcon": "fa-solid fa-shield-halved",
      "eventOrg": {
        "vi": "BBE Pegasus Chapter",
        "en": "BBE Pegasus Chapter"
      },
      "timeLocation": {
        "vi": "01/02/2026 – 30/09/2026",
        "en": "01/02/2026 – 30/09/2026"
      },
      "badgeType": {
        "vi": "Ban Lãnh đạo",
        "en": "Executive Board"
      },
      "badgeClass": "badge-leader",
      "badgeIcon": "fa-solid fa-crown",
      "mainImage": "act-pegasus.jpg",
      "description": {
        "vi": "Thể hiện tinh thần trách nhiệm cao, điều phối đội ngũ và hoàn thành xuất sắc nhiệm vụ trong vai trò Phó Chủ tịch nhiệm kỳ I.",
        "en": "Demonstrated strong leadership, operational coordination, and successfully fulfilled executive responsibilities as Vice President during Term I."
      },
      "subPlaceholder1": {
        "vi": "Ảnh hậu trường sinh hoạt & họp điều hành",
        "en": "Operational meetings & internal activities"
      },
      "subPlaceholder2": {
        "vi": "Ảnh tổ chức workshop & chia sẻ kỹ năng",
        "en": "Workshops & skill-sharing sessions"
      },
      "tasks": [
        {
          "vi": "Điều phối thành viên, phân công công việc cụ thể và giám sát tiến độ hoạt động trong ban lãnh đạo.",
          "en": "Coordinated team members, delegated operational duties, and supervised milestone delivery."
        },
        {
          "vi": "Xây dựng quy trình sinh hoạt định kỳ, chuẩn hóa tài liệu và duy trì kỷ luật sinh hoạt chuyên nghiệp.",
          "en": "Standardized chapter operations, meeting protocols, and maintained disciplined execution."
        },
        {
          "vi": "Chủ trì tổ chức các buổi chia sẻ kỹ năng thực chiến và các hoạt động kết nối tinh thần đồng đội.",
          "en": "Chaired practical skill-sharing workshops and facilitated team bonding experiences."
        }
      ],
      "result": {
        "vi": "Duy trì độ gắn kết đội ngũ cao trong suốt nhiệm kỳ I, củng cố năng lực điều hành và xây dựng văn hóa đội nhóm vững mạnh.",
        "en": "Maintained high team cohesion throughout Term I, honing executive leadership and strengthening organizational culture."
      }
    },
    {
      "id": 2,
      "title": {
        "vi": "Lễ Tốt Nghiệp BTEC FPT 2026",
        "en": "BTEC FPT Graduation Ceremony 2026"
      },
      "role": {
        "vi": "Thành viên Ban Tổ chức (Organizing Committee)",
        "en": "Organizing Committee Member"
      },
      "organization": "BTEC FPT",
      "orgIcon": "fa-solid fa-graduation-cap",
      "eventOrg": {
        "vi": "Lễ Tốt nghiệp BTEC FPT 2026",
        "en": "BTEC FPT Graduation Ceremony 2026"
      },
      "timeLocation": {
        "vi": "25/10/2026 tại Đà Nẵng",
        "en": "25/10/2026 in Danang City"
      },
      "badgeType": {
        "vi": "Ban Tổ chức Sự kiện",
        "en": "Event Organizing Committee"
      },
      "badgeClass": "badge-event",
      "badgeIcon": "fa-solid fa-star",
      "mainImage": "act-graduation.jpg",
      "description": {
        "vi": "Trực tiếp đóng góp và phối hợp vận hành sự kiện trọng đại cấp trường, đảm bảo trải nghiệm chuyên nghiệp cho sinh viên và khách mời.",
        "en": "Directly contributed to orchestrating a high-profile commencement ceremony, ensuring a seamless experience for graduates, VIPs, and families."
      },
      "subPlaceholder1": {
        "vi": "Ảnh hậu trường setup & vận hành sân khấu",
        "en": "Stage setup & technical rehearsals"
      },
      "subPlaceholder2": {
        "vi": "Ảnh điều phối tân cử nhân & đón tiếp khách mời",
        "en": "VIP reception & graduate coordination"
      },
      "tasks": [
        {
          "vi": "Phối hợp chuẩn bị công tác hậu cần, kỹ thuật âm thanh, ánh sáng và kiểm soát bố cục sân khấu lễ tốt nghiệp.",
          "en": "Collaborated on logistics, AV technical setups, and stage blocking control."
        },
        {
          "vi": "Trực tiếp hướng dẫn, điều phối hàng ngũ khách mời danh dự, phụ huynh và tân cử nhân trong suốt buổi lễ.",
          "en": "Guided and escorted VIPs, faculty, parents, and new graduates throughout the ceremony flow."
        },
        {
          "vi": "Xử lý nhanh nhạy và kịp thời các tình huống phát sinh tại khu vực sân khấu chính và luồng di chuyển.",
          "en": "Promptly resolved live contingencies on the main stage and guest circulation corridors."
        }
      ],
      "result": {
        "vi": "Sự kiện diễn ra suôn sẻ, chỉn chu và để lại ấn tượng tốt đẹp trong lòng sinh viên cùng khách mời; rèn luyện khả năng ứng biến dưới áp lực cao.",
        "en": "The ceremony concluded smoothly and received praise from leadership; cultivated agility and composure under high-pressure event execution."
      }
    },
    {
      "id": 3,
      "title": {
        "vi": "Dự Án Thiện Nguyện \"Hành Trình Yêu Thương - Số Thứ 4\"",
        "en": "Community Charity Project \"Love Journey - Vol. 4\""
      },
      "role": {
        "vi": "Tình nguyện viên đóng góp tích cực",
        "en": "Active Volunteer Contributor"
      },
      "organization": "BTEC FPT & Fusion Club",
      "orgIcon": "fa-solid fa-heart",
      "eventOrg": {
        "vi": "Dự án thiện nguyện \"Hành Trình Yêu Thương - Số thứ 4\"",
        "en": "Love Journey Vol. 4 Project"
      },
      "timeLocation": {
        "vi": "Ngũ Hành Sơn, Đà Nẵng",
        "en": "Ngu Hanh Son, Danang City"
      },
      "badgeType": {
        "vi": "Thiện nguyện cộng đồng",
        "en": "Community Volunteering"
      },
      "badgeClass": "badge-volunteer",
      "badgeIcon": "fa-solid fa-hand-holding-heart",
      "mainImage": "act-thien-nguyen.jpg",
      "description": {
        "vi": "Tham gia tổ chức và lan tỏa giá trị tích cực tại Mái Ấm Tình Thương (Ngũ Hành Sơn, Đà Nẵng).",
        "en": "Co-organized and delivered compassionate support and meaningful donations to children at Mai Am Tinh Thuong Shelter in Danang."
      },
      "subPlaceholder1": {
        "vi": "Ảnh chuẩn bị & phân loại quà tặng thiện nguyện",
        "en": "Donation sorting & packaging"
      },
      "subPlaceholder2": {
        "vi": "Ảnh sinh hoạt, giao lưu trò chơi cùng các em nhỏ",
        "en": "Interactive games & activities with children"
      },
      "tasks": [
        {
          "vi": "Lên kế hoạch vận động, tiếp nhận và phân loại chu đáo các phần quà tặng gửi tới Mái Ấm Tình Thương.",
          "en": "Mobilized, received, and systematically packaged essential donation packages."
        },
        {
          "vi": "Tổ chức hoạt động giao lưu văn nghệ, trò chơi tập thể sôi nổi, an toàn và kết nối cùng các em nhỏ.",
          "en": "Facilitated engaging, safe group games and artistic performances with children."
        },
        {
          "vi": "Trực tiếp kết nối, lắng nghe, chăm sóc các em nhỏ tại Mái Ấm Tình Thương và hỗ trợ công tác hậu cần.",
          "en": "Connected with children personally, provided companionship, and supported site logistics."
        }
      ],
      "result": {
        "vi": "Lan tỏa tinh thần sẻ chia và gắn kết cộng đồng sinh viên; nuôi dưỡng lòng trắc ẩn và tinh thần trách nhiệm xã hội.",
        "en": "Fostered empathy, community connection, and active civic responsibility among student volunteers."
      }
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  // Mark JavaScript as enabled
  document.documentElement.classList.add('js-enabled');

  // Initialize Dark / Light Theme
  initTheme();

  // Initialize Language Switcher (i18n) first
  initLanguageSwitcher();

  // Load dynamic portfolio data from data.json
  initPortfolioData();

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
    'nav.about': 'Về tôi',
    'nav.experience': 'Kinh nghiệm',
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
    'hero.ai_badge_main': 'Sẵn sàng hợp tác • <strong>Business &amp; Digital Marketing | Ứng dụng AI Agent</strong>',
    'hero.greeting': 'Xin chào, mình là',
    'hero.motto': 'I never lose. I either win or learn!',
    'hero.role_ai': '<i class="fa-solid fa-chart-line"></i> Business &amp; Digital Marketing',
    'hero.role_mc': '<i class="fa-solid fa-robot"></i> Ứng dụng AI Agent',
    'hero.role_lang': '<i class="fa-solid fa-microphone-lines"></i> MC &amp; Song ngữ Anh - Trung',
    'hero.mission_tag': 'Tuyên ngôn cá nhân',
    'hero.mission_text': '“You may know me in many roles, but my true mission is to forge myself, pave the way, and awaken the strength in others.”',
    'hero.description': 'Chào bạn! Mình là Minh Trí (Eric) — sinh viên Quản trị Kinh doanh tại BTEC FPT Đà Nẵng và Tốt nghiệp Xuất Sắc chuyên ngành Digital Marketing. Mình kết hợp tư duy chiến lược thương hiệu, sáng tạo nội dung đa kênh với khả năng ứng dụng AI Agent thực chiến để tối ưu hiệu suất và tạo giá trị bền vững cho doanh nghiệp.',
    'hero.cta_projects': 'Xem dự án của tôi',
    'hero.cta_contact': 'Liên hệ ngay',
    'hero.cta_cv': 'Xem CV (PDF)',
    'hero.cta_cv_title': 'Xem bản CV PDF chuẩn ATS',
    'hero.quick_label': 'Kết nối nhanh:',
    'hero.avatar_hint_title': 'Đỗ Minh Trí - Business & Digital Marketing | AI Agent',
    'hero.badge_ai_sub': 'Bán kết FPT Biz Talent 2025',
    'hero.badge_lang_title': '+180% Tương Tác',
    'hero.badge_lang_sub': '100% KPI Chiến dịch & MOS Quốc tế',
    'hero.badge_award_title': 'Top 2 Chung Kết',
    'hero.badge_award_sub': 'Á Quân Chân Trần Khởi Nghiệp Mùa 3',
    'hero.badge_edu_title': 'Tốt Nghiệp Xuất Sắc',
    'hero.badge_edu_sub': 'Digital Marketing • BTEC & FPT',

    // Experience Section
    'exp.tag': 'Lộ trình thực chiến',
    'exp.title': 'Kinh Nghiệm & Vai Trò Thực Chiến',
    'exp.subtitle': 'Các vị trí điều hành CLB, dẫn dắt dự án Marketing thực tế và tổ chức sự kiện quy mô lớn giúp tôi rèn giũa tư duy thực thi chuyên nghiệp.',

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
    'contact.val_address': 'Đà Nẵng, Việt Nam',
    'contact.btn_call': 'Gọi điện ngay',
    'contact.btn_mail': 'Gửi email',
    'contact.ref_badge': 'Người Tham Chiếu (Reference)',
    'contact.ref_name': 'Cô Nguyễn Thị Thanh Tâm',
    'contact.ref_role': 'Giảng viên bộ môn Digital Marketing',
    'contact.ref_phone': 'Thông tin người tham chiếu sẽ được cung cấp khi có yêu cầu',
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
    'footer.bio': 'Đỗ Minh Trí (Eric Do) — Business & Digital Marketing | Ứng dụng AI Agent. Sẵn sàng mang đến tư duy chiến lược, nội dung sáng tạo và giải pháp công nghệ thực chiến cho đội ngũ của bạn.',
    'footer.quick_links': 'Liên kết nhanh',
    'footer.docs_title': 'Tài liệu & Hồ sơ',
    'footer.cv_desc': 'Tải bản CV PDF chuẩn ATS kèm thông tin xác thực quá trình học tập và giải thưởng.',
    'footer.download_cv': 'Tải bản CV (PDF)',
    'footer.copyright': '© 2026 <strong>Đỗ Minh Trí</strong>. Bản quyền thuộc về tác giả. Thiết kế chuyên nghiệp, tối ưu hóa giao diện người dùng (UI/UX).',
    'footer.back_to_top': 'Về đầu trang',

    // Lightbox
    'lightbox.badge': 'Ảnh minh chứng thực tế',
    'lightbox.download': 'Tải ảnh về máy',
    'lightbox.open_tab': 'Mở tab mới'
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
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
    'hero.ai_badge_main': 'Open to Opportunities • <strong>Business &amp; Digital Marketing | AI Agent Solutions</strong>',
    'hero.greeting': 'Hello, I am',
    'hero.motto': 'I never lose. I either win or learn!',
    'hero.role_ai': '<i class="fa-solid fa-chart-line"></i> Business &amp; Digital Marketing',
    'hero.role_mc': '<i class="fa-solid fa-robot"></i> AI Agent Solutions',
    'hero.role_lang': '<i class="fa-solid fa-microphone-lines"></i> Public Speaker &amp; EN - ZH',
    'hero.mission_tag': 'Personal Mission',
    'hero.mission_text': '“You may know me in many roles, but my true mission is to forge myself, pave the way, and awaken the strength in others.”',
    'hero.description': 'Hi, I\'m Minh Tri (Eric) — a Business Administration student at BTEC FPT Danang and High Distinction graduate in Digital Marketing. I combine brand strategy and omnichannel content creation with practical AI Agent workflows to drive measurable growth and business impact.',
    'hero.cta_projects': 'Explore My Projects',
    'hero.cta_contact': 'Get In Touch',
    'hero.cta_cv': 'View CV (PDF)',
    'hero.cta_cv_title': 'Preview ATS-friendly PDF Resume',
    'hero.quick_label': 'Quick connect:',
    'hero.avatar_hint_title': 'Do Minh Tri - Business & Digital Marketing | AI Agent',
    'hero.badge_ai_sub': 'FPT Biz Talent 2025 Semi-finalist',
    'hero.badge_lang_title': '+180% Engagement',
    'hero.badge_lang_sub': '100% Campaign KPI & MOS Certified',
    'hero.badge_award_title': 'Top 2 National Finalist',
    'hero.badge_award_sub': 'Runner-Up Barefoot Startup S3',
    'hero.badge_edu_title': 'High Distinction',
    'hero.badge_edu_sub': 'Digital Marketing • BTEC & FPT',

    // Experience Section
    'exp.tag': 'Practical Track Record',
    'exp.title': 'Experience & Leadership Roles',
    'exp.subtitle': 'Executive club leadership, hands-on marketing team management, and large-scale campus event operations.',

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
    'contact.val_address': 'Danang, Vietnam',
    'contact.btn_call': 'Call Directly',
    'contact.btn_mail': 'Send Email',
    'contact.ref_badge': 'Professional Reference',
    'contact.ref_name': 'Ms. Nguyen Thi Thanh Tam',
    'contact.ref_role': 'Digital Marketing Lecturer',
    'contact.ref_phone': 'Referee details available upon request',
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
    'footer.bio': 'Do Minh Tri (Eric Do) — Business & Digital Marketing | AI Agent Solutions. Ready to deliver strategic thinking, creative content, and AI-powered execution to your team.',
    'footer.quick_links': 'Quick Links',
    'footer.docs_title': 'Documents & Profile',
    'footer.cv_desc': 'Download the ATS-friendly PDF resume with verified academic credentials and honors.',
    'footer.download_cv': 'Download Resume (PDF)',
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

  // 6. Re-render dynamic sections with new language
  if (portfolioData) {
    renderAllDynamicSections();
  }

  // 7. Live re-render currently active modal if open
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
   1.5. DARK MODE & ANALYTICS (GA4 / UMAMI) ENGINE
------------------------------------------------------------------- */
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio_theme');
  const isDark = (savedTheme === 'dark');
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateThemeIcons(isDark);
}

function toggleTheme() {
  const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const nextDark = !isCurrentlyDark;
  if (nextDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('portfolio_theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('portfolio_theme', 'light');
  }
  updateThemeIcons(nextDark);
  trackPortfolioEvent('toggle_theme', { theme: nextDark ? 'dark' : 'light' });
}

function updateThemeIcons(isDark) {
  const icons = [
    document.getElementById('theme-toggle-icon'),
    document.getElementById('drawer-theme-icon')
  ];
  icons.forEach(icon => {
    if (!icon) return;
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });
}

let analyticsInitialized = false;
function initAnalytics(analyticsCfg) {
  if (analyticsInitialized || !analyticsCfg) return;
  const gaId = (analyticsCfg.gaMeasurementId || '').trim();
  const umamiId = (analyticsCfg.umamiWebsiteId || '').trim();
  const umamiSrc = (analyticsCfg.umamiScriptUrl || 'https://cloud.umami.is/script.js').trim();

  if (gaId && /^G-[A-Z0-9]+$/i.test(gaId)) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId);
    analyticsInitialized = true;
  }

  if (umamiId) {
    const umamiScript = document.createElement('script');
    umamiScript.defer = true;
    umamiScript.src = umamiSrc;
    umamiScript.setAttribute('data-website-id', umamiId);
    document.head.appendChild(umamiScript);
    analyticsInitialized = true;
  }
}

function trackPortfolioEvent(eventName, params = {}) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(eventName, params);
    }
  } catch (e) {}
}

function handleHeroCopyEmail(btnEl) {
  const email = (portfolioData && portfolioData.profile && portfolioData.profile.contact && portfolioData.profile.contact.email) || 'dominhtri2206@gmail.com';
  const msg = currentLang === 'en' ? `Copied Email: ${email}!` : `Đã sao chép Email: ${email}!`;
  copyToClipboard(email, msg);
  trackPortfolioEvent('copy_email', { location: 'hero' });

  if (btnEl) {
    const icon = btnEl.querySelector('i');
    if (icon) {
      const prevClass = icon.className;
      icon.className = 'fa-solid fa-check text-success';
      setTimeout(() => { icon.className = prevClass; }, 2000);
    }
  }
}

function handleHeroLinkedInClick(e) {
  const linkedinUrl = (portfolioData && portfolioData.profile && portfolioData.profile.contact && portfolioData.profile.contact.linkedin || '').trim();
  trackPortfolioEvent('click_linkedin', { configured: Boolean(linkedinUrl) });
  if (linkedinUrl) {
    return; // Normal anchor navigation to target="_blank"
  }
  e.preventDefault();
  const contactEl = document.getElementById('contact');
  if (contactEl) {
    contactEl.scrollIntoView({ behavior: 'smooth' });
  }
  showToast(currentLang === 'en'
    ? 'Connect directly via Email or Zalo below!'
    : 'Kết nối trực tiếp qua Email hoặc Zalo bên dưới nhé!');
}

/* -------------------------------------------------------------------
   2.1. LOAD DYNAMIC DATA FROM data.json
------------------------------------------------------------------- */
async function initPortfolioData() {
  try {
    const res = await fetch('data.json?v=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Status: ' + res.status);
    portfolioData = await res.json();
    console.log('✅ Loaded data.json successfully.');
  } catch (err) {
    console.warn('⚠️ Could not load data.json dynamically (possibly local file:// protocol), using fallback data.', err);
    portfolioData = DEFAULT_PORTFOLIO_DATA;
  }
  if (portfolioData && portfolioData.analytics) {
    initAnalytics(portfolioData.analytics);
  }
  renderAllDynamicSections();
}

function renderAllDynamicSections() {
  if (!portfolioData) return;
  renderHeroDynamic();
  renderHighlightsGrid();
  renderExperienceTimeline();
  renderProjectsGrid();
  renderCertificatesGrid();
  renderActivitiesGrid();
}

function renderExperienceTimeline() {
  const container = document.getElementById('experience-timeline');
  if (!container || !portfolioData) return;

  const list = portfolioData.experiences || DEFAULT_PORTFOLIO_DATA.experiences || [];
  if (!Array.isArray(list) || list.length === 0) return;

  container.innerHTML = list.map((exp, idx) => {
    const period = exp.period ? (exp.period[currentLang] || exp.period.vi || '') : '';
    const role = exp.role ? (exp.role[currentLang] || exp.role.vi || '') : '';
    const org = exp.organization ? (typeof exp.organization === 'object' ? (exp.organization[currentLang] || exp.organization.vi) : exp.organization) : '';
    const badge = exp.badge ? (exp.badge[currentLang] || exp.badge.vi || '') : '';
    const summary = exp.summary ? (exp.summary[currentLang] || exp.summary.vi || '') : '';
    const dotClass = (exp.isCurrent || idx === 0) ? 'active-dot' : '';

    const hlHtml = (exp.highlights || []).map(item => {
      const txt = typeof item === 'object' ? (item[currentLang] || item.vi || '') : item;
      return `<li><i class="fa-solid fa-circle-check text-success"></i> <span>${txt}</span></li>`;
    }).join('');

    const tagsHtml = (exp.tags || []).map(t => `<span class="tool-pill">${t}</span>`).join('');

    return `
      <div class="exp-timeline-card bento-card reveal-up">
        <div class="exp-timeline-dot ${dotClass}"></div>
        <div class="exp-card-head">
          <div>
            <div class="exp-meta-pills">
              <span class="exp-period-pill"><i class="fa-regular fa-calendar-check"></i> ${period}</span>
              ${badge ? `<span class="exp-type-pill">${badge}</span>` : ''}
            </div>
            <h3 class="exp-role-title">${role}</h3>
            <p class="exp-org-name"><i class="fa-solid fa-building-shield text-primary-color"></i> ${org}</p>
          </div>
        </div>
        ${summary ? `<p class="exp-summary">${summary}</p>` : ''}
        ${hlHtml ? `<ul class="exp-highlights-list">${hlHtml}</ul>` : ''}
        ${tagsHtml ? `<div class="exp-tags">${tagsHtml}</div>` : ''}
      </div>
    `;
  }).join('');
}

function renderHighlightsGrid() {
  const container = document.getElementById('hero-highlights-container');
  if (!container || !portfolioData || !portfolioData.highlights) return;

  const list = portfolioData.highlights;
  if (!Array.isArray(list) || list.length === 0) return;

  container.innerHTML = list.map(item => {
    const title = (item.title && (item.title[currentLang] || item.title.vi)) || '';
    const subtitle = (item.subtitle && (item.subtitle[currentLang] || item.subtitle.vi)) || '';
    const darkClass = item.isDark ? 'bento-dark-accent' : '';
    const iconColor = item.iconColor || 'icon-blue';
    const icon = item.icon || 'fa-solid fa-star';

    return `
      <div class="hero-stat-card bento-card bento-span-3 ${darkClass}">
        <div class="badge-icon ${iconColor}"><i class="${icon}"></i></div>
        <div class="badge-text">
          <strong>${title}</strong>
          <span>${subtitle}</span>
        </div>
      </div>
    `;
  }).join('');
}


function renderAboutDynamic() {
  if (!portfolioData || !portfolioData.about) return;
  const ab = portfolioData.about;

  // Section Header
  const tagEl = document.querySelector('#about [data-i18n="about.tag"]');
  if (tagEl && ab.tag) tagEl.textContent = ab.tag[currentLang] || ab.tag.vi;

  const titleEl = document.querySelector('#about [data-i18n="about.title"]');
  if (titleEl && ab.title) titleEl.textContent = ab.title[currentLang] || ab.title.vi;

  const subEl = document.querySelector('#about [data-i18n="about.subtitle"]');
  if (subEl && ab.subtitle) subEl.textContent = ab.subtitle[currentLang] || ab.subtitle.vi;

  // Education 1 (BTEC)
  const edus = Array.isArray(ab.education) ? ab.education : [];
  if (edus[0]) {
    const e1 = edus[0];
    const b1 = document.querySelector('[data-i18n="about.edu_btec_badge"]');
    if (b1 && e1.badge) b1.textContent = e1.badge[currentLang] || e1.badge.vi;
    const m1 = document.querySelector('[data-i18n="about.edu_btec_major"]');
    if (m1 && e1.major) m1.textContent = e1.major[currentLang] || e1.major.vi;
    const d1 = document.querySelector('[data-i18n="about.edu_btec_desc"]');
    if (d1 && e1.desc) d1.textContent = e1.desc[currentLang] || e1.desc.vi;
  }

  // Education 2 (Poly)
  if (edus[1]) {
    const e2 = edus[1];
    const b2 = document.querySelector('[data-i18n="about.edu_poly_badge"]');
    if (b2 && e2.badge) b2.textContent = e2.badge[currentLang] || e2.badge.vi;
    const p2 = document.querySelector('[data-i18n="about.edu_poly_pill"]');
    if (p2 && e2.pill) p2.textContent = e2.pill[currentLang] || e2.pill.vi;
    const m2 = document.querySelector('[data-i18n="about.edu_poly_major"]');
    if (m2 && e2.major) m2.textContent = e2.major[currentLang] || e2.major.vi;
    const d2 = document.querySelector('[data-i18n="about.edu_poly_desc"]');
    if (d2 && e2.desc) d2.textContent = e2.desc[currentLang] || e2.desc.vi;
  }

  // Core Strengths
  const strs = Array.isArray(ab.strengths) ? ab.strengths : [];
  if (strs[0]) {
    const t = document.querySelector('[data-i18n="about.str_ai_title"]');
    if (t && strs[0].title) t.textContent = strs[0].title[currentLang] || strs[0].title.vi;
    const d = document.querySelector('[data-i18n="about.str_ai_desc"]');
    if (d && strs[0].desc) d.textContent = strs[0].desc[currentLang] || strs[0].desc.vi;
  }
  if (strs[1]) {
    const t = document.querySelector('[data-i18n="about.str_biz_title"]');
    if (t && strs[1].title) t.textContent = strs[1].title[currentLang] || strs[1].title.vi;
    const d = document.querySelector('[data-i18n="about.str_biz_desc"]');
    if (d && strs[1].desc) d.textContent = strs[1].desc[currentLang] || strs[1].desc.vi;
  }
  if (strs[2]) {
    const t = document.querySelector('[data-i18n="about.str_mc_title"]');
    if (t && strs[2].title) t.textContent = strs[2].title[currentLang] || strs[2].title.vi;
    const d = document.querySelector('[data-i18n="about.str_mc_desc"]');
    if (d && strs[2].desc) d.textContent = strs[2].desc[currentLang] || strs[2].desc.vi;
  }
}

function renderHeroDynamic() {
  if (!portfolioData || !portfolioData.profile) return;
  const p = portfolioData.profile;

  // Name
  const nameEl = document.querySelector('.hero-title .text-highlight');
  if (nameEl && p.name) {
    nameEl.textContent = p.name[currentLang] || p.name.vi;
  }

  // Alias
  const aliasEl = document.querySelector('.hero-title .hero-alias');
  if (aliasEl && p.alias) {
    aliasEl.textContent = p.alias;
  }

  // Avatar
  const avatarEl = document.getElementById('user-avatar');
  if (avatarEl && p.avatar) {
    avatarEl.src = p.avatar;
  }

  // Motto
  const mottoEl = document.querySelector('.hero-motto [data-i18n="hero.motto"]');
  if (mottoEl && p.motto) {
    mottoEl.textContent = p.motto[currentLang] || p.motto.vi;
  }

  // Roles
  const rolesContainer = document.querySelector('.role-badge-container');
  if (rolesContainer && p.roles && p.roles.length > 0) {
    rolesContainer.innerHTML = p.roles.map((r, idx) => `
      <span class="role-tag"><i class="${r.icon || 'fa-solid fa-check'}"></i> ${r.text[currentLang] || r.text.vi}</span>
      ${idx < p.roles.length - 1 ? '<span class="role-separator">•</span>' : ''}
    `).join('');
  }

  // Bio
  const descEl = document.querySelector('.hero-description');
  if (descEl && p.bio) {
    descEl.textContent = p.bio[currentLang] || p.bio.vi;
  }

  // Mission Tag & Text
  const missionTagEl = document.querySelector('.hero-mission-quote .mission-tag [data-i18n="hero.mission_tag"]');
  if (missionTagEl && p.mission && p.mission.tag) {
    missionTagEl.textContent = p.mission.tag[currentLang] || p.mission.tag.vi;
  }
  const missionTextEl = document.querySelector('.hero-mission-quote .mission-text');
  if (missionTextEl && p.mission && p.mission.text) {
    missionTextEl.textContent = p.mission.text[currentLang] || p.mission.text.vi;
  }

  // Status Badge & Headline
  const statusEl = document.getElementById('hero-status-badge');
  if (statusEl && p.statusBadge && (p.statusBadge[currentLang] || p.statusBadge.vi)) {
    statusEl.textContent = p.statusBadge[currentLang] || p.statusBadge.vi;
  }

  // Dynamic CV PDF Links
  const cvPath = (p.cvUrl || 'CV_DoMinhTri.pdf').trim();
  document.querySelectorAll('.cv-dynamic-link').forEach(link => {
    link.href = cvPath;
    if (link.hasAttribute('download')) {
      link.setAttribute('download', cvPath.split('/').pop() || 'CV_DoMinhTri.pdf');
    }
  });

  // Hero Quick-Connect & Contact Info Sync
  if (p.contact) {
    const email = p.contact.email || 'dominhtri2206@gmail.com';
    const phone = p.contact.phone || '0934 454 099';
    const cleanPhone = (p.contact.zalo || phone).replace(/\s+/g, '');
    const linkedin = (p.contact.linkedin || '').trim();

    const heroEmailText = document.getElementById('hero-email-pill-text');
    if (heroEmailText) heroEmailText.textContent = email;

    const heroZaloLink = document.getElementById('hero-zalo-link');
    const heroZaloText = document.getElementById('hero-zalo-pill-text');
    if (heroZaloLink) heroZaloLink.href = `https://zalo.me/${cleanPhone}`;
    if (heroZaloText) heroZaloText.textContent = `Zalo: ${phone}`;

    const heroLinkedinLink = document.getElementById('hero-linkedin-link');
    if (heroLinkedinLink) {
      if (linkedin) {
        heroLinkedinLink.href = linkedin;
        heroLinkedinLink.target = '_blank';
        heroLinkedinLink.rel = 'noopener noreferrer';
      } else {
        heroLinkedinLink.href = '#contact';
        heroLinkedinLink.removeAttribute('target');
      }
    }

    const contactEmailEl = document.getElementById('email-text');
    if (contactEmailEl) {
      contactEmailEl.textContent = email;
      contactEmailEl.href = `mailto:${email}`;
    }
    const contactPhoneEl = document.getElementById('phone-text');
    if (contactPhoneEl) {
      contactPhoneEl.textContent = phone;
      contactPhoneEl.href = `tel:${phone.replace(/\s+/g, '')}`;
    }
  }
}

function renderProjectsGrid() {
  const container = document.getElementById('projects-grid');
  if (!container || !portfolioData || !portfolioData.projects) return;

  const isEn = (currentLang === 'en');
  const quickViewText = isEn ? 'Quick View' : 'Xem nhanh';
  const detailBtnText = isEn ? 'View Project Details' : 'Xem chi tiết dự án';

  container.innerHTML = portfolioData.projects.map((p, idx) => {
    const title = p.title[currentLang] || p.title.vi;
    const badge = p.badge[currentLang] || p.badge.vi;
    const role = p.role[currentLang] || p.role.vi;
    const excerpt = p.excerpt[currentLang] || p.excerpt.vi;
    const platformText = p.platform ? (typeof p.platform === 'object' ? p.platform.text : p.platform) : '';
    const platformIcon = (p.platform && p.platform.icon) || 'fa-solid fa-layer-group';
    const delayClass = idx > 0 ? `delay-${idx}` : '';
    const hasVideo = Boolean(p.videoUrl && p.videoUrl.trim());
    const bannerStyle = p.bannerImage
      ? `background-image: linear-gradient(rgba(0,0,0,0.22), rgba(0,0,0,0.45)), url('${p.bannerImage}'); background-size: cover; background-position: center;`
      : '';

    const highlightsHtml = (p.highlights || []).map(h => {
      const hText = typeof h === 'object' ? (h[currentLang] || h.vi) : h;
      return `<div class="highlight-item"><i class="fa-solid fa-check text-success"></i> <span>${hText}</span></div>`;
    }).join('');

    const tagsHtml = (p.tags || p.tools || []).slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('');

    return `
      <article class="project-card reveal-up ${delayClass}" data-project-id="${p.id}">
        <div class="project-thumb-container">
          <div class="project-thumb-placeholder ${p.thumbClass || 'thumb-gradient-' + ((idx % 3) + 1)}" style="${bannerStyle}">
            ${!p.bannerImage ? `<i class="${p.watermarkIcon || p.icon || 'fa-solid fa-briefcase'} project-watermark"></i>` : ''}
            <div class="thumb-badge">${badge}</div>
            ${hasVideo ? `<div class="thumb-video-pill"><i class="fa-solid fa-circle-play"></i> Video Demo</div>` : ''}
            <div class="thumb-actions">
              <button class="btn btn-sm btn-light btn-preview" onclick="openProjectModal(${p.id})">
                <i class="fa-solid fa-magnifying-glass-plus"></i> <span>${quickViewText}</span>
              </button>
            </div>
          </div>
        </div>

        <div class="project-body">
          <div class="project-meta">
            <span class="role-badge"><i class="fa-solid fa-crown"></i> <span>${role}</span></span>
            <span class="platform-badge"><i class="${platformIcon}"></i> ${platformText}</span>
          </div>

          <h3 class="project-title">${title}</h3>

          <p class="project-excerpt">${excerpt}</p>

          <div class="project-highlights">
            ${highlightsHtml}
          </div>

          <div class="project-tech-tags">
            ${tagsHtml}
          </div>

          <div class="project-footer">
            <button class="btn btn-outline btn-sm w-100" onclick="openProjectModal(${p.id})">
              <span>${detailBtnText}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderCertificatesGrid() {
  const container = document.getElementById('certificates-grid');
  if (!container || !portfolioData || !portfolioData.certificates) return;

  const isEn = (currentLang === 'en');
  const viewDetailText = isEn ? 'View Details' : 'Xem chi tiết';
  const viewPhotoText = isEn ? 'View Image' : 'Xem ảnh';
  const zoomTooltip = isEn ? 'Click to enlarge and view verified certificate' : 'Bấm vào để phóng to xem rõ chứng nhận';
  const zoomBadge = isEn ? 'Enlarge Certificate' : 'Phóng to chứng nhận';

  container.innerHTML = portfolioData.certificates.map(c => {
    const title = c.title[currentLang] || c.title.vi;
    const badgeType = c.badgeType[currentLang] || c.badgeType.vi;
    const org = c.organization[currentLang] || c.organization.vi;
    const timeLoc = c.timeLocation[currentLang] || c.timeLocation.vi;
    const safeTitle = title.replace(/'/g, "\\'");

    return `
      <div class="activity-card reveal-up">
        <div class="act-img-wrapper"
          onclick="openLightbox('${c.mainImage}', '${safeTitle}')"
          title="${zoomTooltip}">
          <img src="${c.mainImage}" alt="${title}" class="act-img" loading="lazy">
          <div class="act-img-overlay">
            <span class="act-zoom-btn">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
              <span>${zoomBadge}</span>
            </span>
          </div>
          <span class="act-floating-badge ${c.badgeClass || 'badge-trophy'}" style="${c.badgeStyle || ''}">
            <i class="${c.badgeIcon || 'fa-solid fa-award'}"></i> <span>${badgeType}</span>
          </span>
        </div>
        <div class="act-body">
          <div class="act-badge-row">
            <span class="act-org-tag"><i class="${c.orgIcon || 'fa-solid fa-building'}"></i> ${org}</span>
            <span class="act-term-tag"><i class="fa-regular fa-calendar-check"></i> ${timeLoc}</span>
          </div>
          <h3 class="act-role-title">${title}</h3>
          <div class="act-card-action">
            <button type="button" class="btn btn-primary btn-sm act-btn-detail" onclick="openCertificateModal(${c.id})">
              <span>${viewDetailText}</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button type="button" class="btn btn-outline btn-sm act-btn-proof"
              onclick="openLightbox('${c.mainImage}', '${safeTitle}')"
              title="${zoomBadge}">
              <i class="fa-solid fa-expand"></i> <span>${viewPhotoText}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderActivitiesGrid() {
  const container = document.getElementById('activities-grid');
  if (!container || !portfolioData || !portfolioData.activities) return;

  const isEn = (currentLang === 'en');
  const viewDetailText = isEn ? 'View Details' : 'Xem chi tiết';
  const viewPhotoText = isEn ? 'View Image' : 'Xem ảnh';
  const zoomTooltip = isEn ? 'Click to enlarge and view proof' : 'Bấm vào để phóng to xem rõ';
  const zoomPhoto = isEn ? 'Enlarge Photo' : 'Phóng to ảnh';

  container.innerHTML = portfolioData.activities.map(a => {
    const title = a.title[currentLang] || a.title.vi;
    const badgeType = a.badgeType[currentLang] || a.badgeType.vi;
    const org = typeof a.organization === 'object' ? (a.organization[currentLang] || a.organization.vi) : a.organization;
    const timeLoc = a.timeLocation[currentLang] || a.timeLocation.vi;
    const safeTitle = title.replace(/'/g, "\\'");

    return `
      <div class="activity-card reveal-up">
        <div class="act-img-wrapper"
          onclick="openLightbox('${a.mainImage}', '${safeTitle}')"
          title="${zoomTooltip}">
          <img src="${a.mainImage}" alt="${title}" class="act-img" loading="lazy">
          <div class="act-img-overlay">
            <span class="act-zoom-btn">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
              <span>${zoomPhoto}</span>
            </span>
          </div>
          <span class="act-floating-badge ${a.badgeClass || 'badge-leader'}">
            <i class="${a.badgeIcon || 'fa-solid fa-crown'}"></i> <span>${badgeType}</span>
          </span>
        </div>
        <div class="act-body">
          <div class="act-badge-row">
            <span class="act-org-tag"><i class="${a.orgIcon || 'fa-solid fa-users'}"></i> ${org}</span>
            <span class="act-term-tag"><i class="fa-regular fa-calendar-check"></i> ${timeLoc}</span>
          </div>
          <h3 class="act-role-title">${title}</h3>
          <div class="act-card-action">
            <button type="button" class="btn btn-primary btn-sm act-btn-detail" onclick="openActivityModal(${a.id})">
              <span>${viewDetailText}</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button type="button" class="btn btn-outline btn-sm act-btn-proof"
              onclick="openLightbox('${a.mainImage}', '${safeTitle}')"
              title="${zoomPhoto}">
              <i class="fa-solid fa-expand"></i> <span>${viewPhotoText}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
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
  handleHeaderScroll();
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
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

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
  const sections = document.querySelectorAll('section[id], div#achievements, footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (sections.length === 0) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });

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
   9. PROJECT MODAL POPUP, VIDEO EMBED & DYNAMIC DATA
------------------------------------------------------------------- */
function buildVideoEmbedHtml(rawUrl, isEn) {
  if (!rawUrl || !rawUrl.trim()) return '';
  const url = rawUrl.trim();

  // 1. YouTube (watch?v=, youtu.be/, shorts/, embed/)
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,15})/);
  if (ytMatch) {
    const videoId = ytMatch[1];
    const isShort = /youtube\.com\/shorts\//i.test(url);
    return `
      <div class="modal-video-showcase">
        <div class="modal-section-title">
          <i class="fa-brands fa-youtube" style="color: #FF0000;"></i>
          <span>${isEn ? 'Project Demo Video' : 'Video Demo Sản Phẩm Thực Tế'}</span>
        </div>
        <div class="video-embed-frame ${isShort ? 'video-vertical' : ''}">
          <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0"
            title="YouTube Video Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen loading="lazy"></iframe>
        </div>
      </div>
    `;
  }

  // 2. TikTok (tiktok.com/@user/video/123456789)
  const ttMatch = url.match(/tiktok\.com\/.*\/video\/(\d+)/i);
  if (ttMatch) {
    const ttId = ttMatch[1];
    return `
      <div class="modal-video-showcase">
        <div class="modal-section-title" style="justify-content: space-between;">
          <span style="display: inline-flex; align-items: center; gap: 8px;">
            <i class="fa-brands fa-tiktok"></i>
            <span>${isEn ? 'TikTok Short-form Video Demo' : 'Video Ngắn TikTok Thực Chiến'}</span>
          </span>
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> TikTok
          </a>
        </div>
        <div class="video-embed-frame video-vertical">
          <iframe src="https://www.tiktok.com/embed/v2/${ttId}"
            title="TikTok Video Demo"
            allow="encrypted-media;"
            allowfullscreen loading="lazy"></iframe>
        </div>
      </div>
    `;
  }

  // 3. Direct MP4 / WebM video file
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
    return `
      <div class="modal-video-showcase">
        <div class="modal-section-title">
          <i class="fa-solid fa-circle-play text-primary-color"></i>
          <span>${isEn ? 'Project Demo Video' : 'Video Demo Sản Phẩm'}</span>
        </div>
        <div class="video-embed-frame">
          <video src="${url}" controls playsinline preload="metadata"></video>
        </div>
      </div>
    `;
  }

  // 4. Google Drive / Other video link fallback
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (driveMatch) {
    return `
      <div class="modal-video-showcase">
        <div class="modal-section-title">
          <i class="fa-brands fa-google-drive text-primary-color"></i>
          <span>${isEn ? 'Project Video Preview' : 'Video Demo Dự Án (Google Drive)'}</span>
        </div>
        <div class="video-embed-frame">
          <iframe src="https://drive.google.com/file/d/${driveMatch[1]}/preview" allow="autoplay" allowfullscreen loading="lazy"></iframe>
        </div>
      </div>
    `;
  }

  return `
    <div class="modal-video-showcase">
      <div class="modal-section-title" style="justify-content: space-between;">
        <span style="display: inline-flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-circle-play text-primary-color"></i>
          <span>${isEn ? 'External Video Demo' : 'Video Demo Trực Tuyến'}</span>
        </span>
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-play"></i> ${isEn ? 'Watch Video' : 'Mở xem Video'}
        </a>
      </div>
    </div>
  `;
}

function openProjectModal(projectId) {
  currentOpenProjectId = projectId;
  if (!portfolioData || !portfolioData.projects) return;
  const data = portfolioData.projects.find(p => p.id == projectId);
  if (!data) return;
  trackPortfolioEvent('view_project', { project_id: projectId });

  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('project-modal-backdrop');
  const container = document.getElementById('modal-content-container');

  if (!modal || !backdrop || !container) return;

  const isEn = (currentLang === 'en');
  const title = (data.title && (data.title[currentLang] || data.title.vi)) || '';
  const role = (data.roleDetail && (data.roleDetail[currentLang] || data.roleDetail.vi)) || (data.role && (data.role[currentLang] || data.role.vi)) || '';
  const category = (data.category && (data.category[currentLang] || data.category.vi)) || '';
  const badgeProject = (data.badgeProject && (data.badgeProject[currentLang] || data.badgeProject.vi)) || '';
  const overview = (data.overview && (data.overview[currentLang] || data.overview.vi)) || '';
  const duration = (data.duration && (data.duration[currentLang] || data.duration.vi)) || '';
  const teamSize = (data.teamSize && (data.teamSize[currentLang] || data.teamSize.vi)) || '';

  const toolsHtml = (data.tools || []).map(tool => `<span class="tool-pill">${tool}</span>`).join(' ');

  const objectivesHtml = (data.objectives || []).map(item => {
    const text = typeof item === 'object' ? (item[currentLang] || item.vi) : item;
    return `
      <li class="modal-list-item">
        <i class="fa-solid fa-circle-check"></i>
        <span>${text}</span>
      </li>
    `;
  }).join('');

  const contributionsHtml = (data.contributions || []).map(item => {
    const text = typeof item === 'object' ? (item[currentLang] || item.vi) : item;
    return `
      <li class="modal-list-item">
        <i class="fa-solid fa-check text-primary-color"></i>
        <span>${text}</span>
      </li>
    `;
  }).join('');

  const resultsHtml = (data.results || []).map(item => {
    const text = typeof item === 'object' ? (item[currentLang] || item.vi) : item;
    return `
      <li class="modal-list-item">
        <i class="fa-solid fa-star text-orange-color"></i>
        <span><strong>${text}</strong></span>
      </li>
    `;
  }).join('');

  container.innerHTML = `
    <div class="modal-project-header">
      <div class="modal-meta-row">
        <span class="role-badge"><i class="fa-solid fa-crown"></i> ${role}</span>
        <span class="platform-badge">${category}</span>
      </div>
      <h2 class="modal-title" id="modal-title">${title}</h2>
    </div>

    <div class="modal-banner-box" style="background: ${data.bannerImage ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.6)), url('${data.bannerImage}') center/cover` : (data.bannerGradient || 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #ff6b35 100%)')};">
      <i class="${data.watermarkIcon || data.icon || 'fa-solid fa-briefcase'} project-watermark" style="font-size: 6rem; color: rgba(255,255,255,0.2);"></i>
      <div style="position: relative; z-index: 2; text-align: center; color: #ffffff; padding: 20px;">
        <span style="display: inline-block; background: rgba(0,0,0,0.3); backdrop-filter: blur(4px); padding: 6px 16px; border-radius: 9999px; font-weight: 700; font-size: 0.85rem; margin-bottom: 8px;">
          ${badgeProject}
        </span>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #ffffff;">${title}</h3>
      </div>
    </div>

    ${buildVideoEmbedHtml(data.videoUrl, isEn)}

    <div class="modal-grid">
      <!-- Main Content Column -->
      <div class="modal-main-col">
        <div class="modal-section-title">
          <i class="fa-solid fa-circle-info text-primary-color"></i>
          <span>${isEn ? 'Project Overview' : 'Tổng quan dự án'}</span>
        </div>
        <p class="modal-text">${overview}</p>

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
            <span class="info-val">${duration}</span>
          </div>

          <div class="modal-info-item">
            <span class="info-label"><i class="fa-solid fa-users"></i> ${isEn ? 'Team Size:' : 'Quy mô đội nhóm:'}</span>
            <span class="info-val">${teamSize}</span>
          </div>

          <div class="modal-info-item">
            <span class="info-label"><i class="fa-solid fa-user-check"></i> ${isEn ? 'Assigned Role:' : 'Vai trò đảm nhận:'}</span>
            <span class="info-val"><strong>${role}</strong></span>
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
          ${(data.demoUrl || data.videoUrl) ? `
            <a href="${data.demoUrl || data.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm w-100">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
              <span>${isEn ? 'Open Project Demo' : 'Mở liên kết dự án (Demo)'}</span>
            </a>
          ` : `
            <a href="#contact" class="btn btn-primary btn-sm w-100" onclick="closeProjectModal()">
              <i class="fa-solid fa-comments"></i>
              <span>${isEn ? 'Request Full Case Study' : 'Liên hệ xem tài liệu đầy đủ'}</span>
            </a>
          `}
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
   10. ACTIVITY DETAILS MODAL POPUP & DYNAMIC DATA
------------------------------------------------------------------- */
function openActivityModal(activityId) {
  currentOpenActivityId = activityId;
  if (!portfolioData || !portfolioData.activities) return;
  const data = portfolioData.activities.find(a => a.id == activityId);
  if (!data) return;

  const modal = document.getElementById('activity-modal');
  const backdrop = document.getElementById('activity-modal-backdrop');
  const container = document.getElementById('act-modal-content-container');

  if (!modal || !backdrop || !container) return;

  const isEn = (currentLang === 'en');
  const title = (data.title && (data.title[currentLang] || data.title.vi)) || '';
  const role = (data.role && (data.role[currentLang] || data.role.vi)) || '';
  const badgeType = (data.badgeType && (data.badgeType[currentLang] || data.badgeType.vi)) || '';
  const org = typeof data.organization === 'object' ? (data.organization[currentLang] || data.organization.vi) : data.organization;
  const eventOrg = (data.eventOrg && (data.eventOrg[currentLang] || data.eventOrg.vi)) || org;
  const timeLocation = (data.timeLocation && (data.timeLocation[currentLang] || data.timeLocation.vi)) || '';
  const description = (data.description && (data.description[currentLang] || data.description.vi)) || '';
  const subPlaceholder1 = (data.subPlaceholder1 && (data.subPlaceholder1[currentLang] || data.subPlaceholder1.vi)) || '';
  const subPlaceholder2 = (data.subPlaceholder2 && (data.subPlaceholder2[currentLang] || data.subPlaceholder2.vi)) || '';
  const result = (data.result && (data.result[currentLang] || data.result.vi)) || '';

  const tasksHtml = (data.tasks || []).map(item => {
    const text = typeof item === 'object' ? (item[currentLang] || item.vi) : item;
    return `
      <li class="modal-list-item">
        <i class="fa-solid fa-circle-check text-primary-color"></i>
        <span>${text}</span>
      </li>
    `;
  }).join('');

  container.innerHTML = `
    <div class="modal-activity-header">
      <div class="modal-meta-row">
        <span class="act-floating-badge ${data.badgeClass || 'badge-leader'}" style="position: static; display: inline-flex;">
          <i class="${data.badgeIcon || 'fa-solid fa-crown'}"></i> ${badgeType}
        </span>
        <span class="act-org-tag">${org}</span>
      </div>
      <h2 class="modal-title" id="act-modal-title">${title}</h2>
      <div class="modal-subtitle-row">
        <div class="modal-role-highlight">
          <i class="fa-solid fa-user-tie text-primary-color"></i>
          <span><strong>${isEn ? 'Role:' : 'Vai trò:'}</strong> ${role}</span>
        </div>
        <div class="modal-time-highlight">
          <i class="fa-regular fa-calendar-check text-orange-color"></i>
          <span><strong>${isEn ? 'Time & Location:' : 'Thời gian & Địa điểm:'}</strong> ${timeLocation}</span>
        </div>
      </div>
    </div>

    <!-- Overview Box -->
    <div class="act-modal-overview-box">
      <div class="act-modal-overview-grid">
        <div class="act-modal-overview-item">
          <span class="act-overview-label"><i class="fa-solid fa-building text-primary-color"></i> ${isEn ? 'ORGANIZATION / EVENT' : 'ĐƠN VỊ / SỰ KIỆN'}</span>
          <span class="act-overview-value">${eventOrg}</span>
        </div>
        <div class="act-modal-overview-item">
          <span class="act-overview-label"><i class="fa-regular fa-calendar-check text-orange-color"></i> ${isEn ? 'TIME & LOCATION' : 'THỜI GIAN & ĐỊA ĐIỂM'}</span>
          <span class="act-overview-value">${timeLocation}</span>
        </div>
      </div>
      <div class="act-modal-overview-desc">
        <span class="act-overview-label"><i class="fa-solid fa-circle-info text-primary-color"></i> ${isEn ? 'DESCRIPTION & RESPONSIBILITIES' : 'MÔ TẢ ĐÓNG GÓP & TRÁCH NHIỆM'}</span>
        <p class="act-overview-desc-text">${description}</p>
      </div>
    </div>

    <!-- Gallery Box -->
    <div class="act-modal-gallery">
      <div class="act-gallery-main" onclick="openLightbox('${data.mainImage}', '${title.replace(/'/g, "\\'")}')" title="${isEn ? 'Click to enlarge evidence photo' : 'Nhấp vào để phóng to xem rõ ảnh chứng nhận'}">
        <img src="${data.mainImage}" alt="${title}" class="act-modal-main-img">
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

      ${data.gallery && data.gallery.length > 0 ? `
        <div class="modal-gallery-wrapper">
          <div class="modal-section-title">
            <i class="fa-solid fa-images text-primary-color"></i>
            <span>${isEn ? 'Supplementary Evidence Gallery' : 'Bộ sưu tập ảnh minh chứng'} (${data.gallery.length})</span>
          </div>
          <div class="modal-gallery-grid">
            ${data.gallery.map((imgUrl, idx) => `
              <div class="modal-gallery-item" onclick="openLightbox('${imgUrl}', '${title.replace(/'/g, "\\'")} - ${isEn ? 'Photo' : 'Ảnh'} ${idx + 1}')" title="${isEn ? 'Click to enlarge' : 'Nhấp để phóng to ảnh'}">
                <img src="${imgUrl}" alt="${title} ${idx + 1}" onerror="this.src='CV.png'">
                <div class="modal-gallery-item-overlay">
                  <i class="fa-solid fa-magnifying-glass-plus"></i>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : `
        <div class="act-gallery-sub-grid">
          <div class="act-sub-placeholder">
            <div class="placeholder-icon"><i class="fa-solid fa-camera"></i></div>
            <div class="placeholder-text">
              <strong>${subPlaceholder1}</strong>
              <span>${isEn ? 'Pending backstage updates' : 'Khu vực chờ cập nhật ảnh hậu trường'}</span>
            </div>
          </div>
          <div class="act-sub-placeholder">
            <div class="placeholder-icon"><i class="fa-solid fa-images"></i></div>
            <div class="placeholder-text">
              <strong>${subPlaceholder2}</strong>
              <span>${isEn ? 'Pending backstage updates' : 'Khu vực chờ cập nhật ảnh hậu trường'}</span>
            </div>
          </div>
        </div>
      `}
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
          <p class="result-text">${result}</p>
        </div>
      </div>
    </div>

    <div class="modal-actions">
      <button type="button" class="btn btn-outline btn-sm" onclick="openLightbox('${data.mainImage}', '${title.replace(/'/g, "\\'")}')">
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
   11. CERTIFICATE DETAILS MODAL POPUP & DYNAMIC DATA
------------------------------------------------------------------- */
function openCertificateModal(certId) {
  currentOpenCertId = certId;
  if (!portfolioData || !portfolioData.certificates) return;
  const data = portfolioData.certificates.find(c => c.id == certId);
  if (!data) return;

  const modal = document.getElementById('certificate-modal');
  const backdrop = document.getElementById('certificate-modal-backdrop');
  const container = document.getElementById('cert-modal-content-container');

  if (!modal || !backdrop || !container) return;

  const isEn = (currentLang === 'en');
  const title = (data.title && (data.title[currentLang] || data.title.vi)) || '';
  const award = (data.award && (data.award[currentLang] || data.award.vi)) || '';
  const org = (data.organization && (data.organization[currentLang] || data.organization.vi)) || '';
  const timeLocation = (data.timeLocation && (data.timeLocation[currentLang] || data.timeLocation.vi)) || '';
  const badgeType = (data.badgeType && (data.badgeType[currentLang] || data.badgeType.vi)) || '';
  const description = (data.description && (data.description[currentLang] || data.description.vi)) || '';
  const result = (data.result && (data.result[currentLang] || data.result.vi)) || '';

  const metaGridHtml = (data.metaItems || []).map(item => {
    const labelText = typeof item.label === 'object' ? (item.label[currentLang] || item.label.vi) : item.label;
    return `
      <div class="act-modal-overview-item">
        <span class="act-overview-label"><i class="fa-solid fa-check text-primary-color"></i> ${labelText.toUpperCase()}</span>
        <span class="act-overview-value ${item.isHighlight ? 'code-highlight' : ''}">${item.val}</span>
      </div>
    `;
  }).join('');

  const tagsHtml = (data.tags || []).map(tag => `
    <span class="cert-tag"><i class="fa-solid fa-check"></i> ${tag}</span>
  `).join('');

  const tasksHtml = (data.tasks || []).map(item => {
    const text = typeof item === 'object' ? (item[currentLang] || item.vi) : item;
    return `
      <li class="modal-list-item">
        <i class="fa-solid fa-circle-check text-primary-color"></i>
        <span>${text}</span>
      </li>
    `;
  }).join('');

  container.innerHTML = `
    <div class="modal-activity-header">
      <div class="modal-meta-row">
        <span class="act-floating-badge ${data.badgeClass || 'badge-trophy'}" style="position: static; display: inline-flex; ${data.badgeStyle || ''}">
          <i class="${data.badgeIcon || 'fa-solid fa-award'}"></i> ${badgeType}
        </span>
        <span class="act-org-tag"><i class="${data.orgIcon || 'fa-solid fa-building'}"></i> ${org}</span>
      </div>
      <h2 class="modal-title" id="cert-modal-title">${title}</h2>
      <div class="modal-subtitle-row">
        <div class="modal-role-highlight">
          <i class="fa-solid fa-trophy text-primary-color"></i>
          <span><strong>${isEn ? 'Achievement / Honor:' : 'Thành tích / Danh hiệu:'}</strong> ${award}</span>
        </div>
        <div class="modal-time-highlight">
          <i class="fa-regular fa-calendar-check text-orange-color"></i>
          <span><strong>${isEn ? 'Time & Organization:' : 'Thời gian & Đơn vị:'}</strong> ${timeLocation}</span>
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
        <p class="act-overview-desc-text">${description}</p>
      </div>
      <div class="cert-skills-tags" style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border-color); margin-bottom: 0;">
        ${tagsHtml}
      </div>
    </div>

    <!-- Main Certificate Preview Frame -->
    <div class="cert-modal-view-frame" onclick="openLightbox('${data.mainImage}', '${title.replace(/'/g, "\\'")}')" title="${isEn ? 'Click to enlarge certificate' : 'Nhấp vào để phóng to xem rõ chứng nhận'}">
      <img src="${data.mainImage}" alt="${title}" class="cert-modal-img">
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

    ${data.gallery && data.gallery.length > 0 ? `
      <div class="modal-gallery-wrapper">
        <div class="modal-section-title">
          <i class="fa-solid fa-images text-primary-color"></i>
          <span>${isEn ? 'Supplementary Certificate Gallery' : 'Bộ sưu tập ảnh minh chứng'} (${data.gallery.length})</span>
        </div>
        <div class="modal-gallery-grid">
          ${data.gallery.map((imgUrl, idx) => `
            <div class="modal-gallery-item" onclick="openLightbox('${imgUrl}', '${title.replace(/'/g, "\\'")} - ${isEn ? 'Image' : 'Ảnh'} ${idx + 1}')" title="${isEn ? 'Click to enlarge' : 'Nhấp để phóng to ảnh'}">
              <img src="${imgUrl}" alt="${title} ${idx + 1}" onerror="this.src='CV.png'">
              <div class="modal-gallery-item-overlay">
                <i class="fa-solid fa-magnifying-glass-plus"></i>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

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
          <p class="result-text">${result}</p>
        </div>
      </div>
    </div>

    <!-- Modal Actions -->
    <div class="modal-actions" style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end;">
      <button type="button" class="btn btn-primary btn-sm" onclick="openLightbox('${data.mainImage}', '${title.replace(/'/g, "\\'")}')">
        <i class="fa-solid fa-expand"></i> ${isEn ? 'Enlarge Image' : 'Phóng to ảnh'}
      </button>
      <a href="${data.mainImage}" download="${data.downloadName || 'certificate.jpg'}" class="btn btn-outline btn-sm">
        <i class="fa-solid fa-download"></i> ${isEn ? 'Download Image' : 'Tải ảnh về máy'}
      </a>
      ${data.externalUrl ? `
        <a href="${data.externalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" title="${data.externalTitle || ''}">
          <i class="${data.externalIcon || 'fa-solid fa-arrow-up-right-from-square'}"></i> ${data.externalText || (isEn ? 'Learn More' : 'Xem thêm')}
        </a>
      ` : ''}
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


/* -------------------------------------------------------------------
   14. DIGITAL BUSINESS CARD (vCard QR) & CV PDF MODAL
------------------------------------------------------------------- */
function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Đỗ;Minh Trí;;;',
    'FN:Đỗ Minh Trí (Eric Do)',
    'TITLE:Business & Digital Marketing | AI Agent Solutions',
    'ORG:BTEC FPT Đà Nẵng',
    'TEL;TYPE=CELL,VOICE:0934454099',
    'EMAIL;TYPE=PREF,INTERNET:dominhtri2206@gmail.com',
    'URL:https://dominhtri.id.vn/',
    'ADR;TYPE=WORK:;;Đà Nẵng;;;Vietnam',
    'NOTE:Á Quân Chân Trần Khởi Nghiệp Mùa 3 • Top 35 FPT Biz Talent • Tốt nghiệp Xuất Sắc Digital Marketing',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'DoMinhTri_Eric.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function openBusinessCardModal() {
  const modal = document.getElementById('business-card-modal');
  const backdrop = document.getElementById('business-card-backdrop');
  if (modal && backdrop) {
    modal.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeBusinessCardModal() {
  const modal = document.getElementById('business-card-modal');
  const backdrop = document.getElementById('business-card-backdrop');
  if (modal && backdrop) {
    modal.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openCvPreviewModal() {
  const modal = document.getElementById('cv-preview-modal');
  const backdrop = document.getElementById('cv-preview-backdrop');
  if (modal && backdrop) {
    modal.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCvPreviewModal() {
  const modal = document.getElementById('cv-preview-modal');
  const backdrop = document.getElementById('cv-preview-backdrop');
  if (modal && backdrop) {
    modal.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}
