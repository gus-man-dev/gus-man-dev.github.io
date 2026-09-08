import { useTranslation } from 'react-i18next';
import { useInView } from '../../hooks/useInView';
import { scrollToSection } from '../../utils/scrollToSection';
import { BulletItem, ButtonLink, Reveal, SectionContainer, SectionHeading } from '../controls';

interface PricingTier {
  name: string;
  price: string;
  note: string;
  features: string[];
}

/**
 * Three-tier pricing table matching the Maha reference's structure
 * (full-time / fixed-price / hourly), populated with the real engagement
 * options and rates rather than template lorem-ipsum figures.
 */
export function Pricing() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  const tiers = t('pricing.tiers', { returnObjects: true }) as PricingTier[];

  return (
    <section id="pricing" className="bg-white dark:bg-dark-bg">
      <SectionContainer>
        <SectionHeading>{t('pricing.heading')}</SectionHeading>

        <div ref={ref} className="mt-12 grid gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <Reveal key={tier.name} inView={inView} index={index}>
              <div className="flex h-full flex-col rounded-lg p-8 ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] dark:ring-slate-700 dark:hover:bg-white/5 dark:hover:shadow-none">
                <h3 className="font-semibold text-slate-900 dark:text-white">{tier.name}</h3>
                <p className="mt-4 text-3xl font-bold text-accent">{tier.price}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{tier.note}</p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((feature) => (
                    <BulletItem key={feature} className="text-slate-600 dark:text-slate-300">
                      {feature}
                    </BulletItem>
                  ))}
                </ul>

                <ButtonLink href="#contact" onClick={scrollToSection('contact')} className="mt-8 justify-center">
                  {t('pricing.cta')}
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
