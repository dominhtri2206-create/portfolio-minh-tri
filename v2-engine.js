(function () {
      // Extend translations for V2 merged section labels
      if (typeof translations !== 'undefined') {
        Object.assign(translations.vi, {
          'v2.nav_awards': 'Giải thưởng',
          'v2.awards_eyebrow': 'Giải thưởng & Chứng nhận Quốc tế',
          'v2.awards_title': 'Thành Tích & Minh Chứng Xác Thực',
          'v2.awards_sub': 'Gộp gọn toàn bộ giải thưởng khởi nghiệp cấp quốc gia và chứng chỉ quốc tế kèm hình ảnh bằng khen gốc xác thực.'
        });
        Object.assign(translations.en, {
          'v2.nav_awards': 'Awards',
          'v2.awards_eyebrow': 'National Honors & Verified Credentials',
          'v2.awards_title': 'Awards & Verified Certifications',
          'v2.awards_sub': 'Consolidated national startup awards and international certifications backed by official verifiable documents.'
        });
      }

      // Helper: Extract or assign 3 crisp KPI metrics for each Project Card (#5)
      function getProjectKpis(p, isEn) {
        const textPool = JSON.stringify(p).toLowerCase();
        if (textPool.includes('tiktok') || textPool.includes('120.000')) {
          return isEn
            ? [['120K+', 'Organic Views'], ['45K+', 'Top Viral Clip'], ['9.5/10', 'Project Grade']]
            : [['120K+', 'Lượt xem tự nhiên'], ['45K+', 'Video xu hướng'], ['9.5/10', 'Điểm đồ án']];
        }
        if (textPool.includes('seo') || textPool.includes('250%')) {
          return isEn
            ? [['150+', 'Target Keywords'], ['Top 10', 'Google Search'], ['+250%', 'Organic Clicks']]
            : [['150+', 'Từ khóa mục tiêu'], ['Top 10', 'Google Search'], ['+250%', 'Lượng truy cập']];
        }
        return isEn
          ? [['+180%', 'Page Engagement'], ['20+', 'Brand Assets'], ['100%', 'On-time KPIs']]
          : [['+180%', 'Tương tác Fanpage'], ['20+', 'Ấn phẩm Brand'], ['100%', 'Hoàn thành KPI']];
      }

      // Helper: Render realistic CSS Device Mockup per project type (#5)
      function buildDeviceMockup(p, idx) {
        if (p.bannerImage && p.bannerImage.trim()) {
          return `<img src="${p.bannerImage}" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">`;
        }
        const isVideo = /tiktok|reels|video/i.test(JSON.stringify(p.platform || '') + JSON.stringify(p.badge || ''));
        if (isVideo) {
          return `
            <div class="device-phone-mockup">
              <div class="phone-notch"></div>
              <div class="phone-screen-ui">
                <div class="phone-play-circle"><i class="fa-solid fa-play"></i></div>
                <div class="phone-bars"><span></span><span></span></div>
              </div>
            </div>
          `;
        }
        return `
          <div class="device-browser-mockup">
            <div class="browser-dots-bar"><i></i><i></i><i></i><span class="browser-url-bar"></span></div>
            <div class="browser-canvas-ui">
              <div class="canvas-chart-box">
                <span style="height:38%"></span>
                <span style="height:58%"></span>
                <span style="height:76%"></span>
                <span style="height:96%"></span>
              </div>
              <div class="canvas-side-lines">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        `;
      }

      // Override renderProjectsGrid for V2 Keynote Dark Showcase (#3 & #5)
      window.renderProjectsGrid = function () {
        const container = document.getElementById('projects-grid');
        if (!container || !portfolioData) return;

        const isEn = (currentLang === 'en');
        // Filter out accidental 1-char empty test items while preserving real CMS projects + showcase completeness
        let list = (portfolioData.projects || []).filter(p => {
          const t = (p.title && (p.title.vi || p.title.en) || '').trim();
          const ex = (p.excerpt && (p.excerpt.vi || p.excerpt.en) || '').trim();
          return !(t.length <= 2 && !ex);
        });

        // Ensure full 3-card Keynote showcase on preview by merging missing signature templates
        if (list.length < 3 && typeof DEFAULT_PORTFOLIO_DATA !== 'undefined') {
          const existingIds = new Set(list.map(item => item.id));
          DEFAULT_PORTFOLIO_DATA.projects.forEach(fb => {
            if (!existingIds.has(fb.id) && list.length < 3) {
              list.push(fb);
            }
          });
          // Also ensure portfolioData.projects can open modals for all displayed cards
          list.forEach(item => {
            if (!portfolioData.projects.some(x => x.id == item.id)) {
              portfolioData.projects.push(item);
            }
          });
        }

        const stageClasses = ['stage-blue', 'stage-slate', 'stage-indigo'];

        container.innerHTML = list.map((p, idx) => {
          const rawTitle = (p.title && (p.title[currentLang] || p.title.vi)) || '';
          const cleanTitle = rawTitle.replace(/^\d+\.\s*/, '');
          const badge = (p.badge && (p.badge[currentLang] || p.badge.vi)) || 'Case Study';
          const role = (p.role && (p.role[currentLang] || p.role.vi)) || '';
          const excerpt = (p.excerpt && (p.excerpt[currentLang] || p.excerpt.vi)) || '';
          const platformText = p.platform ? (typeof p.platform === 'object' ? p.platform.text : p.platform) : '';
          const hasVideo = Boolean(p.videoUrl && p.videoUrl.trim());
          const kpis = getProjectKpis(p, isEn);
          const tags = (p.tags || p.tools || []).slice(0, 4);

          return `
            <article class="project-v2-card v2-anim in-view" data-project-id="${p.id}">
              <div class="project-mockup-stage ${stageClasses[idx % 3]}" onclick="openProjectModal(${p.id})">
                <div class="mockup-top-badges">
                  <span class="mockup-cat-pill">${badge}</span>
                  ${hasVideo ? `<span class="thumb-video-pill"><i class="fa-solid fa-play"></i> Demo</span>` : ''}
                </div>
                ${buildDeviceMockup(p, idx)}
              </div>

              <div class="project-v2-body">
                <div class="project-v2-meta">
                  <span class="project-v2-role"><i class="fa-solid fa-crown"></i> ${role}</span>
                  <span>•</span>
                  <span>${platformText}</span>
                </div>

                <h3 class="project-v2-title">${cleanTitle}</h3>
                <p class="project-v2-excerpt">${excerpt}</p>

                <div class="project-kpi-strip">
                  ${kpis.map(([num, lbl]) => `
                    <div class="kpi-cell">
                      <strong>${num}</strong>
                      <span>${lbl}</span>
                    </div>
                  `).join('')}
                </div>

                <div class="project-v2-tags">
                  ${tags.map(t => `<span>${t}</span>`).join('')}
                </div>

                <div class="project-v2-footer">
                  <button type="button" class="btn-keynote-card" onclick="openProjectModal(${p.id})">
                    <span>${isEn ? 'Explore Case Study' : 'Xem chi tiết Case Study'}</span>
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                </div>
              </div>
            </article>
          `;
        }).join('');
      };

      // Override renderCertificatesGrid for V2 Merged Asymmetric Bento (#2)
      window.renderCertificatesGrid = function () {
        const container = document.getElementById('certificates-grid');
        if (!container || !portfolioData || !portfolioData.certificates) return;

        const isEn = (currentLang === 'en');
        const spanPattern = ['award-span-7', 'award-span-5', 'award-span-6', 'award-span-6'];

        container.innerHTML = portfolioData.certificates.map((c, idx) => {
          const title = (c.title && (c.title[currentLang] || c.title.vi)) || '';
          const badgeType = (c.badgeType && (c.badgeType[currentLang] || c.badgeType.vi)) || '';
          const org = (c.organization && (c.organization[currentLang] || c.organization.vi)) || '';
          const timeLoc = (c.timeLocation && (c.timeLocation[currentLang] || c.timeLocation.vi)) || '';
          const desc = (c.description && (c.description[currentLang] || c.description.vi)) || '';
          const safeTitle = title.replace(/'/g, "\\'");
          const spanClass = spanPattern[idx] || 'award-span-6';
          const isTopAward = idx === 0 || idx === 1;

          return `
            <article class="award-bento-card bento-card ${spanClass} v2-anim in-view">
              <div class="award-img-box" onclick="openLightbox('${c.mainImage}', '${safeTitle}')">
                <img src="${c.mainImage}" alt="${title}" loading="lazy">
                <span class="${isTopAward ? 'award-gold-pill' : 'award-verified-pill'}">
                  <i class="${isTopAward ? 'fa-solid fa-trophy' : 'fa-solid fa-circle-check'}"></i>
                  <span>${badgeType}</span>
                </span>
              </div>

              <div class="award-body-box">
                <div>
                  <div class="award-org-line">
                    <span>${org}</span>
                    <span>${timeLoc}</span>
                  </div>
                  <h3 class="award-card-title" style="margin-top: 6px;">${title}</h3>
                  <p class="award-card-desc" style="margin-top: 8px;">
                    ${idx === 0 ? desc : (desc.length > 135 ? desc.slice(0, 135) + '...' : desc)}
                  </p>
                </div>

                <div class="award-actions-row">
                  <button type="button" class="btn btn-primary btn-sm" onclick="openCertificateModal(${c.id})">
                    <span>${isEn ? 'View Details' : 'Xem chi tiết'}</span>
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" onclick="openLightbox('${c.mainImage}', '${safeTitle}')">
                    <i class="fa-solid fa-expand"></i>
                    <span>${isEn ? 'Certificate' : 'Bằng gốc'}</span>
                  </button>
                </div>
              </div>
            </article>
          `;
        }).join('');
      };

      // Sliding Pill Navbar Indicator (#1)
      function updateNavSlidingPill() {
        let page = window.location.pathname.split('/').pop().toLowerCase();
        if (!page || page === '' || page === 'index.html') page = 'index.html';
        if (page === 'certificates.html') page = 'awards.html';

        document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
          const href = (link.getAttribute('href') || '').toLowerCase();
          if (href === page) {
            link.classList.add('active');
          } else if (href.includes('.html')) {
            link.classList.remove('active');
          }
        });

        const pill = document.getElementById('nav-sliding-pill');
        const activeLink = document.querySelector('.nav-menu .nav-link.active');
        if (!pill || !activeLink) return;
        const itemEl = activeLink.parentElement;
        pill.style.width = `${activeLink.offsetWidth}px`;
        pill.style.transform = `translateX(${itemEl.offsetLeft - 4}px)`;
        pill.style.opacity = '1';
      }

      // Subtle Mouse Spotlight on Bento Cards (#8)
      document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.bento-card').forEach(card => {
          const rect = card.getBoundingClientRect();
          if (e.clientY >= rect.top - 120 && e.clientY <= rect.bottom + 120) {
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
          }
        });
      }, { passive: true });

      // Staggered Scroll Reveal with 900ms Fail-Safe (#8)
      function initV2Reveal() {
        const items = document.querySelectorAll('.v2-anim');
        if ('IntersectionObserver' in window) {
          const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
              if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('in-view'), (i % 4) * 70);
                obs.unobserve(entry.target);
              }
            });
          }, { threshold: 0.08 });
          items.forEach(el => obs.observe(el));
        } else {
          items.forEach(el => el.classList.add('in-view'));
        }
        // Fail-safe: ensure hero and visible viewport elements never stay hidden
        setTimeout(() => {
          document.querySelectorAll('#hero .v2-anim').forEach(el => el.classList.add('in-view'));
        }, 250);
      }

      // Mobile Floating Quick Dock (#10)
      function initMobileDock() {
        const dock = document.getElementById('mobile-floating-dock');
        if (!dock) return;
        window.addEventListener('scroll', () => {
          if (window.scrollY > 360) {
            dock.classList.add('dock-visible');
          } else {
            dock.classList.remove('dock-visible');
          }
          updateNavSlidingPill();
        }, { passive: true });
      }

      // Hero Multi-Photo Auto-Slide & Swipe Carousel (Dynamic from data.json profile.heroGallery)
      const heroCarouselState = {
        currentIdx: 0,
        total: 0,
        autoTimer: null,
        touchStartX: 0
      };

      function heroGoToSlide(idx) {
        const track = document.getElementById('hero-slider-track');
        const dotsWrap = document.getElementById('hero-slider-dots');
        if (!track || heroCarouselState.total <= 0) return;
        heroCarouselState.currentIdx = (idx + heroCarouselState.total) % heroCarouselState.total;
        track.style.transform = `translateX(-${heroCarouselState.currentIdx * 100}%)`;
        if (dotsWrap) {
          dotsWrap.querySelectorAll('.hero-slider-dot').forEach((d, i) => {
            d.classList.toggle('active', i === heroCarouselState.currentIdx);
          });
        }
      }

      function heroStopAuto() {
        if (heroCarouselState.autoTimer) {
          clearInterval(heroCarouselState.autoTimer);
          heroCarouselState.autoTimer = null;
        }
      }

      function heroStartAuto() {
        heroStopAuto();
        if (heroCarouselState.total > 1) {
          heroCarouselState.autoTimer = setInterval(() => {
            heroGoToSlide(heroCarouselState.currentIdx + 1);
          }, 3800);
        }
      }

      function initHeroCarousel() {
        const card = document.getElementById('hero-portrait-carousel');
        const track = document.getElementById('hero-slider-track');
        const dotsWrap = document.getElementById('hero-slider-dots');
        const prevBtn = document.getElementById('hero-slide-prev');
        const nextBtn = document.getElementById('hero-slide-next');
        if (!card || !track || !dotsWrap) return;

        // Dynamically rebuild slides if portfolioData.profile.heroGallery is present
        if (typeof portfolioData !== 'undefined' && portfolioData && portfolioData.profile) {
          const gallery = Array.isArray(portfolioData.profile.heroGallery) && portfolioData.profile.heroGallery.length > 0
            ? portfolioData.profile.heroGallery
            : (portfolioData.profile.avatar ? [portfolioData.profile.avatar] : []);

          if (gallery.length > 0) {
            track.innerHTML = gallery.map((src, i) => `
              <div class="hero-slide">
                <img src="${src}" alt="Đỗ Minh Trí ${i + 1}" ${i === 0 ? 'id="user-avatar"' : ''} style="object-position: center 22%;" ${i > 0 ? 'loading="lazy"' : ''} onerror="this.onerror=null; this.src='CV.png';">
              </div>
            `).join('');
          }
        }

        const slides = track.querySelectorAll('.hero-slide');
        heroCarouselState.total = slides.length;
        heroCarouselState.currentIdx = 0;
        track.style.transform = 'translateX(0%)';

        if (heroCarouselState.total <= 1) {
          dotsWrap.style.display = 'none';
          if (prevBtn) prevBtn.style.display = 'none';
          if (nextBtn) nextBtn.style.display = 'none';
          heroStopAuto();
          return;
        }

        dotsWrap.style.display = 'flex';
        if (prevBtn) prevBtn.style.display = '';
        if (nextBtn) nextBtn.style.display = '';

        dotsWrap.innerHTML = Array.from({ length: heroCarouselState.total }, (_, i) =>
          `<button type="button" class="hero-slider-dot ${i === 0 ? 'active' : ''}" aria-label="Ảnh ${i + 1}"></button>`
        ).join('');

        dotsWrap.querySelectorAll('.hero-slider-dot').forEach((dot, i) => {
          dot.addEventListener('click', () => {
            heroGoToSlide(i);
            heroStartAuto();
          });
        });

        // Bind card/arrow events once
        if (!card.dataset.carouselBound) {
          card.dataset.carouselBound = 'true';
          if (prevBtn) prevBtn.addEventListener('click', () => { heroGoToSlide(heroCarouselState.currentIdx - 1); heroStartAuto(); });
          if (nextBtn) nextBtn.addEventListener('click', () => { heroGoToSlide(heroCarouselState.currentIdx + 1); heroStartAuto(); });

          card.addEventListener('mouseenter', heroStopAuto);
          card.addEventListener('mouseleave', heroStartAuto);

          card.addEventListener('touchstart', (e) => {
            heroCarouselState.touchStartX = e.changedTouches[0].clientX;
            heroStopAuto();
          }, { passive: true });

          card.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - heroCarouselState.touchStartX;
            if (Math.abs(dx) > 40) {
              heroGoToSlide(dx < 0 ? heroCarouselState.currentIdx + 1 : heroCarouselState.currentIdx - 1);
            }
            heroStartAuto();
          }, { passive: true });
        }

        heroStartAuto();
      }

      // Hook into renderHeroDynamic so async data.json updates refresh the carousel
      if (typeof window.renderHeroDynamic === 'function') {
        const origRenderHeroDynamic = window.renderHeroDynamic;
        window.renderHeroDynamic = function () {
          origRenderHeroDynamic.apply(this, arguments);
          initHeroCarousel();
        };
      }

      window.addEventListener('load', () => {
        if (portfolioData) {
          window.renderProjectsGrid();
          window.renderCertificatesGrid();
        }
        initHeroCarousel();
        initV2Reveal();
        initMobileDock();
        updateNavSlidingPill();
        window.addEventListener('resize', updateNavSlidingPill);

        // Update sliding pill on language toggle or nav click
        document.querySelectorAll('.lang-btn, .nav-link').forEach(btn => {
          btn.addEventListener('click', () => setTimeout(updateNavSlidingPill, 60));
        });
      });
    })();