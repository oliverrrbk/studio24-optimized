"use client" 

import * as React from "react"

import { VariantProps, cva } from "class-variance-authority"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"

const cardVariants = cva("absolute will-change-transform", {
  variants: {
    variant: {
      dark: "flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-stone-700/50 bg-accent-foreground/80 p-6 backdrop-blur-md",
      light:
        "flex size-full flex-col items-center justify-center gap-6 rounded-[40px] rounded-tr-[80px] rounded-bl-[80px] border border-white/60 p-8 pt-10 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.04)]",
    },
  },
  defaultVariants: {
    variant: "light",
  },
})
interface ReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  maxRating?: number
}
interface CardStickyProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof cardVariants> {
  arrayLength: number
  index: number
  incrementY?: number
  incrementZ?: number
  incrementRotation?: number
}
interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)
function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (context === undefined) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScrollContextProvider"
    )
  }
  return context
}

export const ContainerScroll: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children, style, className, ...props }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
      target: scrollRef,
      offset: ["start start", "end end"],
    })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-svh w-full", className)}
        style={{ perspective: "1000px", ...style }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}
ContainerScroll.displayName = "ContainerScroll"

export const CardsContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ perspective: "1000px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  )
}
CardsContainer.displayName = "CardsContainer"
export const CardTransformed = React.forwardRef<
  HTMLDivElement,
  CardStickyProps
>(
  (
    {
      arrayLength,
      index,
      incrementY = 0, // "Same exact center" - no vertical offset
      incrementZ = 15,
      incrementRotation = 10 + index * 5, // Pronounced right fan matching the Canva image exactly
      className,
      variant,
      style,
      ...props
    },
    ref
  ) => {
    
    const { scrollYProgress } = useContainerScrollContext()
    
    // Map directly to scrollYProgress. Since the page uses Lenis smooth scrolling,
    // applying a secondary Framer Motion spring creates competing physics engines,
    // which results in beating frequencies (micro-stuttering) and "snapping" as they disagree.
    const smoothProgress = scrollYProgress;

    // Phase 1: Rotation happens quickly as soon as sticky starts
    
    // Phase 2: Sequential peel-off.
    // Progress starts after rotation (0.1) and ends at 1.0.
    const alignProgress = 0.1;
    
    // Calculate stagger so the VERY LAST card starts exactly when progress hits 1.0.
    // This perfectly syncs the sticky container unlocking with the final card's turn to move.
    const stagger = (1.0 - alignProgress - 0.02) / Math.max(1, arrayLength - 1);
    
    // The start time for each card
    const start = alignProgress + 0.02 + index * stagger;
    
    // To keep the exact "sweet spot" overlap ratio we dialed in earlier,
    // the total duration of the card should be ~4.16x the stagger.
    const end = start + stagger * 4.16;
    
    const isLastCard = index === arrayLength - 1;
    const endY = isLastCard ? "0vh" : "-150vh";
    
    // Use a clean 3-point range. We DO NOT clamp `end`. 
    // If the scroll hits 1.0 (unlocks) while `end` is at 1.2, Framer Motion will
    // automatically output the perfectly correct intermediate value (the "hugging" distance).
    const fullRange = [0, start, end];
    const fullOutput = ["0vh", "0vh", endY];
    
    const yValue = useTransform(smoothProgress, fullRange, fullOutput);
    
    // Rotation ends slightly before the Y animation begins
    const rotateRange = [0, alignProgress + 0.02];
    const rotate = useTransform(smoothProgress, rotateRange, [
      incrementRotation,
      0,
    ]);

    // Progressively decrease opacity by 5% per card, bottoming out at 40%
    const cardOpacity = Math.max(0.4, 0.9 - index * 0.05);
    const cardStyle = {
      top: index * incrementY,
      backfaceVisibility: "hidden" as const,
      zIndex: (arrayLength - index) * incrementZ,
      backgroundColor: variant === "light" ? `rgba(255, 255, 255, ${cardOpacity})` : undefined,
      ...style,
    }
    
    return (
      <motion.div
        ref={ref}
        style={{
          ...cardStyle,
          y: yValue,
          z: index * incrementZ,
          rotate: rotate,
          transformOrigin: "center",
        }}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
CardTransformed.displayName = "CardTransformed"

export const ReviewStars = React.forwardRef<HTMLDivElement, ReviewProps>(
  ({ rating, maxRating = 5, className, ...props }, ref) => {
    const filledStars = Math.floor(rating)
    const fractionalPart = rating - filledStars
    const emptyStars = maxRating - filledStars - (fractionalPart > 0 ? 1 : 0)

    return (
      <div
        className={cn("flex items-center gap-2", className)}
        ref={ref}
        {...props}
      >
        <div className="flex items-center">
          {[...Array(filledStars)].map((_, index) => (
            <svg
              key={`filled-${index}`}
              className="size-4 text-inherit"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
          {fractionalPart > 0 && (
            <svg
              className="size-4 text-inherit"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <defs>
                <linearGradient id="half">
                  <stop
                    offset={`${fractionalPart * 100}%`}
                    stopColor="currentColor"
                  />
                  <stop
                    offset={`${fractionalPart * 100}%`}
                    stopColor="rgb(209 213 219)"
                  />
                </linearGradient>
              </defs>
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
                fill="url(#half)"
              />
            </svg>
          )}
          {[...Array(emptyStars)].map((_, index) => (
            <svg
              key={`empty-${index}`}
              className="size-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
        </div>
        <p className="sr-only">{rating}</p>
      </div>
    )
  }
)
ReviewStars.displayName = "ReviewStars"
