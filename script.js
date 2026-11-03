// DATA LOAD
let videos = JSON.parse(localStorage.getItem('maruf_all_videos') || '[]');
let photos = JSON.parse(localStorage.getItem('maruf_all_photos') || '[]');
let contacts = JSON.parse(localStorage.getItem('maruf_contacts_new') || '[]');

if (videos.length === 0) {
  videos = [{
    title: 'My Showreel',
    cat: 'MOTION GRAPHICS',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }];
}

// FIXED getId - 100% WORKING
function getId(url) {
  url = url.trim();
  try {
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0].split('&')[0].split('/')[0];
    }
    let u = new URL(url);
    if (u.searchParams.get('v')) {
      return u.searchParams.get('v');
    }
    let m = url.match(/\/(embed|shorts)\/([^?&\/]+)/);
    if (m) return m[2];
    return url;
  } catch {
    let m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
    return m ? m[1] : url;
  }
}

function getIconClass(type) {
  const map = {
    phone: 'fa-solid fa-phone',
    whatsapp: 'fa-brands fa-whatsapp',
    facebook: 'fa-brands fa-facebook-f',
    instagram: 'fa-brands fa-instagram',
    gmail: 'fa-solid fa-envelope',
    youtube: 'fa-brands fa-youtube',
    tiktok: 'fa-brands fa-tiktok',
    telegram: 'fa-brands fa-telegram',
    linkedin: 'fa-brands fa-linkedin-in',
    behance: 'fa-brands fa-behance',
    website: 'fa-solid fa-globe'
  };
  return map[type] || 'fa-solid fa-link';
}

function switchAdminTab(tab) {
  document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('atab-' + tab).classList.add('active');
  document.getElementById('apanel-' + tab).classList.add('active');
}

function render() {
  let g = document.getElementById('videoGrid');
  g.innerHTML = '';
  videos.forEach((v, i) => {
    let id = getId(v.link);
    let thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    g.innerHTML += `<div class="vcard" id="card-${i}"><button class="v-exit-full-btn" onclick="exitFullscreenVideo()"><i class="fa-solid fa-compress"></i> Exit ✕</button><div class="vthumb" id="thumb-${i}" onclick="playInline(${i},'${id}')"><img class="thumb" src="${thumb}" onerror="this.src='https://img.youtube.com/vi/${id}/mqdefault.jpg'"><div class="play-overlay"><div class="play-btn">▶</div></div></div><button class="v-full-btn" onclick="fullscreenVideo(${i})"><i class="fa-solid fa-expand"></i> Fullscreen</button><div class="vinfo" style="padding:12px"><h4 style="font-size:14px"><span style="color:#FFC94A">${i + 1}.</span> ${v.title || 'Video'}</h4><p style="color:#666;font-size:11px">${v.cat || ''}</p></div></div>`;
  });

  let pg = document.getElementById('photoGrid');
  pg.innerHTML = '';
  photos.forEach((p, i) => {
    pg.innerHTML += `<div class="pcard" onclick="openPhotoLightbox(${i})"><div style="position:absolute;top:6px;left:6px;background:#FFC94A;color:#000;font-weight:800;font-size:11px;padding:3px 9px;border-radius:50%;z-index:2">${i + 1}</div><img src="${p}"></div>`;
  });

  let cl = document.getElementById('contactList');
  cl.innerHTML = '';
  contacts.forEach((c, i) => {
    let iconClass = getIconClass(c.type);
    cl.innerHTML += `<div class="c-row" onclick="openContactLink(${i})"><div class="c-icon ${c.type}"><i class="${iconClass}"></i></div><div class="c-text"><small>${i + 1}. ${c.label || c.type}</small><b>${c.value}</b></div></div>`;
  });

  let l = document.getElementById('adminVideoList');
  l.innerHTML = '';
  videos.forEach((v, i) => {
    l.innerHTML += `<div class="admin-card"><div style="display:flex;align-items:center;gap:8px"><span class="badge-num">${i + 1}</span><div style="flex:1"><b style="color:#fff;font-size:11px">${v.title || 'Untitled'}</b></div><button class="btn-move" onclick="moveVideo(${i},-1)">⬆️</button><button class="btn-move" onclick="moveVideo(${i},1)">⬇️</button><button class="btn-del" onclick="deleteVideo(${i})">DEL</button></div></div>`;
  });

  let pl = document.getElementById('adminPhotoList');
  pl.innerHTML = '';
  photos.forEach((p, i) => {
    pl.innerHTML += `<div class="admin-card"><div style="display:flex;align-items:center;gap:8px"><span class="badge-num">${i + 1}</span><img src="${p}" style="width:52px;height:38px;object-fit:cover;border-radius:6px"><div style="flex:1;color:#888;font-size:10px">Graphics #${i + 1}</div><button class="btn-move" onclick="movePhoto(${i},-1)">⬆️</button><button class="btn-move" onclick="movePhoto(${i},1)">⬇️</button><button class="btn-del" onclick="deletePhoto(${i})">DEL</button></div></div>`;
  });

  let acl = document.getElementById('adminContactList');
  acl.innerHTML = '';
  contacts.forEach((c, i) => {
    acl.innerHTML += `<div class="admin-card"><div style="display:flex;align-items:center;gap:8px"><span class="badge-num">${i + 1}</span><div style="flex:1"><b style="color:#fff;font-size:11px">${c.label || c.type}</b></div><button class="btn-move" onclick="moveContact(${i},-1)">⬆️</button><button class="btn-move" onclick="moveContact(${i},1)">⬇️</button><button class="btn-del" onclick="deleteContact(${i})">DEL</button></div></div>`;
  });

  localStorage.setItem('maruf_all_videos', JSON.stringify(videos));
  localStorage.setItem('maruf_all_photos', JSON.stringify(photos));
  localStorage.setItem('maruf_contacts_new', JSON.stringify(contacts));
}

