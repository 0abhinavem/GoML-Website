import { PricingSection } from "./ui/pricing";
import { FallingPattern } from "./ui/falling-pattern";

const PLANS = [
  {
    id: 'hobby',
    name: 'Hobby',
    info: 'Perfect for indie developers and small side projects.',
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      { text: 'Up to 3 projects' },
      { text: '100 AI Generation Requests / mo' },
      { text: 'Community Support', tooltip: 'Get answers on Discord' },
      { text: 'Standard LLM Models' },
    ],
    btn: {
      text: 'Start for Free',
      href: '#',
    },
  },
  {
    highlighted: true,
    id: 'pro',
    name: 'Pro',
    info: 'For professional developers and growing teams.',
    price: {
      monthly: 29,
      yearly: Math.round(29 * 12 * 0.8), // 20% discount
    },
    features: [
      { text: 'Unlimited projects' },
      { text: '1,000 AI Generation Requests / mo' },
      { text: 'Advanced Context Mapping', tooltip: 'AI understands your entire repository' },
      { text: 'Premium LLM Models', tooltip: 'Access to GPT-4 and Claude 3 Opus' },
      { text: 'Priority Email Support' },
    ],
    btn: {
      text: 'Upgrade to Pro',
      href: '#',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    info: 'Dedicated support and infrastructure for large organizations.',
    price: {
      monthly: 99,
      yearly: Math.round(99 * 12 * 0.8), // 20% discount
    },
    features: [
      { text: 'Unlimited Everything' },
      { text: 'Custom Model Fine-tuning', tooltip: 'Train models on your proprietary codebase' },
      { text: 'On-Premise Deployment Options', tooltip: 'Deploy on your own AWS/GCP infrastructure' },
      { text: 'Dedicated Account Manager' },
      { text: 'SLA & 24/7 Phone Support' },
    ],
    btn: {
      text: 'Contact Sales',
      href: '#',
    },
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24 z-10 overflow-hidden">
      <FallingPattern 
        key={`falling-pattern-500`}
        color={["#ff2a2a", "#ff7b00", "#ffea00", "#10b981", "#b910b9"]}
        backgroundColor="#000000"
        duration={500}
        blurIntensity="0.5px"
        density={1}
        className="opacity-100"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <PricingSection
          plans={PLANS}
          heading="Simple, transparent pricing"
          description="No hidden fees. No surprise charges. Scale your automated pipeline with confidence."
        />
      </div>
    </section>
  );
};

export default Pricing;
