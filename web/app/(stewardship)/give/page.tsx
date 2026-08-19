import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GreatGod - Stewardship & Giving',
};

export default function GivePage() {
  return (
    <main className="flex-grow w-full max-w-[560px] mx-auto px-[20px] md:px-0 py-[64px] flex flex-col gap-[64px] relative">
      <article className="flex flex-col gap-[16px]">
        <div className="w-full h-64 md:h-80 bg-surface-variant rounded-lg overflow-hidden mb-[16px] relative">
          <Image
            className="w-full h-full object-cover"
            alt="A serene landscape photograph taken at dawn"
            src="https://images.unsplash.com/photo-1544640808-32cb4f5f5bce?auto=format&fit=crop&q=80"
            fill
          />
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary text-center">
          The Quiet Art of Stillness
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant text-center mb-[32px] italic">
          By Father Thomas · Read Time: 4 mins
        </p>
        <div className="font-body-lg text-body-lg text-on-background flex flex-col gap-[16px]">
          <p>
            In a world that demands our constant attention, the most radical act of faith is often simply to be still. We find ourselves pulled in a thousand directions, our minds cluttered with the noise of daily obligations.
          </p>
          <p>
            Yet, it is in the quiet spaces that we are most able to hear the whispers of grace. Stillness is not merely the absence of motion; it is an active posture of the heart, a readiness to receive.
          </p>
          <p>
            Consider the lilies of the field. They do not toil, they do not spin, yet they are arrayed in glory. They exist in a state of perpetual receptivity to the sun and rain. We, too, are invited into this rhythm of unforced grace.
          </p>
          <p>
            When we cultivate silence, we create a sanctuary within ourselves. It is here that true transformation begins, not through our own frantic efforts, but through a gentle yielding to a presence greater than ourselves.
          </p>
        </div>
      </article>

      <div className="w-16 h-px bg-outline-variant mx-auto my-[32px]"></div>

      <section className="bg-surface-linen rounded-xl p-[32px] border border-surface-variant shadow-sm flex flex-col items-center text-center gap-[16px] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-bright/50 to-transparent pointer-events-none"></div>
        <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-[8px] z-10 text-primary">
          <span className="material-symbols-outlined">volunteer_activism</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-primary z-10">Cultivate the Quiet</h3>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm z-10">
          If these words have brought you peace, consider supporting our mission to share this sanctuary with others.
        </p>
        <div className="mt-[16px] z-10">
          <Link
            href="/give/checkout"
            className="bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider py-3 px-8 rounded hover:bg-surface-tint transition-colors duration-200 flex items-center gap-2"
          >
            Support Our Mission
          </Link>
        </div>
      </section>
    </main>
  );
}