// FIXED VIDEO PLAY - EKTA CHOLLE AREKTA BANDHO
function stopAllVideos() {
  videos.forEach((v, i) => {
    let card = document.getElementById(`card-${i}`);
    if (card && card.classList.contains('playing')) {
      let id = getId(v.link);
      let thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
      document.getElementById(`thumb-${i}`).innerHTML = `<img class="thumb" src="${thumb}"><div class="play-overlay"><div class="play-btn">▶</div></div>`;
      card.classList.remove('playing');
    }
  });
}

function playInline(i, id) {
  stopAllVideos();
  let el = document.getElementById(`thumb-${i}`);
  el.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080" allow="autoplay; fullscreen; encrypted-media" allowfullscreen></iframe>`;
  document.getElementById(`card-${i}`).classList.add('playing');
}

function fullscreenVideo(i) {
  let card = document.getElementById(`card-${i}`);
  if (!card) return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    card.requestFullscreen().catch(() => {});
  }
}

function exitFullscreenVideo() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

let currentPhotoIndex = 0;

function openPhotoLightbox(i) {
  currentPhotoIndex = i;
  document.getElementById('lightboxImg').src = photos[i];
  document.getElementById('photoLightbox').classList.add('active');
}

function closePhotoLightbox() {
  document.getElementById('photoLightbox').classList.remove('active');
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  document.getElementById('lightboxImg').src = photos[currentPhotoIndex];
}

function prevPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
  document.getElementById('lightboxImg').src = photos[currentPhotoIndex];
}

function addVideo() {
  let lk = document.getElementById('vLink').value.trim();
  if (!lk) {
    alert('Link দাও মামা');
    return;
  }
  let t = document.getElementById('vTitle').value.trim();
  let c = document.getElementById('vCat').value.trim();
  if (!t) t = `Video ${videos.length + 1}`;
  videos.unshift({ title: t, cat: c, link: lk });
  render();
  document.getElementById('vTitle').value = '';
  document.getElementById('vLink').value = '';
  document.getElementById('vCat').value = '';
}

function addPhoto() {
  let files = document.getElementById('photoInput').files;
  if (!files.length) {
    alert('ফটো সিলেক্ট করো');
    return;
  }
  let loaded = 0;
  Array.from(files).forEach(file => {
    let r = new FileReader();
    r.onload = e => {
      let img = new Image();
      img.onload = () => {
        let canvas = document.createElement('canvas');
        let maxW = 1200;
        let scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        photos.unshift(canvas.toDataURL('image/jpeg', 0.75));
        loaded++;
        if (loaded === files.length) render();
      };
      img.src = e.target.result;
    };
    r.readAsDataURL(file);
  });
  setTimeout(() => render(), 1000);
}

