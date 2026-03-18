import { PricingSection } from "./ui/pricing";
import { FallingPattern } from "./ui/falling-pattern";

const PLANS = [
  {
    id: 'community',
    name: 'Community',
    info: 'Full engine access. Free forever for individuals and open-source projects.',
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      { text: 'Full inference engine' },
      { text: 'All quantization modes (NF4, INT8)' },
      { text: 'Community Discord support' },
      { text: 'GitHub Issues & Discussions' },
    ],
    btn: {
      text: 'Download Free',
      href: 'https://github.com/adervark/wLLM',
    },
  },
  {
    highlighted: true,
    id: 'developer',
    name: 'Developer',
    info: 'Priority support and optimizations for professional developers.',
    price: {
      monthly: 19,
      yearly: Math.round(19 * 12 * 0.8),
    },
    features: [
      { text: 'Everything in Community' },
      { text: 'Priority bug fixes & patches' },
      { text: 'Private Slack channel', tooltip: 'Direct access to the engineering team' },
      { text: 'Custom model optimization guides' },
      { text: 'Email support (24h response)' },
    ],
    btn: {
      text: 'Upgrade to Developer',
      href: '#',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    info: 'Dedicated engineering support and deployment assistance for teams.',
    price: {
      monthly: 79,
      yearly: Math.round(79 * 12 * 0.8),
    },
    features: [
      { text: 'Everything in Developer' },
      { text: 'Dedicated support engineer' },
      { text: 'On-premise deployment assistance', tooltip: 'Help deploying on your infrastructure' },
      { text: 'Custom fine-tuning pipeline setup' },
      { text: 'SLA & 24/7 phone support' },
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
          heading="Open Source. Premium Support Available."
          description="WinLLM is free and open source. For teams that need more, we offer professional support tiers."
        />
      </div>
    </section>
  );
};

export default Pricing;
