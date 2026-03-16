'use client';
import React from 'react';
import { Button } from './button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './tooltip';
import { cn } from '@/lib/utils';
import { CheckCircleIcon, StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, Transition, AnimatePresence } from 'framer-motion';

type FREQUENCY = 'monthly' | 'yearly';
const frequencies: FREQUENCY[] = ['monthly', 'yearly'];

export interface Plan {
	id: string;
	name: string;
	info: string;
	price: {
		monthly: number;
		yearly: number;
	};
	features: {
		text: string;
		tooltip?: string;
	}[];
	btn: {
		text: string;
		href: string;
	};
	highlighted?: boolean;
}

interface PricingSectionProps extends React.ComponentProps<'div'> {
	plans: Plan[];
	heading: string;
	description?: string;
}

export function PricingSection({
	plans,
	heading,
	description,
	...props
}: PricingSectionProps) {
	const [frequency, setFrequency] = React.useState<'monthly' | 'yearly'>(
		'monthly',
	);
	const [hoveredPlan, setHoveredPlan] = React.useState<string | null>(null);
	const [selectedPlan, setSelectedPlan] = React.useState<string>(plans[0]?.id || '');

	return (
		<div
			className={cn(
				'flex w-full flex-col items-center justify-center space-y-5 p-4',
				props.className,
			)}
			{...props}
		>
			<div className="mx-auto max-w-xl space-y-2 mb-8 text-center">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-4xl font-bold tracking-tight md:text-5xl font-display text-white"
				>
					{heading}
				</motion.h2>
				{description && (
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-white/60 text-lg max-w-2xl mx-auto"
					>
						{description}
					</motion.p>
				)}
			</div>
			<PricingFrequencyToggle
				frequency={frequency}
				setFrequency={setFrequency}
			/>
			<div 
				className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 mt-12 md:grid-cols-3"
				onMouseLeave={() => setHoveredPlan(null)}
			>
				{plans.map((plan) => (
					<PricingCard 
						plan={plan} 
						key={plan.id} 
						frequency={frequency} 
						isHighlighted={(hoveredPlan || selectedPlan) === plan.id}
						onMouseEnter={() => setHoveredPlan(plan.id)}
						onClick={() => setSelectedPlan(plan.id)}
					/>
				))}
			</div>
		</div>
	);
}

type PricingFrequencyToggleProps = React.ComponentProps<'div'> & {
	frequency: FREQUENCY;
	setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
};

export function PricingFrequencyToggle({
	frequency,
	setFrequency,
	...props
}: PricingFrequencyToggleProps) {
	return (
		<div
			className={cn(
				'bg-white/5 mx-auto flex w-fit rounded-full border border-white/10 p-1 backdrop-blur-md',
				props.className,
			)}
			{...props}
		>
			{frequencies.map((freq) => (
				<button
					key={freq}
					onClick={() => setFrequency(freq)}
					className={`relative px-6 py-2 text-sm font-medium capitalize transition-colors ${
						frequency === freq ? 'text-black' : 'text-white/70 hover:text-white'
					}`}
				>
					<span className="relative z-10">{freq}</span>
					{frequency === freq && (
						<motion.span
							layoutId="frequency"
							transition={{ type: 'spring', duration: 0.4 }}
							className="absolute inset-0 z-0 rounded-full bg-white"
						/>
					)}
				</button>
			))}
		</div>
	);
}

type PricingCardProps = Omit<React.ComponentProps<'div'>, 
	'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
> & {
	plan: Plan;
	frequency?: FREQUENCY;
	isHighlighted?: boolean;
};

