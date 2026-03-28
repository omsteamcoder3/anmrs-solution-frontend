import { Target, Eye } from "lucide-react"

export default function MissionVisionSection() {
  return (
    <section className="bg-orange-400 py-16 sm:py-20 md:py-24 text-black overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 w-full">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-12 lg:grid-cols-2 w-full">
          {/* Mission */}
          <div className="relative overflow-hidden bg-white p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 shadow-2xl rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem] w-full">
            <Target className="absolute -right-4 sm:-right-6 md:-right-8 -top-4 sm:-top-6 md:-top-8 h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 text-black/5" />
            <div className="relative space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 w-full">
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-orange-400">OUR MISSION</h3>
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight sm:leading-tight md:leading-none break-words">
                EMPOWERING <br className="hidden xs:block" /> GROWERS
              </h4>
              <p className="text-base sm:text-lg md:text-xl  leading-relaxed text-gray-700 break-words">
                To support farmers and businesses by providing reliable tractors, honest guidance, and dependable
                after-sales service. Helping improve productivity through quality products and builds long-term
                relationships based on trust.
              </p>
              <div className="h-1.5 sm:h-2 w-12 sm:w-16 md:w-20 bg-orange-400" />
            </div>
          </div>

          {/* Vision */}
          <div className="relative overflow-hidden bg-black p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 shadow-2xl text-white rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem] w-full">
            <Eye className="absolute -right-4 sm:-right-6 md:-right-8 -top-4 sm:-top-6 md:-top-8 h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 text-white/5" />
            <div className="relative space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 w-full">
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] text-orange-400">OUR VISION</h3>
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight sm:leading-tight md:leading-none break-words">
                LEADING THE <br className="hidden xs:block" /> AGRICULTURE
              </h4>
              <p className="text-base sm:text-lg md:text-xl  leading-relaxed text-gray-400 break-words">
                To become a leading and most trusted tractor dealership in the region, recognized for service
                excellence, customer satisfaction, and ethical business practices. Contributing to the growth of
                agriculture by delivering modern machinery.
              </p>
              <div className="h-1.5 sm:h-2 w-12 sm:w-16 md:w-20 bg-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}