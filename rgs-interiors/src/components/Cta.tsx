export default function Cta() {
  return (
    <section className="bg-brand-text text-brand-bg pt-24 pb-14 px-[var(--px-outer)]" id="contact">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif leading-[1.1] mb-10 max-w-4xl">
          Have a space in mind? Let’s build something made for you.
        </h2>

        <div className="flex flex-col sm:flex-row gap-5 mb-16">
          <a href="tel:+919688836074" className="px-10 py-5 bg-brand-bg text-brand-text text-sm font-bold uppercase tracking-wider rounded-full hover:bg-brand-stone transition-colors">
            Call +91 96888 36074
          </a>
          <a href="https://maps.google.com/?q=312,Singanallur,Nehru+Park+Road,Coimbatore+641017" target="_blank" rel="noreferrer" className="px-10 py-5 border border-brand-stone/40 text-brand-bg text-sm font-bold uppercase tracking-wider rounded-full hover:bg-white/10 transition-colors">
            Get Directions
          </a>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 text-left border-t border-brand-stone/20 pt-12">
          
          <div>
            <h4 className="text-brand-stone font-serif text-xl mb-4">Location</h4>
            <address className="not-italic opacity-80 leading-relaxed text-sm">
              ELARQENA INTERIORS<br />
              312, Singanallur,<br />
              Nehru Park Road,<br />
              Coimbatore 641017
            </address>
          </div>

          <div>
            <h4 className="text-brand-stone font-serif text-xl mb-4">Service Areas</h4>
            <p className="opacity-80 leading-relaxed text-sm">
              Coimbatore<br />
              Mettupalayam<br />
              Pollachi
            </p>
          </div>

          <div>
            <h4 className="text-brand-stone font-serif text-xl mb-4">Hours</h4>
            <p className="opacity-80 leading-relaxed text-sm">
              Open 24 Hours<br />
              Monday – Sunday
            </p>
          </div>

        </div>
        
      </div>
    </section>
  );
}
