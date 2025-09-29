/* hackathonep1.js */
    // Sample dataset — expandable. In a real app, this would come from an API or database.
    const DATA = [
      {id:1,name:'Brihadeeswarar Temple',type:'Temple',region:'South',location:'Thanjavur, Tamil Nadu',era:'11th century (Chola)',short:'Grand Chola-era Shiva temple, UNESCO site, known for its massive vimana.',desc:'Built by Raja Raja Chola I (1010 CE), Brihadeeswarar Temple is an architectural marvel with a towering vimana and exquisite frescoes. It remains a living temple and a key cultural site in Tamil Nadu.'},
      {id:2,name:'Ajanta Caves',type:'Historical',region:'West',location:'Aurangabad, Maharashtra',era:'2nd century BCE – 6th century CE',short:'Rock-cut Buddhist cave monuments with paintings and sculptures.',desc:'The Ajanta Caves are a group of 30 rock-cut Buddhist cave monuments famous for ancient murals and sculptures dating from the 2nd century BCE to about 480 CE.'},
      {id:3,name:'Meenakshi Amman Temple',type:'Temple',region:'South',location:'Madurai, Tamil Nadu',era:'6th century (expanded later)',short:'Large Dravidian temple complex famous for gopurams covered with sculptures.',desc:'An active temple dedicated to goddess Meenakshi and Lord Sundareswarar; known for its festival of Chithirai and richly decorated towers.'},
      {id:4,name:'Khajuraho Group of Monuments',type:'Historical',region:'North',location:'Chhatarpur, Madhya Pradesh',era:'9th–11th centuries',short:'Temples famous for intricate erotic and spiritual sculpture.',desc:'A UNESCO World Heritage site, Khajuraho temples are celebrated for their nagara-style architectural symbolism and sculptures.'},
      {id:5,name:'Hampi',type:'Historical',region:'South',location:'Ballari, Karnataka',era:'14th–16th centuries (Vijayanagara)',short:'Vast ruins of the Vijayanagara Empire with temples, bazaars, and fortifications.',desc:'Hampi was the prosperous capital of the Vijayanagara Empire; its boulder-strewn landscape contains monuments spread over many kilometres.'},
      {id:6,name:'Konark Sun Temple',type:'Temple',region:'East',location:'Konark, Odisha',era:'13th century',short:'Sun temple built as a chariot with decorated wheels and horses.',desc:'A 13th-century temple dedicated to the sun god Surya; the architecture represents a colossal chariot and is a UNESCO World Heritage site.'},
      {id:7,name:'Shegaon Temple (Shri Gajanan Maharaj)',type:'Temple',region:'West',location:'Shegaon, Akola, Maharashtra',era:'19th century',short:'Famous temple dedicated to Shri Gajanan Maharaj.',desc:'The Shegaon temple is dedicated to Shri Gajanan Maharaj, a revered saint of Maharashtra. The temple attracts lakhs of devotees every year and is an important pilgrimage site.'},
      {id:8,name:'Trimbakeshwar Temple',type:'Temple',region:'West',location:'Trimbak, Nashik, Maharashtra',era:'Ancient (exact date unknown)',short:'One of the twelve Jyotirlinga temples dedicated to Lord Shiva.',desc:'Trimbakeshwar Temple near Nashik is one of the 12 Jyotirlingas in India. It is famous for its unique lingam with three faces symbolizing Brahma, Vishnu, and Shiva.'},
      {id:9,name:'Sai Baba Temple (Shirdi)',type:'Temple',region:'West',location:'Shirdi, Ahmednagar, Maharashtra',era:'19th–20th century',short:'World-famous temple of spiritual leader Sai Baba.',desc:'The Shirdi Sai Baba temple is among the most visited shrines in India. Devotees from across the world visit to seek blessings of Sai Baba, known for his teachings of love, forgiveness, and helping the poor.'},
      {id:10,name:'Siddhivinayak Temple',type:'Temple',region:'West',location:'Mumbai, Maharashtra',era:'18th century',short:'Prominent temple dedicated to Lord Ganesha.',desc:'The Siddhivinayak Temple in Prabhadevi, Mumbai is one of the most popular temples dedicated to Lord Ganesha. It is visited by millions of devotees and celebrities alike.'},
      {id:11,name:'Grishneshwar Temple',type:'Temple',region:'West',location:'Ellora, Maharashtra',era:'13th century (rebuilt in 18th century)',short:'One of the 12 Jyotirlinga shrines of Lord Shiva.',desc:'Located near Ellora caves, the Grishneshwar Temple is considered the last of the 12 Jyotirlingas. It is a significant pilgrimage destination for Shaivites.'},
      {id:12,name:'Pandharpur Vitthal Temple',type:'Temple',region:'West',location:'Pandharpur, Maharashtra',era:'12th century (expanded later)',short:'Main center of worship for Lord Vitthal (Vithoba).',desc:'The Pandharpur Vitthal Temple is a major pilgrimage site in Maharashtra, especially famous for the annual Ashadhi Ekadashi Wari pilgrimage with lakhs of devotees.'},
      {id:13,name:'Bhimashankar Temple',type:'Temple',region:'West',location:'Pune District, Maharashtra',era:'Ancient (Jyotirlinga)',short:'One of the 12 Jyotirlingas of Lord Shiva.',desc:'Bhimashankar Temple is located in the Sahyadri hills near Pune and is one of the 12 Jyotirlinga shrines. The temple is surrounded by dense forest, also declared a wildlife sanctuary.'},
      {id:14,name:'Elephanta Caves',type:'Historical',region:'West',location:'Mumbai, Maharashtra',era:'5th–8th centuries',short:'Rock-cut cave temples dedicated to Lord Shiva on Elephanta Island.',desc:'A UNESCO World Heritage site, the Elephanta Caves feature rock-cut sculptures and reliefs depicting various forms of Lord Shiva. Accessible by ferry from Mumbai.'},
      {id:15,name:'Chhatrapati Shivaji Maharaj Vastu Sangrahalaya',type:'Historical',region:'West',location:'Mumbai, Maharashtra',era:'Early 20th century',short:'Museum showcasing art, archaeology, and natural history.',desc:'Formerly known as the Prince of Wales Museum, it houses a vast collection of artifacts from India and abroad, including sculptures, paintings, and decorative arts.'}
    ];

    const translations = {
      en:{search:'Search',allTypes:'All types',allRegions:'All regions',footer:'This is a demo prototype.'},
      hi:{search:'खोजें',allTypes:'सभी प्रकार',allRegions:'सभी क्षेत्र',footer:'यह एक डेमो प्रोटोटाइप है।'},
      mr:{search:'शोधा',allTypes:'सर्व प्रकार',allRegions:'सर्व क्षेत्र',footer:'हा एक डेमो नमुना आहे.'}
    };

    const qEl = document.getElementById('q');
    const resultsEl = document.getElementById('results');
    const emptyEl = document.getElementById('empty');
    const suggestList = document.getElementById('suggestList');
    const modalBack = document.getElementById('modalBack');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    function renderResults(list){
      resultsEl.innerHTML = '';
      if(!list.length){ emptyEl.style.display='block'; return }
      emptyEl.style.display='none';
      list.forEach(it=>{
        const card = document.createElement('div'); card.className='card';
        card.innerHTML = `<h3>${it.name}</h3>
          <div class="meta">${it.location} • ${it.era} • ${it.type}</div>
          <div>${it.short}</div>
          <div class="tags" aria-hidden style="margin-top:10px">
            <div class="tag">${it.type}</div>
            <div class="tag">${it.region}</div>
          </div>
          <button class="viewBtn" data-id="${it.id}">View details</button>`;
        resultsEl.appendChild(card);
      });
    }

    function search(){
      const q = qEl.value.trim().toLowerCase();
      const type = document.getElementById('typeFilter').value;
      const region = document.getElementById('regionFilter').value;
      let res = DATA.filter(d=>{
        if(type && d.type!==type) return false;
        if(region && d.region!==region) return false;
        if(!q) return true;
        return (d.name+d.short+d.desc+d.location+d.era).toLowerCase().includes(q);
      });
      renderResults(res);
    }

    document.getElementById('searchBtn').addEventListener('click', search);
    qEl.addEventListener('keydown', (e)=>{ if(e.key==='Enter') search(); });

    // Simple suggestions — show top matching names while typing
    qEl.addEventListener('input', ()=>{
      const t = qEl.value.trim().toLowerCase();
      if(!t){ suggestList.style.display='none'; return }
      const hits = DATA.filter(d=>d.name.toLowerCase().includes(t)).slice(0,6);
      if(!hits.length){ suggestList.style.display='none'; return }
      suggestList.innerHTML = hits.map(h=>`<div class="suggestItem" data-name="${h.name}">${h.name} — ${h.location}</div>`).join('');
      suggestList.style.display='block';
    });

    suggestList.addEventListener('click', (e)=>{
      const it = e.target.closest('.suggestItem'); if(!it) return;
      qEl.value = it.dataset.name; suggestList.style.display='none'; search();
    });

    // Delegated event for view details
    resultsEl.addEventListener('click', (e)=>{
      const btn = e.target.closest('.viewBtn'); if(!btn) return;
      const id = Number(btn.dataset.id);
      const record = DATA.find(d=>d.id===id);
      showModal(record);
    });

    function showModal(r){
      modalContent.innerHTML = `<h2 style=\"margin-top:0\">${r.name}</h2>
        <div class="row">
          <div class="thumb">Image placeholder</div>
          <div style="flex:1">
            <div class="meta">${r.location} • ${r.era} • ${r.type}</div>
            <p style="line-height:1.5;color:var(--muted)">${r.desc}</p>
            <p style="margin-top:10px"><strong>Tags:</strong> ${r.type}, ${r.region}</p>
          </div>
        </div>
        <div style="margin-top:12px;color:var(--muted);font-size:13px">(In full product: map, directions, visiting hours, contact, official links, community photos, history timeline, and ticketing integration.)</div>`;
      modalBack.style.display='flex';
    }

    modalClose.addEventListener('click', ()=>{ modalBack.style.display='none'; });
    modalBack.addEventListener('click', (e)=>{ if(e.target===modalBack) modalBack.style.display='none'; });

    // initial render
    renderResults(DATA);