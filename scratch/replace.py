import sys

file_path = "app/page.tsx"

with open(file_path, "r") as f:
    lines = f.readlines()

prefix = "".join(lines[:110])
suffix = "".join(lines[517:])

new_content = """              <path className="text-[#FDFBF7]" d="M0,100 L0,80 C480,0 960,0 1440,80 L1440,100 Z" />
            </svg>
          </div>
        </section>

        {/* Min Historie (Using 11.png layout) */}
        <section id="min-historie" className="relative pt-[clamp(3rem,8vw,8rem)] pb-[clamp(5rem,12vw,10rem)] px-[clamp(1.5rem,5vw,4rem)] bg-[#FDFBF7] text-[#1c1a18] overflow-hidden">
          <div className="max-w-[1400px] mx-auto flex flex-col items-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={hardwareAccelerated}
              className="font-headline text-[clamp(2.5rem,5vw,5rem)] text-center leading-[1.1] tracking-tight max-w-4xl mx-auto"
            >
              Vores salon <strong className="font-bold">er et frirum, hvor afslapning</strong> <em className="font-serif italic font-light">møder fornyelse</em>.
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-[clamp(3rem,6vw,6rem)] mt-[clamp(4rem,8vw,6rem)] w-full items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={hardwareAccelerated}
                className="relative w-full aspect-square md:aspect-[4/5] rounded-[50%] overflow-hidden max-w-[500px] mx-auto group"
              >
                <Image src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop" alt="Frisør behandling" fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
                <button className="absolute bottom-[10%] left-[10%] w-[clamp(4rem,8vw,6rem)] h-[clamp(4rem,8vw,6rem)] bg-[#FDFBF7] hover:bg-white rounded-full flex items-center justify-center text-[#1c1a18] shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:scale-110 transition-all duration-300 z-10 group-hover:-translate-y-2">
                  <span className="material-symbols-outlined text-[clamp(1.5rem,3vw,2rem)] ml-1">play_arrow</span>
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={hardwareAccelerated}
                className="flex flex-col gap-[clamp(2rem,4vw,3rem)] justify-center h-full max-w-[500px] mx-auto md:mx-0 w-full"
              >
                 <div className="w-full aspect-[4/3] rounded-tl-[1000px] rounded-tr-[1000px] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                    <Image src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop" alt="Frisør salon" fill className="object-cover transition-transform duration-[2s] hover:scale-105" />
                 </div>
                 <div className="flex gap-4 items-start pl-4 border-l-2 border-[#1c1a18]/10">
                   <p className="font-body text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed text-[#1c1a18]/80 font-light">
                     Her kan du slappe af, mens vores dygtige frisører tager sig af dig. Vi skræddersyer enhver behandling, så den fremhæver din helt unikke, naturlige skønhed og glød.
                   </p>
                 </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Intro Services (Using 22.png layout) */}
        <section className="relative py-[clamp(5rem,10vw,8rem)] pl-[clamp(1.5rem,5vw,4rem)] bg-[#FDFBF7] text-[#1c1a18] overflow-hidden">
           <div className="max-w-[1920px] mx-auto grid md:grid-cols-[1.2fr_1.5fr] gap-[clamp(3rem,6vw,6rem)] items-center">
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={hardwareAccelerated}
                className="max-w-xl pr-[clamp(1.5rem,4vw,4rem)]"
              >
                <h3 className="font-headline text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] tracking-tight mb-[clamp(2rem,4vw,3rem)]">
                  Vi <strong className="font-bold">tror på at</strong> <em className="font-serif italic font-light">ægte skønhed kommer indefra</em>.
                </h3>
                <a href="#ydelser" className="inline-block bg-[#EAD5C5] text-[#1c1a18] px-[clamp(2rem,3vw,2.5rem)] py-[clamp(1rem,1.5vw,1.25rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.75rem,1vw,0.875rem)] font-bold shadow-[0_10px_30px_rgba(234,213,197,0.4)] hover:shadow-[0_15px_40px_rgba(234,213,197,0.6)] hover:-translate-y-1 hover:bg-[#e4cdbc] transition-all duration-300">
                  Se detaljer
                </a>
             </motion.div>
             <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                style={hardwareAccelerated}
                className="relative h-[clamp(400px,60vh,800px)] w-full rounded-tl-[1000px] rounded-bl-[1000px] overflow-hidden shadow-[-20px_0_60px_rgba(0,0,0,0.08)]"
             >
                <Image src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036&auto=format&fit=crop" alt="Premium salon" fill className="object-cover" />
             </motion.div>
           </div>
        </section>

        {/* Ydelser (Using 33.png layout) */}
        <section id="ydelser" className="relative py-[clamp(6rem,12vw,10rem)] px-[clamp(1.5rem,5vw,4rem)] bg-[#FDFBF7] text-[#1c1a18] overflow-hidden">
          {/* Abstract SVG line accent top right */}
          <div className="absolute top-0 right-[-10%] w-[clamp(400px,40vw,600px)] h-[clamp(400px,40vw,600px)] pointer-events-none opacity-[0.03]">
            <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rotate-45">
              <path d="M 0 500 C 100 200, 400 300, 500 0" stroke="#1c1a18" strokeWidth="2" strokeDasharray="10,10" />
            </svg>
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={hardwareAccelerated}
              className="text-center font-headline text-[clamp(3rem,5vw,5rem)] leading-[1.05] tracking-tight mb-[clamp(4rem,8vw,8rem)]"
            >
              Eksklusivt udvalg af <br/><em className="font-serif italic font-light">frisøroplevelser</em>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(3rem,5vw,4rem)]">
              {[
                { title: "Balayage Værk", desc: "Solkysset og naturlig farveovergang, håndmalet specielt til dine træk.", icon: "brush" },
                { title: "Klip og Styling", desc: "Perfektion i hvert snit. Vi former håret for at komplementere dit ansigt.", icon: "content_cut" },
                { title: "Hovedbundskur", desc: "Dybdegående og genopbyggende behandling for fundamentet af et sundt hår.", icon: "spa" },
                { title: "Bespoke Extensions", desc: "Fyldigt, langt og luksuriøst hår med premium kvalitetsextensions.", icon: "face_4" }
              ].map((ydelse, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={hardwareAccelerated}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <div className="w-[clamp(8rem,12vw,10rem)] h-[clamp(8rem,12vw,10rem)] rounded-full border border-[#1c1a18]/10 flex items-center justify-center mb-[clamp(1.5rem,3vw,2.5rem)] group-hover:bg-[#EAD5C5] group-hover:border-[#EAD5C5] transition-all duration-500 shadow-sm group-hover:shadow-[0_15px_40px_rgba(234,213,197,0.4)] group-hover:-translate-y-2">
                    <span className="material-symbols-outlined text-[clamp(2.5rem,4vw,3.5rem)] opacity-60 group-hover:opacity-100 group-hover:text-[#1c1a18] transition-opacity duration-300">{ydelse.icon}</span>
                  </div>
                  <h4 className="font-headline font-bold text-[clamp(1.5rem,2vw,1.75rem)] mb-3 tracking-tight group-hover:text-[#EAD5C5] transition-colors duration-300">{ydelse.title}</h4>
                  <p className="font-body text-[#1c1a18]/70 font-light leading-relaxed max-w-[280px]">{ydelse.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats (Using 44.png layout) */}
        <section className="relative py-[clamp(6rem,12vw,10rem)] px-[clamp(1.5rem,5vw,4rem)] bg-[#F8F5F0] text-[#1c1a18] overflow-hidden">
          {/* Flowing background accent */}
          <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[150%] opacity-[0.02] pointer-events-none mix-blend-multiply stroke-[#1c1a18]" viewBox="0 0 1000 500" preserveAspectRatio="none">
             <path d="M-100,250 C 200,500 800,0 1100,250" fill="none" strokeWidth="2" strokeDasharray="10 10" />
             <path d="M-100,200 C 400,600 600,-100 1100,250" fill="none" strokeWidth="1" />
          </svg>
          
          <div className="max-w-[1400px] mx-auto relative z-10">
             <div className="grid md:grid-cols-[1.2fr_1fr] gap-[clamp(4rem,8vw,6rem)] items-center mb-[clamp(6rem,10vw,8rem)]">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  style={hardwareAccelerated}
                  className="relative w-full max-w-[450px] aspect-square mx-auto md:ml-0"
                >
                   <div className="absolute top-0 right-0 w-[75%] h-[75%] rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 hover:z-20 transition-all duration-500 hover:scale-105">
                      <Image src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop" fill alt="Detail" className="object-cover" />
                   </div>
                   <div className="absolute bottom-0 left-0 w-[70%] h-[70%] rounded-full overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] z-0 hover:z-20 transition-all duration-500 hover:scale-105">
                      <Image src="https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=1974&auto=format&fit=crop" fill alt="Tools" className="object-cover" />
                   </div>
                </motion.div>
                <div className="max-w-md ml-auto text-left md:text-right space-y-[clamp(1.5rem,3vw,2rem)]">
                  <h3 className="font-headline text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] tracking-tight">
                    Løft dit <em className="font-serif italic font-light">velvære</em> med varig <em className="font-serif italic font-light">kvalitet</em>
                  </h3>
                  <p className="font-body text-[#1c1a18]/70 font-light text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed">
                    Vores dedikation til håndværket, parret med luksuriøse produkter, sikrer at du altid forlader os med følelsen af ægte velvære og perfektion.
                  </p>
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#1c1a18]/10 text-center">
                {[
                  { num: "24", label: "Års erfaring" },
                  { num: "01", label: "Premium salon" },
                  { num: "1.8k", label: "Glade kunder" },
                  { num: "45", label: "Prisvindende looks" }
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={hardwareAccelerated}
                    className="flex flex-col items-center justify-center p-4"
                  >
                     <span className="font-headline text-[clamp(4rem,7vw,6.5rem)] font-light italic leading-none mb-3 text-[#1c1a18] opacity-80">{stat.num}</span>
                     <span className="font-label text-[clamp(0.7rem,1vw,0.85rem)] uppercase tracking-[0.2em] text-[#1c1a18]/50 font-bold">{stat.label}</span>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* Eksperter / Galleri (Using 55.png layout) */}
        <section id="galleri" className="relative py-[clamp(6rem,12vw,10rem)] px-[clamp(1.5rem,5vw,4rem)] bg-[#FDFBF7] text-[#1c1a18]">
           <div className="max-w-[1400px] mx-auto text-center mb-[clamp(4rem,8vw,6rem)]">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={hardwareAccelerated}
                className="font-headline text-[clamp(3rem,5vw,5rem)] leading-[1.05] tracking-tight"
              >
                Magien fra vores <br/><em className="font-serif italic font-light">dygtige eksperter</em>
              </motion.h2>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(1rem,3vw,3rem)] max-w-[1400px] mx-auto items-end mb-[clamp(6rem,12vw,10rem)]">
              {[
                { name: "Signe", title: "Master Stylist", img: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=1936&auto=format&fit=crop", aspect: "aspect-[3/4]", delay: 0 },
                { name: "Camilla", title: "Color Expert", img: "https://images.unsplash.com/photo-1620052309193-4e3ed9c73bc7?q=80&w=1974&auto=format&fit=crop", aspect: "aspect-[2/3]", delay: 0.1 },
                { name: "Amanda", title: "Stylist", img: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1926&auto=format&fit=crop", aspect: "aspect-[4/5]", delay: 0.2 },
                { name: "Julie", title: "Balayage Specialist", img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop", aspect: "aspect-[3/4] md:mb-8", delay: 0.3 }
              ].map((expert, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: expert.delay, ease: [0.16, 1, 0.3, 1] }}
                  style={hardwareAccelerated}
                  className={`${expert.aspect} w-full rounded-[50%] overflow-hidden relative group shadow-[0_15px_40px_rgba(0,0,0,0.08)]`}
                >
                  <Image src={expert.img} fill alt={expert.name} className="object-cover group-hover:scale-110 transition-transform duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end items-center pb-[clamp(1.5rem,3vw,2rem)] p-4 backdrop-blur-[2px]">
                     <span className="text-white font-headline text-[clamp(1.25rem,2vw,1.75rem)] tracking-tight">{expert.name}</span>
                     <span className="text-white/80 font-label text-[clamp(0.6rem,0.8vw,0.75rem)] uppercase tracking-[0.2em] mt-1">{expert.title}</span>
                  </div>
                </motion.div>
              ))}
           </div>

           {/* Quote Section (from bottom of 55.png) */}
           <div className="max-w-[1200px] mx-auto border-t border-[#1c1a18]/10 pt-[clamp(4rem,8vw,6rem)] grid md:grid-cols-2 gap-[clamp(3rem,6vw,5rem)] items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                 <h3 className="font-headline text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] tracking-tight">
                   Se hvad <em className="font-serif italic font-light">vores kunder siger</em>
                 </h3>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={hardwareAccelerated}
                className="bg-[#F8F5F0] p-[clamp(2.5rem,5vw,4rem)] rounded-bl-[100px] rounded-tr-[100px] relative shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
              >
                 <span className="material-symbols-outlined absolute top-[clamp(1rem,2vw,1.5rem)] left-[clamp(1rem,2vw,1.5rem)] text-[#EAD5C5] text-[clamp(3rem,6vw,5rem)] opacity-40">format_quote</span>
                 <p className="font-body text-[clamp(1.125rem,1.5vw,1.375rem)] font-light italic leading-relaxed text-[#1c1a18]/90 relative z-10 pt-4">
                   "Den bedste oplevelse jeg nogensinde har haft. Deres blik for detaljen og dedikation til at skabe et resultat, der passer til mig, er simpelthen enestående. Jeg føler mig som et helt nyt menneske."
                 </p>
                 <div className="mt-[clamp(1.5rem,3vw,2rem)] font-label uppercase tracking-[0.2em] text-[clamp(0.7rem,1vw,0.85rem)] font-bold text-[#1c1a18]/60">— Maja Petersen</div>
              </motion.div>
           </div>
        </section>

        {/* Booking CTA Background Parallax (Using 66.png layout) */}
        <section className="relative py-[clamp(8rem,15vw,12rem)] px-[clamp(1.5rem,5vw,4rem)] overflow-hidden flex items-center justify-center">
           {/* Background Image and Overlay */}
           <div className="absolute inset-0 z-0">
             <Image src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop" fill alt="Salon ambience" className="object-cover scale-[1.05]" />
             <div className="absolute inset-0 bg-stone-900/40"></div>
           </div>

           <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={hardwareAccelerated}
              className="relative z-10 max-w-[900px] w-full bg-[#FDFBF7]/95 backdrop-blur-md p-[clamp(3rem,8vw,6rem)] text-center shadow-[0_30px_80px_rgba(0,0,0,0.3)] rounded-tr-[100px] rounded-bl-[100px] border border-white/20"
           >
              <h2 className="font-headline text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] text-[#1c1a18] mb-[clamp(2rem,4vw,3rem)] tracking-tight">
                Book din tid i dag og lad <em className="font-serif italic font-light">vores fantastiske salon</em> være dit <em className="font-serif italic font-light">frirum</em> for fornyelse.
              </h2>
              <a href="#book" className="inline-block bg-[#EAD5C5] text-[#1c1a18] px-[clamp(2.5rem,4vw,3.5rem)] py-[clamp(1.25rem,2vw,1.5rem)] rounded-full font-label tracking-[0.2em] uppercase text-[clamp(0.75rem,1.2vw,0.875rem)] font-bold shadow-[0_15px_40px_rgba(234,213,197,0.3)] hover:shadow-[0_20px_50px_rgba(234,213,197,0.5)] hover:-translate-y-1 hover:bg-[#e4cdbc] transition-all duration-400">
                Book en aftale
              </a>
           </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#FDFBF7] border-t border-[#1c1a18]/10 text-[#1c1a18]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[clamp(3rem,6vw,5rem)] px-[clamp(1.5rem,5vw,4rem)] py-[clamp(5rem,10vw,8rem)] max-w-[1920px] mx-auto">
          <div className="md:col-span-1">
            <div className="text-[clamp(1.75rem,3vw,2.5rem)] font-serif mb-[clamp(1rem,2vw,1.5rem)] italic tracking-tight leading-none text-[#1c1a18]">Studio 24</div>
            <p className="text-[#1c1a18]/70 font-sans text-[clamp(1rem,1.2vw,1.125rem)] tracking-wide leading-relaxed font-light">
              Designet til at skabe kunst. Et sted hvor teknisk mesterskab møder den seneste vision inden for hår.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-[clamp(0.75rem,1vw,0.875rem)] tracking-[0.25em] uppercase text-[#1c1a18] mb-[clamp(1.5rem,3vw,2rem)] font-label">Udforsk</h5>
            <ul className="space-y-[clamp(0.75rem,1.5vw,1rem)]">
              {['Min Historie', 'Ydelser', 'Galleri', 'Kontakt'].map(item => (
                <li key={item}><a className="text-[#1c1a18]/70 font-sans text-[clamp(1rem,1.2vw,1.125rem)] tracking-wide hover:text-[#EAD5C5] hover:tracking-[0.05em] transition-all duration-300 inline-block font-light" href={`#${item.toLowerCase().replace(' ', '-')}`}>{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[clamp(0.75rem,1vw,0.875rem)] tracking-[0.25em] uppercase text-[#1c1a18] mb-[clamp(1.5rem,3vw,2rem)] font-label">Information</h5>
            <ul className="space-y-[clamp(0.75rem,1.5vw,1rem)]">
              {['Privatlivspolitik', 'Vilkår for Service', 'Bæredygtighed', 'Karriere'].map(item => (
                <li key={item}><a className="text-[#1c1a18]/70 font-sans text-[clamp(1rem,1.2vw,1.125rem)] tracking-wide hover:text-[#EAD5C5] hover:tracking-[0.05em] transition-all duration-300 inline-block font-light" href="/">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[clamp(0.75rem,1vw,0.875rem)] tracking-[0.25em] uppercase text-[#1c1a18] mb-[clamp(1.5rem,3vw,2rem)] font-label">Følg med</h5>
            <div className="flex gap-[clamp(1rem,2vw,1.5rem)]">
              {['public', 'share', 'photo_camera'].map(icon => (
                <a key={icon} className="w-[clamp(3rem,4vw,3.5rem)] h-[clamp(3rem,4vw,3.5rem)] flex items-center justify-center border border-[#1c1a18]/10 rounded-full text-[#1c1a18] hover:bg-[#EAD5C5] hover:border-[#EAD5C5] hover:scale-[1.15] active:scale-95 hover:shadow-[0_15px_30px_rgba(234,213,197,0.4)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" href="/">
                  <span className="material-symbols-outlined text-[1.2rem]">{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="px-[clamp(1.5rem,5vw,4rem)] py-[clamp(1.5rem,3vw,2rem)] border-t border-[#1c1a18]/10 text-center">
          <p className="text-[#1c1a18]/50 font-sans text-[min(0.75rem,3vw)] tracking-[0.2em] font-label uppercase">
            © 2024 Studio 24. Designet til hårets kunst.
          </p>
        </div>
      </footer>
    </>
  );
}
"""

with open(file_path, "w") as f:
    f.write(prefix + new_content)