export function PricingCard({
	plan,
	className,
	frequency = frequencies[0],
	isHighlighted,
	onMouseEnter,
	onClick,
	...props
}: PricingCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			onMouseEnter={onMouseEnter}
			onClick={onClick}
			className={cn(
				'relative flex w-full flex-col rounded-3xl border transition-all duration-300 cursor-pointer overflow-visible h-full',
				isHighlighted 
					? 'border-emerald-500/50 bg-emerald-500/[0.03] shadow-[0_0_40px_-5px_rgba(16,185,129,0.2)] scale-[1.02] z-20' 
					: 'border-white/10 bg-white/[0.02] backdrop-blur-xl z-10',
				className,
			)}
			{...props}
		>
			{/* Shared Light Effect Layer */}
			<div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden">
				<AnimatePresence>
					{isHighlighted && (
						<motion.div
							key="highlight-trail"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							layoutId="active-pricing-border"
							className="absolute inset-0 z-0"
						>
							<BorderTrail
								style={{
									boxShadow:
										'0px 0px 60px 20px rgb(16 185 129 / 40%), 0 0 100px 40px rgb(16 185 129 / 20%), 0 0 140px 60px rgb(16 185 129 / 10%)',
								}}
								size={150}
								className="bg-emerald-400"
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className="p-8 relative z-20 flex flex-col h-full">
				<div className="absolute top-4 right-4 z-20 flex items-center gap-2">
					{plan.highlighted && (
						<div className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
							<StarIcon className="h-3 w-3 fill-current" />
							Popular
						</div>
					)}
					{frequency === 'yearly' && (
						<div className="flex items-center gap-1 rounded-full border border-white/10 bg-white px-3 py-1 text-xs font-medium text-black">
							{Math.round(
								((plan.price.monthly * 12 - plan.price.yearly) /
									(plan.price.monthly * 12)) *
									100,
							)}
							% off
						</div>
					)}
				</div>

				<div className="mb-6">
					<h3 className="text-2xl font-display font-semibold text-white mb-2">{plan.name}</h3>
					<p className="text-white/60 text-sm h-10 line-clamp-2">{plan.info}</p>
					
					<div className="mt-6 flex items-baseline gap-2">
						<span className="text-5xl font-bold text-white tracking-tight">
							${plan.price[frequency]}
						</span>
						<span className="text-white/50 text-sm">
							{plan.price[frequency] > 0
								? '/' + (frequency === 'monthly' ? 'mo' : 'yr')
								: ''}
						</span>
					</div>
				</div>

				<div className="flex-1 space-y-4 text-sm mb-8">
					{plan.features.map((feature, index) => (
						<div key={index} className="flex items-start gap-3">
							<CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
							<TooltipProvider>
								<Tooltip delayDuration={0}>
									<TooltipTrigger asChild>
										<p
											className={cn(
												"text-white/80 transition-colors",
												feature.tooltip &&
													'cursor-pointer border-b border-dashed border-white/30 hover:border-white/60',
											)}
										>
											{feature.text}
										</p>
									</TooltipTrigger>
									{feature.tooltip && (
										<TooltipContent className="bg-zinc-900 border-white/10 text-white/90 px-3 py-2 rounded-lg backdrop-blur-md z-[60]">
											<p className="max-w-xs">{feature.tooltip}</p>
										</TooltipContent>
									)}
								</Tooltip>
							</TooltipProvider>
						</div>
					))}
				</div>
				
				<div className="mt-auto">
					<Button
						className={cn(
							"w-full py-6 rounded-xl text-base font-semibold transition-all duration-300",
							isHighlighted 
								? "bg-white text-black hover:bg-white/90 shadow-[0_10px_20px_-10px_rgba(255,255,255,0.2)]"
								: "bg-white/5 border border-white/10 text-white hover:bg-white/10"
						)}
						asChild
					>
						<Link to={plan.btn.href}>{plan.btn.text}</Link>
					</Button>
				</div>
			</div>
		</motion.div>
	);
}


type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
};

export function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  onAnimationComplete,
  style,
}: BorderTrailProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: 5,
    ease: 'linear' as const,
  };

  return (
    <div className='pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'>
      <motion.div
        className={cn('absolute aspect-square bg-zinc-500', className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          ...(transition ?? BASE_TRANSITION),
          delay: delay,
        }}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}
