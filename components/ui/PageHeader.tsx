interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-20 md:py-24 lg:py-32 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 grayscale"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1594494424758-007e6065586b?w=2000&q=80')` }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
        <div className="max-w-4xl border-l-4 sm:border-l-8 border-orange-400 pl-4 sm:pl-6 md:pl-8">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-black uppercase leading-none tracking-tighter break-words">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 sm:mt-4 md:mt-6 text-xs sm:text-sm md:text-base lg:text-xl font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-orange-400 break-words">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Big Template Accent */}
      <span className="pointer-events-none absolute -bottom-5 -right-5 sm:-bottom-8 sm:-right-8 md:-bottom-10 md:-right-10 text-[8rem] xs:text-[10rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-white/5 select-none whitespace-nowrap">
        DM
      </span>
    </section>
  )
}