function changeProfile() {
  let file = document.getElementById('profileInput').files[0];
  if (!file) {
    alert('ছবি সিলেক্ট');
    return;
  }
  let r = new FileReader();
  r.onload = e => {
    document.getElementById('profileImg').src = e.target.result;
    localStorage.setItem('maruf_profile', e.target.result);
    alert('Profile Changed!');
  };
  r.readAsDataURL(file);
}

function addContact() {
  let type = document.getElementById('cType').value;
  let label = document.getElementById('cLabel').value.trim();
  let value = document.getElementById('cValue').value.trim();
  if (!value) {
    alert('Value দাও');
    return;
  }
  if (!label) label = type;
  if (type !== 'phone' && type !== 'whatsapp' && type !== 'gmail') {
    if (!value.startsWith('http')) value = 'https://' + value;
  }
  contacts.push({ type, label, value });
  render();
  document.getElementById('cLabel').value = '';
  document.getElementById('cValue').value = '';
}

function openContactLink(i) {
  let c = contacts[i];
  let v = c.value.trim();
  if (c.type === 'phone') {
    window.location.href = `tel:${v}`;
  } else if (c.type === 'whatsapp') {
    let wa = v.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${wa}`, '_blank');
  } else if (c.type === 'gmail') {
    window.location.href = `mailto:${v}`;
  } else {
    window.open(v, '_blank');
  }
}

function scrollToSec(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function moveVideo(i, d) {
  let ni = i + d;
  if (ni < 0 || ni >= videos.length) return;
  let it = videos.splice(i, 1)[0];
  videos.splice(ni, 0, it);
  render();
}

function movePhoto(i, d) {
  let ni = i + d;
  if (ni < 0 || ni >= photos.length) return;
  let it = photos.splice(i, 1)[0];
  photos.splice(ni, 0, it);
  render();
}

function moveContact(i, d) {
  let ni = i + d;
  if (ni < 0 || ni >= contacts.length) return;
  let it = contacts.splice(i, 1)[0];
  contacts.splice(ni, 0, it);
  render();
}

function deleteVideo(i) {
  if (confirm('Delete?')) {
    videos.splice(i, 1);
    render();
  }
}

function deletePhoto(i) {
  if (confirm('Delete?')) {
    photos.splice(i, 1);
    render();
  }
}

function deleteContact(i) {
  if (confirm('Delete?')) {
    contacts.splice(i, 1);
    render();
  }
}

function togglePass() {
  let inp = document.getElementById('adminPass');
  let btn = document.getElementById('eyeBtn');
  if (inp.type === 'password') {
    inp.type = 'text';
    btn.innerText = '🙈';
  } else {
    inp.type = 'password';
    btn.innerText = '👁️';
  }
}

function openAdminLogin() {
  document.getElementById('adminLoginModal').classList.add('active');
}

function closeAdminLogin() {
  document.getElementById('adminLoginModal').classList.remove('active');
  document.getElementById('adminPass').value = '';
  // URL থেকে #admin বা /admin সরিয়ে নরমাল URL করে দেওয়ার জন্য
  if (window.location.hash === '#admin') {
    history.replaceState(null, null, window.location.pathname);
  }
}

function checkAdminPass() {
  let pass = document.getElementById('adminPass').value.trim();
  if (pass === 'marufariyan421') {
    closeAdminLogin();
    document.getElementById('adminSide').classList.add('active');
    document.body.classList.add('admin-active');
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

function closeAdminPanel() {
  document.getElementById('adminSide').classList.remove('active');
  document.body.classList.remove('admin-active');
  if (window.location.pathname.endsWith('/admin') || window.location.hash === '#admin') {
    history.replaceState(null, null, '/');
  }
}

// URL চেক করে "/admin", "#admin" বা "?admin" থাকলে লগইন বক্স ওপেন করবে
function checkAdminRoute() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path.endsWith('/admin') || path.endsWith('/admin/') || hash === '#admin' || search === '?admin') {
    openAdminLogin();
  }
}

// URL পরিবর্তন হলে বা হ্যাশ চেঞ্জ হলে চেক করবে
window.addEventListener('hashchange', checkAdminRoute);

// বোনাস: কিবোর্ডে Ctrl + Shift + A চাপলেও অ্যাডমিন লগইন ওপেন হবে
window.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    openAdminLogin();
  }
});

(function init() {
  let prof = localStorage.getItem('maruf_profile');
  if (prof) document.getElementById('profileImg').src = prof;
  checkAdminRoute();
})();

render();