import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { a as trackCtaClick, n as useBodyScrollLock, r as CASE_STUDIES } from "../entry-server.mjs";
import { Activity, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Layers, Lightbulb, Maximize2, Search, ShieldCheck, Target, X } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
// src/components/CaseStudyDetailModal.tsx
var buildFallbackSvg = (title, metric) => {
	const safeTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 600" width="960" height="600">
    <rect width="960" height="600" fill="#0B0F19"/>
    <rect x="36" y="36" width="888" height="528" rx="24" fill="#111827" stroke="#1F2937" stroke-width="2"/>
    <text x="80" y="120" fill="#9CA3AF" font-family="monospace" font-size="14" letter-spacing="2">ZAHIDUL ISLAM · VERIFIED CAMPAIGN</text>
    <text x="80" y="280" fill="#FFFFFF" font-family="sans-serif" font-size="68" font-weight="800">${metric.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>
    <text x="80" y="340" fill="#34D399" font-family="sans-serif" font-size="22" font-weight="600">${safeTitle}</text>
  </svg>`;
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
var CaseStudyDetailModal = ({ caseStudy, onClose, onOpenBooking, onSelectCaseStudy }) => {
	const [lightboxImage, setLightboxImage] = useState(null);
	const [activeVisualSlide, setActiveVisualSlide] = useState(0);
	const [showAllVisuals, setShowAllVisuals] = useState(false);
	const modalBodyRef = useRef(null);
	const visualSliderRef = useRef(null);
	useEffect(() => {
		setLightboxImage(null);
		setActiveVisualSlide(0);
		setShowAllVisuals(false);
		if (modalBodyRef.current) modalBodyRef.current.scrollTop = 0;
		if (visualSliderRef.current) visualSliderRef.current.scrollLeft = 0;
	}, [caseStudy?.id]);
	const currentIndex = caseStudy ? CASE_STUDIES.findIndex((project) => project.id === caseStudy.id) : -1;
	const totalCount = CASE_STUDIES.length;
	const allImages = (caseStudy ? [caseStudy.coverImage, ...caseStudy.galleryImages].filter((img) => Boolean(img)) : []).filter((img, idx, arr) => arr.findIndex((other) => other.src === img.src) === idx);
	const visibleDesktopImages = allImages.length > 4 && !showAllVisuals ? allImages.slice(0, 4) : allImages;
	const handleNextProject = () => {
		if (currentIndex < 0 || !onSelectCaseStudy || totalCount === 0) return;
		const nextIndex = (currentIndex + 1) % totalCount;
		onSelectCaseStudy(CASE_STUDIES[nextIndex]);
	};
	const handlePrevProject = () => {
		if (currentIndex < 0 || !onSelectCaseStudy || totalCount === 0) return;
		const prevIndex = (currentIndex - 1 + totalCount) % totalCount;
		onSelectCaseStudy(CASE_STUDIES[prevIndex]);
	};
	const handleVisualScroll = () => {
		if (!visualSliderRef.current) return;
		const container = visualSliderRef.current;
		const slides = container.querySelectorAll("[data-visual-slide=\"true\"]");
		if (!slides.length) return;
		const containerLeft = container.getBoundingClientRect().left;
		let closestIndex = 0;
		let minDiff = 1e400;
		slides.forEach((slide, idx) => {
			const diff = Math.abs(slide.getBoundingClientRect().left - containerLeft);
			if (diff < minDiff) {
				minDiff = diff;
				closestIndex = idx;
			}
		});
		setActiveVisualSlide(closestIndex);
	};
	const scrollToVisualSlide = (index) => {
		if (!visualSliderRef.current) return;
		const container = visualSliderRef.current;
		const targetSlide = container.querySelectorAll("[data-visual-slide=\"true\"]")[index];
		if (targetSlide) {
			const containerRect = container.getBoundingClientRect();
			const slideRect = targetSlide.getBoundingClientRect();
			container.scrollTo({
				left: container.scrollLeft + (slideRect.left - containerRect.left),
				behavior: "smooth"
			});
			setActiveVisualSlide(index);
		}
	};
	useEffect(() => {
		if (!caseStudy) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				if (lightboxImage) setLightboxImage(null);
				else onClose();
			}
			if (!lightboxImage && e.key === "ArrowRight") handleNextProject();
			if (!lightboxImage && e.key === "ArrowLeft") handlePrevProject();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		caseStudy,
		lightboxImage,
		currentIndex
	]);
	useBodyScrollLock(Boolean(caseStudy));
	if (!caseStudy || typeof document === "undefined") return null;
	const formattedNumber = String(currentIndex + 1).padStart(2, "0");
	const formattedTotal = String(totalCount).padStart(2, "0");
	const showDistinctSecondaryMetric = Boolean(caseStudy.secondaryMetric) && !caseStudy.platforms.some((p) => p.toLowerCase() === caseStudy.secondaryMetric?.toLowerCase());
	return createPortal(/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-5 lg:p-6 overflow-hidden",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": `Case study details: ${caseStudy.title}`,
		children: [/* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 bg-black/82 backdrop-blur-md cursor-pointer touch-none",
			onClick: onClose,
			"aria-label": "Close case study modal backdrop"
		}), /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				scale: .97,
				y: 12
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			transition: {
				duration: .28,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			"data-lenis-prevent": "true",
			className: "relative z-10 w-full max-w-4xl max-h-[94dvh] sm:max-h-[90vh] flex flex-col rounded-[22px] sm:rounded-[30px] bg-white text-[#09090B] border border-zinc-200 shadow-[0_32px_95px_rgba(0,0,0,0.7)] overflow-hidden overscroll-contain",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "shrink-0 flex items-center justify-between gap-2 sm:gap-3 px-3.5 sm:px-7 py-3 sm:py-3.5 bg-[#090B10] text-white border-b border-white/10 z-20",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 min-w-0",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-[11px] sm:text-xs font-bold text-emerald-300 shrink-0 tabular-nums",
								children: [
									"Case ",
									formattedNumber,
									" / ",
									formattedTotal
								]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "hidden min-[375px]:inline-block px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[10.5px] sm:text-[11px] text-zinc-200 truncate max-w-[165px] sm:max-w-none",
								children: caseStudy.portfolioCategory
							}),
							/* @__PURE__ */ jsx("span", {
								className: "hidden md:inline font-serif italic text-sm text-zinc-400 truncate",
								children: caseStudy.clientIndustry
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1.5 sm:gap-2 shrink-0",
						children: [onSelectCaseStudy && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: handlePrevProject,
							className: "inline-flex items-center justify-center gap-1 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer",
							title: "Previous Case Study (Arrow Left)",
							"aria-label": "Previous Case Study",
							children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4 sm:w-3.5 sm:h-3.5" }), /* @__PURE__ */ jsx("span", {
								className: "hidden sm:inline",
								children: "Prev"
							})]
						}), /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: handleNextProject,
							className: "inline-flex items-center justify-center gap-1 w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-colors cursor-pointer",
							title: "Next Case Study (Arrow Right)",
							"aria-label": "Next Case Study",
							children: [/* @__PURE__ */ jsx("span", {
								className: "hidden sm:inline",
								children: "Next"
							}), /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 sm:w-3.5 sm:h-3.5" })]
						})] }), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: onClose,
							className: "w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white text-zinc-200 hover:text-[#09090B] border border-white/15 transition-colors cursor-pointer ml-0.5 sm:ml-1",
							title: "Close Case Study (Escape)",
							"aria-label": "Close case study modal",
							children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					ref: modalBodyRef,
					"data-lenis-prevent": "true",
					className: "flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y p-4 sm:p-7 lg:p-9 space-y-5 sm:space-y-6 [-webkit-overflow-scrolling:touch]",
					children: [
						/* @__PURE__ */ jsx("section", {
							"aria-labelledby": "cs-section-overview",
							className: "rounded-[20px] sm:rounded-[26px] bg-[#0B0D14] text-white p-5 sm:p-7 lg:p-8 border border-zinc-900 shadow-xl",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-center",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "lg:col-span-7 space-y-3.5 sm:space-y-4 min-w-0",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono uppercase tracking-[0.12em]",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "font-semibold text-emerald-400",
													children: "01 · Campaign Overview"
												}),
												/* @__PURE__ */ jsx("span", {
													"aria-hidden": "true",
													className: "text-zinc-600",
													children: "·"
												}),
												/* @__PURE__ */ jsx("span", {
													className: "text-zinc-300",
													children: caseStudy.portfolioCategory
												}),
												/* @__PURE__ */ jsx("span", {
													"aria-hidden": "true",
													className: "text-zinc-600",
													children: "·"
												}),
												/* @__PURE__ */ jsx("span", {
													className: "text-zinc-400",
													children: caseStudy.clientIndustry
												})
											]
										}),
										/* @__PURE__ */ jsx("h2", {
											id: "cs-section-overview",
											className: "font-display font-bold text-xl min-[375px]:text-2xl sm:text-3xl lg:text-[2.15rem] text-white tracking-[-0.025em] leading-[1.15] [text-wrap:balance]",
											children: caseStudy.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-[13px] sm:text-sm text-zinc-300 leading-relaxed",
											children: caseStudy.summary
										}),
										caseStudy.platforms.length > 0 && /* @__PURE__ */ jsxs("div", {
											className: "pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-mono text-[10px] uppercase tracking-wider text-zinc-400 mr-1",
												children: "Platforms & Tools:"
											}), caseStudy.platforms.map((platform) => /* @__PURE__ */ jsx("span", {
												className: "px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 font-mono text-[10.5px] sm:text-[11px] text-zinc-200 whitespace-nowrap",
												children: platform
											}, platform))]
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "lg:col-span-5 rounded-2xl bg-[#111521] border border-white/10 p-4 sm:p-6 space-y-3",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-mono text-[10px] uppercase tracking-wider text-zinc-400",
												children: "Primary Outcome"
											}), /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 font-mono text-[10px] text-emerald-300 shrink-0",
												children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "w-3 h-3" }), "Verified"]
											})]
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none tabular-nums",
											children: caseStudy.primaryMetric
										}), /* @__PURE__ */ jsx("div", {
											className: "text-xs sm:text-sm font-mono font-semibold text-emerald-300 mt-1.5",
											children: caseStudy.metricLabel
										})] }),
										showDistinctSecondaryMetric && /* @__PURE__ */ jsxs("div", {
											className: "pt-3 border-t border-white/10 flex items-baseline justify-between gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-[11px] font-mono text-zinc-400",
												children: caseStudy.secondaryMetricLabel
											}), /* @__PURE__ */ jsx("span", {
												className: "font-display font-bold text-sm sm:text-base text-white tabular-nums",
												children: caseStudy.secondaryMetric
											})]
										})
									]
								})]
							})
						}),
						(caseStudy.campaignObjective || caseStudy.challenges.length > 0) && /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5",
							children: [caseStudy.campaignObjective && /* @__PURE__ */ jsxs("section", {
								"aria-labelledby": "cs-section-goal",
								className: "rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-4 sm:p-6 flex flex-col justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#09090B] shrink-0",
										children: /* @__PURE__ */ jsx(Target, { className: "w-4 h-4" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("span", {
											className: "block font-mono text-[10px] uppercase tracking-wider text-zinc-500",
											children: "02 · Business Goal & Scope"
										}), /* @__PURE__ */ jsx("h3", {
											id: "cs-section-goal",
											className: "font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug",
											children: "Client Objective & Scope"
										})]
									})]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-[13px] sm:text-sm text-zinc-700 leading-relaxed",
									children: caseStudy.campaignObjective
								})] }), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 pt-3.5 border-t border-zinc-200/80 grid grid-cols-2 gap-3 text-xs",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("span", {
											className: "block font-mono text-[10px] uppercase text-zinc-400",
											children: "Industry"
										}), /* @__PURE__ */ jsx("span", {
											className: "font-display font-bold text-[#09090B] block truncate",
											children: caseStudy.clientIndustry
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("span", {
											className: "block font-mono text-[10px] uppercase text-zinc-400",
											children: "Campaign Focus"
										}), /* @__PURE__ */ jsx("span", {
											className: "font-display font-bold text-[#09090B] block truncate",
											children: caseStudy.secondaryMetricLabel || caseStudy.portfolioCategory
										})]
									})]
								})]
							}), caseStudy.challenges.length > 0 && /* @__PURE__ */ jsxs("section", {
								"aria-labelledby": "cs-section-diagnosis",
								className: "rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-4 sm:p-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#09090B] shrink-0",
										children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("span", {
											className: "block font-mono text-[10px] uppercase tracking-wider text-zinc-500",
											children: "03 · Account Diagnosis"
										}), /* @__PURE__ */ jsx("h3", {
											id: "cs-section-diagnosis",
											className: "font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug",
											children: "Challenges Identified"
										})]
									})]
								}), /* @__PURE__ */ jsx("ul", {
									className: "space-y-2.5",
									children: caseStudy.challenges.map((challenge, i) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2.5 text-[13px] sm:text-sm text-zinc-700 leading-relaxed",
										children: [/* @__PURE__ */ jsx("span", {
											className: "w-5 h-5 rounded-full bg-zinc-200/80 text-[#09090B] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums",
											children: i + 1
										}), /* @__PURE__ */ jsx("span", { children: challenge })]
									}, i))
								})]
							})]
						}),
						(caseStudy.strategy.length > 0 || caseStudy.campaignStructure.length > 0) && /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5",
							children: [caseStudy.strategy.length > 0 && /* @__PURE__ */ jsxs("section", {
								"aria-labelledby": "cs-section-strategy",
								className: "rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-4 sm:p-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-emerald-600 shrink-0",
										children: /* @__PURE__ */ jsx(Lightbulb, { className: "w-4 h-4" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("span", {
											className: "block font-mono text-[10px] uppercase tracking-wider text-zinc-500",
											children: "04 · Strategy & Execution"
										}), /* @__PURE__ */ jsx("h3", {
											id: "cs-section-strategy",
											className: "font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug",
											children: "Approach & Optimizations"
										})]
									})]
								}), /* @__PURE__ */ jsx("ul", {
									className: "space-y-2.5",
									children: caseStudy.strategy.map((item, i) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2.5 text-[13px] sm:text-sm text-zinc-700 leading-relaxed",
										children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ jsx("span", { children: item })]
									}, i))
								})]
							}), caseStudy.campaignStructure.length > 0 && /* @__PURE__ */ jsxs("section", {
								"aria-labelledby": "cs-section-architecture",
								className: "rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-4 sm:p-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80",
									children: [/* @__PURE__ */ jsx("div", {
										className: "w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#09090B] shrink-0",
										children: /* @__PURE__ */ jsx(Layers, { className: "w-4 h-4" })
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("span", {
											className: "block font-mono text-[10px] uppercase tracking-wider text-zinc-500",
											children: "05 · Campaign Architecture"
										}), /* @__PURE__ */ jsx("h3", {
											id: "cs-section-architecture",
											className: "font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug",
											children: "Technical Implementation"
										})]
									})]
								}), /* @__PURE__ */ jsx("ul", {
									className: "space-y-2.5",
									children: caseStudy.campaignStructure.map((item, i) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2.5 text-[13px] sm:text-sm text-zinc-700 leading-relaxed",
										children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ jsx("span", { children: item })]
									}, i))
								})]
							})]
						}),
						caseStudy.trackingSetup.length > 0 && /* @__PURE__ */ jsxs("section", {
							"aria-labelledby": "cs-section-tracking",
							className: "rounded-[20px] bg-[#FAFAFA] border border-zinc-200/90 p-4 sm:p-6",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2.5 mb-3 pb-3 border-b border-zinc-200/80",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-emerald-600 shrink-0",
									children: /* @__PURE__ */ jsx(Activity, { className: "w-4 h-4" })
								}), /* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block font-mono text-[10px] uppercase tracking-wider text-zinc-500",
										children: "06 · Conversion Tracking Setup"
									}), /* @__PURE__ */ jsx("h3", {
										id: "cs-section-tracking",
										className: "font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug",
										children: "Measurement & Attribution Configuration"
									})]
								})]
							}), /* @__PURE__ */ jsx("ul", {
								className: `grid grid-cols-1 ${caseStudy.trackingSetup.length > 1 ? "md:grid-cols-2" : ""} gap-3`,
								children: caseStudy.trackingSetup.map((track, idx) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-2.5 rounded-xl bg-white border border-zinc-200/90 p-3.5 text-[13px] sm:text-sm text-zinc-700 leading-relaxed",
									children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ jsx("span", { children: track })]
								}, idx))
							})]
						}),
						allImages.length > 0 && /* @__PURE__ */ jsxs("section", {
							"aria-labelledby": "cs-section-visuals",
							className: "pt-2 border-t border-zinc-200/80",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center justify-between gap-2 mb-3.5",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "block font-mono text-[10px] uppercase tracking-wider text-zinc-500",
										children: "07 · Campaign Visual Presentation"
									}), /* @__PURE__ */ jsx("h3", {
										id: "cs-section-visuals",
										className: "font-display font-bold text-base sm:text-lg text-[#09090B] leading-snug",
										children: "Campaign Evidence & Screenshots"
									})] }), /* @__PURE__ */ jsx("span", {
										className: "text-[11px] sm:text-xs text-zinc-500 font-mono",
										children: "Tap any visual to expand"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "md:hidden",
									children: [/* @__PURE__ */ jsx("div", {
										ref: visualSliderRef,
										onScroll: handleVisualScroll,
										className: "flex overflow-x-auto snap-x snap-mandatory scroll-pl-4 gap-3.5 -mx-4 px-4 pb-2 scrollbar-none slider-touch-track",
										children: allImages.map((img) => /* @__PURE__ */ jsxs("div", {
											"data-visual-slide": "true",
											onClick: () => setLightboxImage(img),
											role: "button",
											tabIndex: 0,
											onKeyDown: (e) => {
												if (e.key === "Enter" || e.key === " ") {
													e.preventDefault();
													setLightboxImage(img);
												}
											},
											"aria-label": `Inspect visual: ${img.caption}`,
											className: `${allImages.length > 1 ? "w-[86%]" : "w-full"} shrink-0 snap-start rounded-[18px] overflow-hidden bg-[#0B1644] border border-zinc-200 cursor-pointer shadow-sm`,
											children: [/* @__PURE__ */ jsx("div", {
												className: "aspect-square w-full overflow-hidden bg-[#0B1644] p-1.5",
												children: /* @__PURE__ */ jsx("img", {
													src: img.src,
													alt: img.alt,
													loading: "lazy",
													onError: (e) => {
														const target = e.currentTarget;
														target.onerror = null;
														target.src = buildFallbackSvg(caseStudy.title, caseStudy.primaryMetric);
													},
													className: "w-full h-full object-contain"
												})
											}), /* @__PURE__ */ jsxs("div", {
												className: "px-3.5 py-3 bg-[#FAFAFA] border-t border-zinc-200/80 flex items-center justify-between gap-2.5",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-xs text-zinc-700 line-clamp-2 leading-snug",
													children: img.caption
												}), /* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-zinc-200 text-[10.5px] font-mono font-semibold text-[#09090B] shrink-0",
													children: [/* @__PURE__ */ jsx(Maximize2, { className: "w-3 h-3" }), /* @__PURE__ */ jsx("span", { children: "Zoom" })]
												})]
											})]
										}, img.id))
									}), allImages.length > 1 && /* @__PURE__ */ jsxs("div", {
										className: "pt-2.5 flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "font-mono text-[11px] text-zinc-500 tabular-nums",
											children: [
												/* @__PURE__ */ jsx("strong", {
													className: "text-[#09090B]",
													children: String(activeVisualSlide + 1).padStart(2, "0")
												}),
												" ",
												"/ ",
												String(allImages.length).padStart(2, "0"),
												" · Swipe visuals"
											]
										}), /* @__PURE__ */ jsx("div", {
											className: "flex items-center gap-1",
											role: "tablist",
											"aria-label": "Campaign visual slides",
											children: allImages.map((img, i) => /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: () => scrollToVisualSlide(i),
												"aria-label": `View screenshot ${i + 1}`,
												"aria-selected": activeVisualSlide === i,
												className: "p-1.5 cursor-pointer flex items-center justify-center",
												children: /* @__PURE__ */ jsx("span", { className: `block h-1.5 rounded-full transition-all duration-300 ${activeVisualSlide === i ? "w-5 bg-[#09090B]" : "w-1.5 bg-zinc-300"}` })
											}, img.id))
										})]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "hidden md:block space-y-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "grid md:grid-cols-2 gap-5",
										children: visibleDesktopImages.map((img) => /* @__PURE__ */ jsxs("div", {
											onClick: () => setLightboxImage(img),
											role: "button",
											tabIndex: 0,
											onKeyDown: (e) => {
												if (e.key === "Enter" || e.key === " ") {
													e.preventDefault();
													setLightboxImage(img);
												}
											},
											"aria-label": `Expand screenshot: ${img.caption}`,
											className: "group relative rounded-[20px] overflow-hidden bg-[#0B1644] border border-zinc-200 cursor-pointer shadow-sm",
											children: [/* @__PURE__ */ jsx("div", {
												className: "aspect-square w-full overflow-hidden bg-[#0B1644] p-2",
												children: /* @__PURE__ */ jsx("img", {
													src: img.src,
													alt: img.alt,
													loading: "lazy",
													onError: (e) => {
														const target = e.currentTarget;
														target.onerror = null;
														target.src = buildFallbackSvg(caseStudy.title, caseStudy.primaryMetric);
													},
													className: "w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
												})
											}), /* @__PURE__ */ jsxs("div", {
												className: "px-4 py-3 bg-[#FAFAFA] border-t border-zinc-200/80 flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ jsx("span", {
													className: "text-xs text-zinc-600 truncate",
													children: img.caption
												}), /* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#09090B] shrink-0",
													children: [/* @__PURE__ */ jsx(Maximize2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ jsx("span", { children: "Expand" })]
												})]
											})]
										}, img.id))
									}), allImages.length > 4 && /* @__PURE__ */ jsx("div", {
										className: "flex justify-center pt-1",
										children: /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setShowAllVisuals((prev) => !prev),
											className: "px-4 py-2 rounded-xl bg-[#FAFAFA] hover:bg-zinc-100 border border-zinc-300 text-xs font-display font-semibold text-[#09090B] transition-colors cursor-pointer",
											children: showAllVisuals ? "Show Fewer Screenshots" : `Show All ${allImages.length} Screenshots (+${allImages.length - 4} more)`
										})
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "shrink-0 px-3.5 sm:px-7 py-3 sm:py-4 bg-[#FAFAFA] border-t border-zinc-200 flex items-center justify-between gap-2.5 sm:gap-3",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "hidden sm:inline font-mono text-xs text-zinc-500",
						children: [
							"Case Study ",
							formattedNumber,
							" of ",
							formattedTotal,
							" · Managed by Zahidul Islam"
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-end",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: onClose,
							className: "min-h-[44px] sm:min-h-0 px-3 min-[375px]:px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-xs sm:text-sm font-display font-semibold text-zinc-700 transition-colors cursor-pointer shrink-0",
							children: "Close"
						}), /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => {
								trackCtaClick({
									ctaText: "Discuss a Similar Campaign",
									ctaLocation: "case_study_modal"
								});
								onClose();
								onOpenBooking();
							},
							className: "min-h-[44px] sm:min-h-0 inline-flex items-center justify-center gap-1.5 min-[375px]:gap-2 px-3 min-[375px]:px-4 sm:px-5 py-2.5 rounded-xl bg-[#09090B] hover:bg-zinc-800 text-white text-[11.5px] min-[375px]:text-xs sm:text-sm font-display font-bold transition-colors cursor-pointer flex-1 sm:flex-initial whitespace-nowrap",
							children: [/* @__PURE__ */ jsx("span", { children: "Discuss a Similar Campaign" }), /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 shrink-0" })]
						})]
					})]
				})
			]
		}, caseStudy.id)]
	}), lightboxImage && /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-[100000] bg-black/92 backdrop-blur-lg flex items-center justify-center p-3 sm:p-4",
		onClick: () => setLightboxImage(null),
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative max-w-5xl w-full",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setLightboxImage(null),
					className: "mb-3 ml-auto px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer",
					children: [/* @__PURE__ */ jsx("span", { children: "Close Preview" }), /* @__PURE__ */ jsx(X, { className: "w-3.5 h-3.5" })]
				}),
				/* @__PURE__ */ jsx("img", {
					src: lightboxImage.src,
					alt: lightboxImage.alt,
					className: "w-full h-auto max-h-[80dvh] object-contain rounded-2xl border border-white/15 bg-[#090D16]"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-center text-xs font-mono text-zinc-300 px-2",
					children: lightboxImage.caption
				})
			]
		})
	})] }), document.body);
};
export { CaseStudyDetailModal, CaseStudyDetailModal as default };
